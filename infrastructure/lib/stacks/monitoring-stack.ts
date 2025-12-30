import * as cdk from 'aws-cdk-lib';
import * as cloudwatch from 'aws-cdk-lib/aws-cloudwatch';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as subscriptions from 'aws-cdk-lib/aws-sns-subscriptions';
import * as cloudwatch_actions from 'aws-cdk-lib/aws-cloudwatch-actions';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as rds from 'aws-cdk-lib/aws-rds';
import * as sfn from 'aws-cdk-lib/aws-stepfunctions';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import { Construct } from 'constructs';
import { EnvironmentConfig } from '../../config/config';

interface MonitoringStackProps extends cdk.StackProps {
  config: EnvironmentConfig;
  database: rds.DatabaseCluster;
  lambdaFunctions: {
    fetchStocks: lambda.Function;
    fetchBonds: lambda.Function;
    scrapeData: lambda.Function;
    analyzeOpportunities: lambda.Function;
    generateDigest: lambda.Function;
    sendEmail: lambda.Function;
    apiHandler: lambda.Function;
  };
  stateMachine: sfn.StateMachine;
  emailQueue: sqs.Queue;
}

export class MonitoringStack extends cdk.Stack {
  public readonly dashboard: cloudwatch.Dashboard;
  public readonly alarmTopic: sns.Topic;

  constructor(scope: Construct, id: string, props: MonitoringStackProps) {
    super(scope, id, props);

    const { config, database, lambdaFunctions, stateMachine, emailQueue } = props;

    // SNS Topic for alarms
    this.alarmTopic = new sns.Topic(this, 'AlarmTopic', {
      topicName: `${config.environment}-investment-scanner-alarms`,
      displayName: 'Investment Scanner Alarms',
    });

    // Add email subscription for alarms (update with your email)
    this.alarmTopic.addSubscription(
      new subscriptions.EmailSubscription('your-email@example.com')
    );

    // CloudWatch Dashboard
    this.dashboard = new cloudwatch.Dashboard(this, 'Dashboard', {
      dashboardName: `${config.environment}-InvestmentScanner`,
    });

    // === SYSTEM HEALTH WIDGETS ===

    // Step Functions execution metrics
    const sfnWidget = new cloudwatch.GraphWidget({
      title: 'Scan Workflow Executions',
      left: [
        stateMachine.metricSucceeded({
          label: 'Successful',
          statistic: 'Sum',
          period: cdk.Duration.hours(24),
        }),
        stateMachine.metricFailed({
          label: 'Failed',
          statistic: 'Sum',
          period: cdk.Duration.hours(24),
        }),
      ],
      width: 12,
    });

    // Lambda errors widget
    const lambdaErrorsWidget = new cloudwatch.GraphWidget({
      title: 'Lambda Function Errors',
      left: Object.entries(lambdaFunctions).map(([name, fn]) =>
        fn.metricErrors({
          label: name,
          statistic: 'Sum',
          period: cdk.Duration.hours(1),
        })
      ),
      width: 12,
    });

    // Lambda duration widget
    const lambdaDurationWidget = new cloudwatch.GraphWidget({
      title: 'Lambda Function Duration (ms)',
      left: Object.entries(lambdaFunctions).map(([name, fn]) =>
        fn.metricDuration({
          label: name,
          statistic: 'Average',
          period: cdk.Duration.hours(1),
        })
      ),
      width: 12,
    });

    // Email queue metrics
    const emailQueueWidget = new cloudwatch.GraphWidget({
      title: 'Email Queue Metrics',
      left: [
        emailQueue.metricNumberOfMessagesSent({
          label: 'Messages Sent',
          statistic: 'Sum',
          period: cdk.Duration.hours(1),
        }),
        emailQueue.metricApproximateNumberOfMessagesVisible({
          label: 'Messages in Queue',
          statistic: 'Average',
          period: cdk.Duration.minutes(5),
        }),
      ],
      width: 12,
    });

    // Database connections widget
    const databaseWidget = new cloudwatch.GraphWidget({
      title: 'Aurora Serverless v2 Metrics',
      left: [
        database.metricACUUtilization({
          label: 'ACU Utilization',
          statistic: 'Average',
          period: cdk.Duration.minutes(5),
        }),
        database.metricServerlessDatabaseCapacity({
          label: 'Database Capacity',
          statistic: 'Average',
          period: cdk.Duration.minutes(5),
        }),
      ],
      width: 12,
    });

    // === BUSINESS METRICS WIDGETS ===

    // Custom metrics (you'll emit these from Lambda functions)
    const opportunitiesFoundMetric = new cloudwatch.Metric({
      namespace: 'InvestmentScanner',
      metricName: 'OpportunitiesFound',
      statistic: 'Sum',
      period: cdk.Duration.days(1),
      label: 'Opportunities Identified',
    });

    const digestsGeneratedMetric = new cloudwatch.Metric({
      namespace: 'InvestmentScanner',
      metricName: 'DigestsGenerated',
      statistic: 'Sum',
      period: cdk.Duration.days(1),
      label: 'Digests Generated',
    });

    const emailsSentMetric = new cloudwatch.Metric({
      namespace: 'InvestmentScanner',
      metricName: 'EmailsSent',
      statistic: 'Sum',
      period: cdk.Duration.days(1),
      label: 'Emails Sent',
    });

    const businessMetricsWidget = new cloudwatch.GraphWidget({
      title: 'Business Metrics (Daily)',
      left: [opportunitiesFoundMetric, digestsGeneratedMetric, emailsSentMetric],
      width: 24,
    });

    // Add all widgets to dashboard
    this.dashboard.addWidgets(
      sfnWidget,
      lambdaErrorsWidget,
      lambdaDurationWidget,
      emailQueueWidget,
      databaseWidget,
      businessMetricsWidget
    );

    // === ALARMS ===

    // Step Functions failure alarm
    const sfnFailureAlarm = new cloudwatch.Alarm(this, 'ScanWorkflowFailureAlarm', {
      alarmName: `${config.environment}-scan-workflow-failures`,
      metric: stateMachine.metricFailed({
        statistic: 'Sum',
        period: cdk.Duration.hours(1),
      }),
      threshold: 1,
      evaluationPeriods: 1,
      comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      actionsEnabled: true,
      alarmDescription: 'Alert when scan workflow fails',
      treatMissingData: cloudwatch.TreatMissingData.NOT_BREACHING,
    });
    sfnFailureAlarm.addAlarmAction(new cloudwatch_actions.SnsAction(this.alarmTopic));

    // Lambda errors alarm (composite)
    const lambdaErrorsAlarm = new cloudwatch.Alarm(this, 'LambdaErrorsAlarm', {
      alarmName: `${config.environment}-lambda-high-errors`,
      metric: lambdaFunctions.fetchStocks.metricErrors({
        statistic: 'Sum',
        period: cdk.Duration.minutes(5),
      }),
      threshold: 5,
      evaluationPeriods: 2,
      comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      actionsEnabled: true,
      alarmDescription: 'Alert when Lambda error rate is high',
    });
    lambdaErrorsAlarm.addAlarmAction(new cloudwatch_actions.SnsAction(this.alarmTopic));

    // Email queue DLQ alarm
    const dlqMessagesAlarm = new cloudwatch.Alarm(this, 'EmailDLQAlarm', {
      alarmName: `${config.environment}-email-dlq-messages`,
      metric: new cloudwatch.Metric({
        namespace: 'AWS/SQS',
        metricName: 'ApproximateNumberOfMessagesVisible',
        dimensionsMap: {
          QueueName: `${config.environment}-investment-scanner-email-dlq`,
        },
        statistic: 'Sum',
        period: cdk.Duration.minutes(5),
      }),
      threshold: 1,
      evaluationPeriods: 1,
      comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      actionsEnabled: true,
      alarmDescription: 'Alert when emails fail to send and land in DLQ',
    });
    dlqMessagesAlarm.addAlarmAction(new cloudwatch_actions.SnsAction(this.alarmTopic));

    // Database CPU alarm (production only)
    if (config.environment === 'prod') {
      const databaseCPUAlarm = new cloudwatch.Alarm(this, 'DatabaseCPUAlarm', {
        alarmName: `${config.environment}-database-high-cpu`,
        metric: database.metricCPUUtilization({
          statistic: 'Average',
          period: cdk.Duration.minutes(5),
        }),
        threshold: 80,
        evaluationPeriods: 3,
        comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
        actionsEnabled: true,
        alarmDescription: 'Alert when database CPU is consistently high',
      });
      databaseCPUAlarm.addAlarmAction(new cloudwatch_actions.SnsAction(this.alarmTopic));
    }

    // CloudFormation Outputs
    new cdk.CfnOutput(this, 'DashboardUrl', {
      value: `https://console.aws.amazon.com/cloudwatch/home?region=${config.region}#dashboards:name=${this.dashboard.dashboardName}`,
      description: 'CloudWatch Dashboard URL',
    });

    new cdk.CfnOutput(this, 'AlarmTopicArn', {
      value: this.alarmTopic.topicArn,
      description: 'SNS topic for alarms',
      exportName: `${config.environment}-alarm-topic-arn`,
    });

    // Cost Estimation Tag
    cdk.Tags.of(this).add('MonthlyEstimate', config.environment === 'dev'
      ? '$0.50-2 (CloudWatch)'
      : config.environment === 'staging'
      ? '$2-5'
      : '$50-100 (detailed monitoring)');
  }
}

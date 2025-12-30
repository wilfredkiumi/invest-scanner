import * as cdk from 'aws-cdk-lib';
import * as events from 'aws-cdk-lib/aws-events';
import * as targets from 'aws-cdk-lib/aws-events-targets';
import * as sfn from 'aws-cdk-lib/aws-stepfunctions';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import { EnvironmentConfig } from '../../config/config';

interface SchedulerStackProps extends cdk.StackProps {
  config: EnvironmentConfig;
  stateMachine: sfn.StateMachine;
}

export class SchedulerStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: SchedulerStackProps) {
    super(scope, id, props);

    const { config, stateMachine } = props;

    // IAM Role for EventBridge to invoke Step Functions
    const eventBridgeRole = new iam.Role(this, 'EventBridgeRole', {
      assumedBy: new iam.ServicePrincipal('events.amazonaws.com'),
      description: 'Role for EventBridge to invoke Step Functions',
    });

    stateMachine.grantStartExecution(eventBridgeRole);

    // Daily Scan Rule - 5:00 AM EAT (East Africa Time = UTC+3)
    // UTC time: 02:00 AM (5 AM EAT - 3 hours)
    const dailyScanRule = new events.Rule(this, 'DailyScanRule', {
      ruleName: `${config.environment}-investment-scanner-daily-scan`,
      description: 'Trigger daily investment scan at 5:00 AM EAT',
      schedule: events.Schedule.cron({
        minute: '0',
        hour: '2', // 2 AM UTC = 5 AM EAT
        day: '*',
        month: '*',
        year: '*',
      }),
      enabled: true,
    });

    dailyScanRule.addTarget(
      new targets.SfnStateMachine(stateMachine, {
        role: eventBridgeRole,
        input: events.RuleTargetInput.fromObject({
          scanType: 'daily',
          timestamp: events.EventField.time,
          // Default watchlist tickers
          stockTickers: [
            'JNJ', 'PG', 'KO', 'PEP', 'MCD', 'WMT', 'ABBV', 'CVX',
            'XOM', 'T', 'VZ', 'SO', 'D', 'NEE', 'DUK', 'O'
          ],
          nseTickers: [
            'SCOM.NB', 'KCB.NB', 'EQTY.NB', 'EABL.NB', 'BAT.NB',
            'SCBK.NB', 'ABSA.NB', 'NCBA.NB'
          ],
        }),
      })
    );

    // Weekly Deep Scan Rule - Sundays at 8:00 PM EAT
    // UTC time: 17:00 (8 PM EAT - 3 hours)
    const weeklyDeepScanRule = new events.Rule(this, 'WeeklyDeepScanRule', {
      ruleName: `${config.environment}-investment-scanner-weekly-scan`,
      description: 'Trigger weekly deep scan on Sundays at 8:00 PM EAT',
      schedule: events.Schedule.cron({
        minute: '0',
        hour: '17', // 5 PM UTC = 8 PM EAT
        weekDay: 'SUN',
        month: '*',
        year: '*',
      }),
      enabled: true,
    });

    weeklyDeepScanRule.addTarget(
      new targets.SfnStateMachine(stateMachine, {
        role: eventBridgeRole,
        input: events.RuleTargetInput.fromObject({
          scanType: 'weekly',
          deepAnalysis: true,
          timestamp: events.EventField.time,
          // Full watchlist for weekly scan
          stockTickers: [
            'JNJ', 'PG', 'KO', 'PEP', 'MCD', 'WMT', 'ABBV', 'CVX', 'XOM', 'T',
            'VZ', 'SO', 'D', 'NEE', 'DUK', 'O', 'STAG', 'AVB', 'EXR', 'PSA',
          ],
          nseTickers: [
            'SCOM.NB', 'KCB.NB', 'EQTY.NB', 'EABL.NB', 'BAT.NB',
            'SCBK.NB', 'ABSA.NB', 'BAMB.NB', 'NCBA.NB', 'COOP.NB',
            'SBIC.NB', 'TOTL.NB', 'UNGA.NB', 'KNRE.NB'
          ],
        }),
      })
    );

    // Monthly Rebalancing Rule - 1st of each month at 9:00 PM EAT
    // UTC time: 18:00 (9 PM EAT - 3 hours)
    const monthlyRebalanceRule = new events.Rule(this, 'MonthlyRebalanceRule', {
      ruleName: `${config.environment}-investment-scanner-monthly-rebalance`,
      description: 'Trigger monthly watchlist rebalancing on 1st of month',
      schedule: events.Schedule.cron({
        minute: '0',
        hour: '18', // 6 PM UTC = 9 PM EAT
        day: '1',
        month: '*',
        year: '*',
      }),
      enabled: true,
    });

    monthlyRebalanceRule.addTarget(
      new targets.SfnStateMachine(stateMachine, {
        role: eventBridgeRole,
        input: events.RuleTargetInput.fromObject({
          scanType: 'monthly',
          rebalancing: true,
          timestamp: events.EventField.time,
        }),
      })
    );

    // CloudFormation Outputs
    new cdk.CfnOutput(this, 'DailyScanRuleArn', {
      value: dailyScanRule.ruleArn,
      description: 'Daily scan EventBridge rule ARN',
      exportName: `${config.environment}-daily-scan-rule-arn`,
    });

    new cdk.CfnOutput(this, 'WeeklyScanRuleArn', {
      value: weeklyDeepScanRule.ruleArn,
      description: 'Weekly deep scan EventBridge rule ARN',
      exportName: `${config.environment}-weekly-scan-rule-arn`,
    });

    new cdk.CfnOutput(this, 'MonthlyRebalanceRuleArn', {
      value: monthlyRebalanceRule.ruleArn,
      description: 'Monthly rebalance EventBridge rule ARN',
      exportName: `${config.environment}-monthly-rebalance-rule-arn`,
    });

    // Cost Estimation Tag
    cdk.Tags.of(this).add('MonthlyEstimate', '$1-2 (EventBridge rules)');
  }
}

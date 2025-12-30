import * as cdk from 'aws-cdk-lib';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as ses from 'aws-cdk-lib/aws-ses';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import { EnvironmentConfig } from '../../config/config';

interface MessagingStackProps extends cdk.StackProps {
  config: EnvironmentConfig;
}

export class MessagingStack extends cdk.Stack {
  public readonly emailQueue: sqs.Queue;
  public readonly emailDLQ: sqs.Queue;
  public readonly bounceNotificationTopic: sns.Topic;
  public readonly emailTemplatesBucket: s3.Bucket;

  constructor(scope: Construct, id: string, props: MessagingStackProps) {
    super(scope, id, props);

    const { config } = props;

    // Dead Letter Queue for failed email sends
    this.emailDLQ = new sqs.Queue(this, 'EmailDLQ', {
      queueName: `${config.environment}-investment-scanner-email-dlq`,
      retentionPeriod: cdk.Duration.days(14),
      encryption: sqs.QueueEncryption.SQS_MANAGED,
    });

    // Main Email Queue - Decouples digest generation from email sending
    this.emailQueue = new sqs.Queue(this, 'EmailQueue', {
      queueName: `${config.environment}-investment-scanner-email-queue`,
      visibilityTimeout: cdk.Duration.seconds(90), // 1.5x Lambda timeout
      receiveMessageWaitTime: cdk.Duration.seconds(20), // Long polling
      retentionPeriod: cdk.Duration.days(4),
      deadLetterQueue: {
        queue: this.emailDLQ,
        maxReceiveCount: 3, // Retry 3 times before moving to DLQ
      },
      encryption: sqs.QueueEncryption.SQS_MANAGED,
    });

    // SNS Topic for bounce and complaint notifications
    this.bounceNotificationTopic = new sns.Topic(this, 'BounceNotificationTopic', {
      topicName: `${config.environment}-investment-scanner-bounces`,
      displayName: 'Investment Scanner Email Bounces',
    });

    // S3 Bucket for email templates and digest archives
    this.emailTemplatesBucket = new s3.Bucket(this, 'EmailTemplatesBucket', {
      bucketName: `${config.environment}-investment-scanner-emails-${config.account}`,
      encryption: s3.BucketEncryption.S3_MANAGED,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      versioned: false, // No versioning for cost savings in MVP
      lifecycleRules: [
        {
          id: 'DeleteOldDigests',
          enabled: true,
          prefix: 'digests/',
          expiration: cdk.Duration.days(90), // PRD requirement
          transitions: [
            {
              storageClass: s3.StorageClass.INTELLIGENT_TIERING,
              transitionAfter: cdk.Duration.days(30),
            },
          ],
        },
      ],
      removalPolicy: config.environment === 'prod'
        ? cdk.RemovalPolicy.RETAIN
        : cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: config.environment !== 'prod',
    });

    // SES Configuration Set for tracking
    const configSet = new ses.CfnConfigurationSet(this, 'SESConfigSet', {
      name: `${config.environment}-investment-scanner`,
    });

    // SES Event Destination - Track bounces and complaints
    new ses.CfnConfigurationSetEventDestination(this, 'SESEventDestination', {
      configurationSetName: configSet.name!,
      eventDestination: {
        name: 'BounceAndComplaintTracking',
        enabled: true,
        matchingEventTypes: ['bounce', 'complaint', 'reject'],
        snsDestination: {
          topicArn: this.bounceNotificationTopic.topicArn,
        },
      },
    });

    // CloudFormation Outputs
    new cdk.CfnOutput(this, 'EmailQueueUrl', {
      value: this.emailQueue.queueUrl,
      description: 'Email queue URL',
      exportName: `${config.environment}-email-queue-url`,
    });

    new cdk.CfnOutput(this, 'EmailQueueArn', {
      value: this.emailQueue.queueArn,
      description: 'Email queue ARN',
      exportName: `${config.environment}-email-queue-arn`,
    });

    new cdk.CfnOutput(this, 'EmailTemplatesBucketName', {
      value: this.emailTemplatesBucket.bucketName,
      description: 'Email templates S3 bucket',
      exportName: `${config.environment}-email-templates-bucket`,
    });

    new cdk.CfnOutput(this, 'SESConfigurationSet', {
      value: configSet.name!,
      description: 'SES configuration set name',
      exportName: `${config.environment}-ses-config-set`,
    });

    // Cost Estimation Tag
    cdk.Tags.of(this).add('MonthlyEstimate', config.environment === 'dev'
      ? '$0.50-1 (SQS free tier + S3)'
      : config.environment === 'staging'
      ? '$2-5'
      : '$5-15');
  }
}

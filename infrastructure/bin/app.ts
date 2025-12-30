#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { getConfig, STACK_PREFIX } from '../config/config';
import { DatabaseStack } from '../lib/stacks/database-stack';
import { LambdaStack } from '../lib/stacks/lambda-stack';
import { ApiStack } from '../lib/stacks/api-stack';
import { StepFunctionsStack } from '../lib/stacks/stepfunctions-stack';
import { SchedulerStack } from '../lib/stacks/scheduler-stack';
import { MessagingStack } from '../lib/stacks/messaging-stack';
import { MonitoringStack } from '../lib/stacks/monitoring-stack';

const app = new cdk.App();

// Get environment from context or default to 'dev'
const environment = app.node.tryGetContext('environment') || 'dev';
const config = getConfig(environment);

console.log(`🚀 Deploying Investment Scanner to ${config.environment} environment`);
console.log(`📍 Region: ${config.region}`);
console.log(`💰 Cost Optimization: Auto-pause=${config.enableAutoPause}, Multi-AZ=${config.enableMultiAz}`);

// Stack tags for cost tracking and organization
const commonTags = {
  Project: 'InvestmentScanner',
  Environment: config.environment,
  ManagedBy: 'CDK',
  CostCenter: 'Investment',
};

const stackProps: cdk.StackProps = {
  env: {
    account: config.account,
    region: config.region,
  },
  tags: commonTags,
};

// 1. Database Stack - Aurora Serverless v2 + ElastiCache (Optional for MVP)
const databaseStack = new DatabaseStack(app, `${STACK_PREFIX}-Database-${config.environment}`, {
  ...stackProps,
  config,
});

// 2. Messaging Stack - SES, SNS, SQS
const messagingStack = new MessagingStack(app, `${STACK_PREFIX}-Messaging-${config.environment}`, {
  ...stackProps,
  config,
});

// 3. Lambda Stack - All Lambda functions
const lambdaStack = new LambdaStack(app, `${STACK_PREFIX}-Lambda-${config.environment}`, {
  ...stackProps,
  config,
  database: databaseStack.database,
  emailQueue: messagingStack.emailQueue,
});

// 4. API Stack - API Gateway + Cognito
const apiStack = new ApiStack(app, `${STACK_PREFIX}-Api-${config.environment}`, {
  ...stackProps,
  config,
  lambdaFunctions: lambdaStack.functions,
});

// 5. Step Functions Stack - Workflow orchestration
const stepFunctionsStack = new StepFunctionsStack(app, `${STACK_PREFIX}-StepFunctions-${config.environment}`, {
  ...stackProps,
  config,
  lambdaFunctions: lambdaStack.functions,
});

// 6. Scheduler Stack - EventBridge rules
const schedulerStack = new SchedulerStack(app, `${STACK_PREFIX}-Scheduler-${config.environment}`, {
  ...stackProps,
  config,
  stateMachine: stepFunctionsStack.scanWorkflow,
});

// 7. Monitoring Stack - CloudWatch dashboards and alarms
const monitoringStack = new MonitoringStack(app, `${STACK_PREFIX}-Monitoring-${config.environment}`, {
  ...stackProps,
  config,
  database: databaseStack.database,
  lambdaFunctions: lambdaStack.functions,
  stateMachine: stepFunctionsStack.scanWorkflow,
  emailQueue: messagingStack.emailQueue,
});

// Stack dependencies
lambdaStack.addDependency(databaseStack);
lambdaStack.addDependency(messagingStack);
apiStack.addDependency(lambdaStack);
stepFunctionsStack.addDependency(lambdaStack);
schedulerStack.addDependency(stepFunctionsStack);
monitoringStack.addDependency(lambdaStack);
monitoringStack.addDependency(databaseStack);

app.synth();

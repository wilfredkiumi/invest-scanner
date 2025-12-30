import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as logs from 'aws-cdk-lib/aws-logs';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as rds from 'aws-cdk-lib/aws-rds';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';
import { EnvironmentConfig } from '../../config/config';
import * as path from 'path';

interface LambdaStackProps extends cdk.StackProps {
  config: EnvironmentConfig;
  database: rds.DatabaseCluster;
  emailQueue: sqs.Queue;
}

export class LambdaStack extends cdk.Stack {
  public readonly functions: {
    fetchStocks: lambda.Function;
    fetchBonds: lambda.Function;
    scrapeData: lambda.Function;
    analyzeOpportunities: lambda.Function;
    generateDigest: lambda.Function;
    sendEmail: lambda.Function;
    apiHandler: lambda.Function;
  };

  constructor(scope: Construct, id: string, props: LambdaStackProps) {
    super(scope, id, props);

    const { config, database, emailQueue } = props;

    // Common Lambda environment variables
    const commonEnv = {
      ENVIRONMENT: config.environment,
      DATABASE_CLUSTER_ARN: database.clusterArn,
      DATABASE_SECRET_ARN: database.secret!.secretArn,
      DATABASE_NAME: 'investmentscanner',
      LOG_LEVEL: config.environment === 'prod' ? 'INFO' : 'DEBUG',
    };

    // Common Lambda layer for shared dependencies
    const sharedLayer = new lambda.LayerVersion(this, 'SharedDependencies', {
      code: lambda.Code.fromAsset(path.join(__dirname, '../../../backend/layers/shared')),
      compatibleRuntimes: [lambda.Runtime.NODEJS_20_X],
      description: 'Shared dependencies for Investment Scanner',
    });

    // 1. Fetch Stocks Lambda - Alpha Vantage + Yahoo Finance + NSE
    this.functions = {} as any;

    this.functions.fetchStocks = new lambda.Function(this, 'FetchStocksFunction', {
      functionName: `${config.environment}-investment-scanner-fetch-stocks`,
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../../../backend/lambdas/fetch-stocks')),
      timeout: cdk.Duration.seconds(config.lambdaTimeout),
      memorySize: config.lambdaMemorySize,
      environment: {
        ...commonEnv,
        API_TIMEOUT: '30000',
      },
      layers: [sharedLayer],
      logRetention: logs.RetentionDays.ONE_WEEK,
      tracing: lambda.Tracing.ACTIVE, // X-Ray tracing
    });

    // 2. Fetch Bonds Lambda - FRED API + Kenya T-Bills
    this.functions.fetchBonds = new lambda.Function(this, 'FetchBondsFunction', {
      functionName: `${config.environment}-investment-scanner-fetch-bonds`,
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../../../backend/lambdas/fetch-bonds')),
      timeout: cdk.Duration.seconds(config.lambdaTimeout),
      memorySize: config.lambdaMemorySize,
      environment: commonEnv,
      layers: [sharedLayer],
      logRetention: logs.RetentionDays.ONE_WEEK,
      tracing: lambda.Tracing.ACTIVE,
    });

    // 3. Scrape Data Lambda - Puppeteer for web scraping
    this.functions.scrapeData = new lambda.Function(this, 'ScrapeDataFunction', {
      functionName: `${config.environment}-investment-scanner-scrape-data`,
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../../../backend/lambdas/scrape-data')),
      timeout: cdk.Duration.seconds(120), // Longer timeout for scraping
      memorySize: 1024, // More memory for Chrome headless
      environment: commonEnv,
      layers: [sharedLayer],
      logRetention: logs.RetentionDays.ONE_WEEK,
      tracing: lambda.Tracing.ACTIVE,
    });

    // 4. Analyze Opportunities Lambda - Screening and scoring
    this.functions.analyzeOpportunities = new lambda.Function(this, 'AnalyzeOpportunitiesFunction', {
      functionName: `${config.environment}-investment-scanner-analyze`,
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../../../backend/lambdas/analyze-opportunities')),
      timeout: cdk.Duration.seconds(config.lambdaTimeout),
      memorySize: config.lambdaMemorySize,
      environment: commonEnv,
      layers: [sharedLayer],
      logRetention: logs.RetentionDays.ONE_WEEK,
      tracing: lambda.Tracing.ACTIVE,
    });

    // 5. Generate Digest Lambda - Create personalized email content
    this.functions.generateDigest = new lambda.Function(this, 'GenerateDigestFunction', {
      functionName: `${config.environment}-investment-scanner-generate-digest`,
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../../../backend/lambdas/generate-digest')),
      timeout: cdk.Duration.seconds(config.lambdaTimeout),
      memorySize: config.lambdaMemorySize,
      environment: {
        ...commonEnv,
        EMAIL_QUEUE_URL: emailQueue.queueUrl,
      },
      layers: [sharedLayer],
      logRetention: logs.RetentionDays.ONE_WEEK,
      tracing: lambda.Tracing.ACTIVE,
    });

    // 6. Send Email Lambda - SES email delivery
    this.functions.sendEmail = new lambda.Function(this, 'SendEmailFunction', {
      functionName: `${config.environment}-investment-scanner-send-email`,
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../../../backend/lambdas/send-email')),
      timeout: cdk.Duration.seconds(60),
      memorySize: 256, // Small memory for email sending
      environment: {
        ...commonEnv,
        SES_REGION: config.region,
        SES_FROM_EMAIL: `no-reply@${config.domainName || 'investmentscanner.com'}`,
      },
      layers: [sharedLayer],
      logRetention: logs.RetentionDays.ONE_WEEK,
      tracing: lambda.Tracing.ACTIVE,
      events: [
        new lambda.EventSourceMapping(this, 'EmailQueueEventSource', {
          eventSourceArn: emailQueue.queueArn,
          batchSize: 10,
          maxBatchingWindow: cdk.Duration.seconds(5),
        }),
      ],
    });

    // 7. API Handler Lambda - REST API endpoints
    this.functions.apiHandler = new lambda.Function(this, 'ApiHandlerFunction', {
      functionName: `${config.environment}-investment-scanner-api`,
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../../../backend/lambdas/api-handler')),
      timeout: cdk.Duration.seconds(30),
      memorySize: config.lambdaMemorySize,
      environment: commonEnv,
      layers: [sharedLayer],
      logRetention: logs.RetentionDays.ONE_WEEK,
      tracing: lambda.Tracing.ACTIVE,
    });

    // Grant database access to all Lambda functions
    Object.values(this.functions).forEach((fn: lambda.Function) => {
      // Grant RDS Data API access
      database.grantDataApiAccess(fn);

      // Grant Secrets Manager access
      database.secret?.grantRead(fn);
    });

    // Grant SQS permissions
    emailQueue.grantSendMessages(this.functions.generateDigest);
    emailQueue.grantConsumeMessages(this.functions.sendEmail);

    // Grant SES permissions to send emails
    this.functions.sendEmail.addToRolePolicy(
      new iam.PolicyStatement({
        actions: ['ses:SendEmail', 'ses:SendRawEmail'],
        resources: ['*'],
      })
    );

    // Grant Secrets Manager access for API keys (Alpha Vantage, etc.)
    const apiKeysSecret = secretsmanager.Secret.fromSecretNameV2(
      this,
      'ApiKeysSecret',
      `${config.environment}/investment-scanner/api-keys`
    );
    apiKeysSecret.grantRead(this.functions.fetchStocks);
    apiKeysSecret.grantRead(this.functions.fetchBonds);

    // CloudFormation Outputs
    Object.entries(this.functions).forEach(([name, fn]) => {
      new cdk.CfnOutput(this, `${name}FunctionArn`, {
        value: fn.functionArn,
        description: `${name} Lambda function ARN`,
        exportName: `${config.environment}-${name}-function-arn`,
      });
    });

    // Cost Estimation Tag
    cdk.Tags.of(this).add('MonthlyEstimate', config.environment === 'dev'
      ? '$0.20-1 (free tier covers most)'
      : config.environment === 'staging'
      ? '$3-10'
      : '$25-50');
  }
}

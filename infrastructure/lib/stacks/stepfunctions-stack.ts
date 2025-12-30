import * as cdk from 'aws-cdk-lib';
import * as sfn from 'aws-cdk-lib/aws-stepfunctions';
import * as tasks from 'aws-cdk-lib/aws-stepfunctions-tasks';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as logs from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';
import { EnvironmentConfig } from '../../config/config';

interface StepFunctionsStackProps extends cdk.StackProps {
  config: EnvironmentConfig;
  lambdaFunctions: {
    fetchStocks: lambda.Function;
    fetchBonds: lambda.Function;
    scrapeData: lambda.Function;
    analyzeOpportunities: lambda.Function;
    generateDigest: lambda.Function;
  };
}

export class StepFunctionsStack extends cdk.Stack {
  public readonly scanWorkflow: sfn.StateMachine;

  constructor(scope: Construct, id: string, props: StepFunctionsStackProps) {
    super(scope, id, props);

    const { config, lambdaFunctions } = props;

    // Step Functions tasks
    const fetchStocksTask = new tasks.LambdaInvoke(this, 'FetchStocksTask', {
      lambdaFunction: lambdaFunctions.fetchStocks,
      outputPath: '$.Payload',
      retryOnServiceExceptions: true,
      payload: sfn.TaskInput.fromObject({
        'market': 'US',
        'tickers.$': '$.stockTickers',
      }),
    });

    const fetchNSEStocksTask = new tasks.LambdaInvoke(this, 'FetchNSEStocksTask', {
      lambdaFunction: lambdaFunctions.fetchStocks,
      outputPath: '$.Payload',
      retryOnServiceExceptions: true,
      payload: sfn.TaskInput.fromObject({
        'market': 'NSE',
        'tickers.$': '$.nseTickers',
      }),
    });

    const fetchBondsTask = new tasks.LambdaInvoke(this, 'FetchBondsTask', {
      lambdaFunction: lambdaFunctions.fetchBonds,
      outputPath: '$.Payload',
      retryOnServiceExceptions: true,
    });

    const scrapeDataTask = new tasks.LambdaInvoke(this, 'ScrapeDataTask', {
      lambdaFunction: lambdaFunctions.scrapeData,
      outputPath: '$.Payload',
      retryOnServiceExceptions: true,
    });

    // Parallel data collection
    const parallelDataCollection = new sfn.Parallel(this, 'ParallelDataCollection', {
      comment: 'Fetch data from multiple sources in parallel',
      resultPath: '$.collectedData',
    });

    parallelDataCollection.branch(fetchStocksTask);
    parallelDataCollection.branch(fetchNSEStocksTask);
    parallelDataCollection.branch(fetchBondsTask);
    parallelDataCollection.branch(scrapeDataTask);

    // Analysis task
    const analyzeTask = new tasks.LambdaInvoke(this, 'AnalyzeTask', {
      lambdaFunction: lambdaFunctions.analyzeOpportunities,
      outputPath: '$.Payload',
      retryOnServiceExceptions: true,
      payload: sfn.TaskInput.fromObject({
        'collectedData.$': '$.collectedData',
      }),
    });

    // Generate digest task
    const generateDigestTask = new tasks.LambdaInvoke(this, 'GenerateDigestTask', {
      lambdaFunction: lambdaFunctions.generateDigest,
      outputPath: '$.Payload',
      retryOnServiceExceptions: true,
      payload: sfn.TaskInput.fromObject({
        'opportunities.$': '$.opportunities',
      }),
    });

    // Success state
    const successState = new sfn.Succeed(this, 'ScanCompleted', {
      comment: 'Daily scan completed successfully',
    });

    // Failure state
    const failureState = new sfn.Fail(this, 'ScanFailed', {
      comment: 'Daily scan failed',
      error: 'ScanExecutionError',
      cause: 'One or more steps in the scan workflow failed',
    });

    // Define workflow
    const definition = parallelDataCollection
      .addCatch(failureState, {
        errors: ['States.ALL'],
        resultPath: '$.error',
      })
      .next(analyzeTask)
      .addCatch(failureState, {
        errors: ['States.ALL'],
        resultPath: '$.error',
      })
      .next(generateDigestTask)
      .addCatch(failureState, {
        errors: ['States.ALL'],
        resultPath: '$.error',
      })
      .next(successState);

    // Log group for Step Functions
    const logGroup = new logs.LogGroup(this, 'ScanWorkflowLogGroup', {
      logGroupName: `/aws/stepfunctions/${config.environment}-investment-scanner-scan`,
      retention: config.environment === 'dev'
        ? logs.RetentionDays.ONE_WEEK
        : logs.RetentionDays.ONE_MONTH,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // Create State Machine
    this.scanWorkflow = new sfn.StateMachine(this, 'ScanWorkflow', {
      stateMachineName: `${config.environment}-investment-scanner-scan-workflow`,
      definition,
      timeout: cdk.Duration.minutes(15), // Max 15 minutes for entire workflow
      tracingEnabled: true,
      logs: {
        destination: logGroup,
        level: sfn.LogLevel.ALL,
        includeExecutionData: true,
      },
    });

    // CloudFormation Outputs
    new cdk.CfnOutput(this, 'ScanWorkflowArn', {
      value: this.scanWorkflow.stateMachineArn,
      description: 'Scan workflow State Machine ARN',
      exportName: `${config.environment}-scan-workflow-arn`,
    });

    new cdk.CfnOutput(this, 'ScanWorkflowName', {
      value: this.scanWorkflow.stateMachineName,
      description: 'Scan workflow State Machine name',
      exportName: `${config.environment}-scan-workflow-name`,
    });

    // Cost Estimation Tag
    cdk.Tags.of(this).add('MonthlyEstimate', config.environment === 'dev'
      ? '$0.03-0.10 (4K free transitions/month)'
      : config.environment === 'staging'
      ? '$0.75-2'
      : '$7-15');
  }
}

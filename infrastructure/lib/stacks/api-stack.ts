import * as cdk from 'aws-cdk-lib';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { EnvironmentConfig } from '../../config/config';

interface ApiStackProps extends cdk.StackProps {
  config: EnvironmentConfig;
  lambdaFunctions: {
    apiHandler: lambda.Function;
  };
}

export class ApiStack extends cdk.Stack {
  public readonly api: apigateway.RestApi;
  public readonly userPool: cognito.UserPool;

  constructor(scope: Construct, id: string, props: ApiStackProps) {
    super(scope, id, props);

    const { config, lambdaFunctions } = props;

    // Cognito User Pool for authentication
    this.userPool = new cognito.UserPool(this, 'UserPool', {
      userPoolName: `${config.environment}-investment-scanner-users`,
      selfSignUpEnabled: true,
      signInAliases: {
        email: true,
      },
      autoVerify: {
        email: true,
      },
      standardAttributes: {
        email: {
          required: true,
          mutable: true,
        },
        fullname: {
          required: false,
          mutable: true,
        },
      },
      customAttributes: {
        timezone: new cognito.StringAttribute({ minLen: 1, maxLen: 50, mutable: true }),
        country_code: new cognito.StringAttribute({ minLen: 2, maxLen: 3, mutable: true }),
        preferred_currency: new cognito.StringAttribute({ minLen: 3, maxLen: 3, mutable: true }),
      },
      passwordPolicy: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireDigits: true,
        requireSymbols: false,
      },
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
      removalPolicy: config.environment === 'prod'
        ? cdk.RemovalPolicy.RETAIN
        : cdk.RemovalPolicy.DESTROY,
    });

    // User Pool Client
    const userPoolClient = this.userPool.addClient('WebClient', {
      userPoolClientName: `${config.environment}-investment-scanner-web`,
      authFlows: {
        userPassword: true,
        userSrp: true,
        custom: true,
      },
      oAuth: {
        flows: {
          authorizationCodeGrant: true,
        },
        scopes: [
          cognito.OAuthScope.EMAIL,
          cognito.OAuthScope.OPENID,
          cognito.OAuthScope.PROFILE,
        ],
      },
      preventUserExistenceErrors: true,
    });

    // API Gateway with Cognito Authorizer
    const authorizer = new apigateway.CognitoUserPoolsAuthorizer(this, 'CognitoAuthorizer', {
      cognitoUserPools: [this.userPool],
      authorizerName: 'InvestmentScannerAuthorizer',
      identitySource: 'method.request.header.Authorization',
    });

    // REST API
    this.api = new apigateway.RestApi(this, 'Api', {
      restApiName: `${config.environment}-investment-scanner-api`,
      description: 'Investment Scanner REST API',
      deployOptions: {
        stageName: config.environment,
        metricsEnabled: true,
        loggingLevel: apigateway.MethodLoggingLevel.INFO,
        dataTraceEnabled: config.environment !== 'prod',
        tracingEnabled: true,
      },
      defaultCorsPreflightOptions: {
        allowOrigins: config.environment === 'prod'
          ? [`https://${config.domainName}`, `https://www.${config.domainName}`]
          : apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
        allowHeaders: [
          'Content-Type',
          'X-Amz-Date',
          'Authorization',
          'X-Api-Key',
          'X-Amz-Security-Token',
        ],
        allowCredentials: true,
      },
      cloudWatchRole: true,
    });

    // Lambda integration
    const apiIntegration = new apigateway.LambdaIntegration(lambdaFunctions.apiHandler, {
      proxy: true,
      allowTestInvoke: config.environment !== 'prod',
    });

    // API Resources and Methods

    // Public endpoints (no auth required)
    const healthResource = this.api.root.addResource('health');
    healthResource.addMethod('GET', apiIntegration);

    // Protected endpoints (require Cognito auth)
    const apiV1 = this.api.root.addResource('v1');

    // Digests endpoints
    const digestsResource = apiV1.addResource('digests');
    digestsResource.addMethod('GET', apiIntegration, {
      authorizer,
      authorizationType: apigateway.AuthorizationType.COGNITO,
    });

    const latestDigestResource = digestsResource.addResource('latest');
    latestDigestResource.addMethod('GET', apiIntegration, {
      authorizer,
      authorizationType: apigateway.AuthorizationType.COGNITO,
    });

    // Watchlist endpoints
    const watchlistResource = apiV1.addResource('watchlist');
    watchlistResource.addMethod('GET', apiIntegration, {
      authorizer,
      authorizationType: apigateway.AuthorizationType.COGNITO,
    });
    watchlistResource.addMethod('POST', apiIntegration, {
      authorizer,
      authorizationType: apigateway.AuthorizationType.COGNITO,
    });

    const watchlistTickerResource = watchlistResource.addResource('{ticker}');
    watchlistTickerResource.addMethod('DELETE', apiIntegration, {
      authorizer,
      authorizationType: apigateway.AuthorizationType.COGNITO,
    });

    // Opportunities endpoints
    const opportunitiesResource = apiV1.addResource('opportunities');
    opportunitiesResource.addMethod('GET', apiIntegration, {
      authorizer,
      authorizationType: apigateway.AuthorizationType.COGNITO,
    });

    // User preferences endpoints
    const preferencesResource = apiV1.addResource('preferences');
    preferencesResource.addMethod('GET', apiIntegration, {
      authorizer,
      authorizationType: apigateway.AuthorizationType.COGNITO,
    });
    preferencesResource.addMethod('PUT', apiIntegration, {
      authorizer,
      authorizationType: apigateway.AuthorizationType.COGNITO,
    });

    // CloudFormation Outputs
    new cdk.CfnOutput(this, 'ApiEndpoint', {
      value: this.api.url,
      description: 'API Gateway endpoint',
      exportName: `${config.environment}-api-endpoint`,
    });

    new cdk.CfnOutput(this, 'UserPoolId', {
      value: this.userPool.userPoolId,
      description: 'Cognito User Pool ID',
      exportName: `${config.environment}-user-pool-id`,
    });

    new cdk.CfnOutput(this, 'UserPoolClientId', {
      value: userPoolClient.userPoolClientId,
      description: 'Cognito User Pool Client ID',
      exportName: `${config.environment}-user-pool-client-id`,
    });

    // Cost Estimation Tag
    cdk.Tags.of(this).add('MonthlyEstimate', config.environment === 'dev'
      ? '$0.50-2 (API Gateway + Cognito free tier)'
      : config.environment === 'staging'
      ? '$3-10'
      : '$35-60');
  }
}

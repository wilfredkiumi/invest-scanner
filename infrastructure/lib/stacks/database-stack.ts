import * as cdk from 'aws-cdk-lib';
import * as rds from 'aws-cdk-lib/aws-rds';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import * as logs from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';
import { EnvironmentConfig } from '../../config/config';

interface DatabaseStackProps extends cdk.StackProps {
  config: EnvironmentConfig;
}

export class DatabaseStack extends cdk.Stack {
  public readonly database: rds.DatabaseCluster;
  public readonly vpc: ec2.Vpc;
  public readonly databaseSecret: secretsmanager.Secret;

  constructor(scope: Construct, id: string, props: DatabaseStackProps) {
    super(scope, id, props);

    const { config } = props;

    // VPC - Use default VPC for MVP to save costs
    // For production, create a dedicated VPC
    this.vpc = config.environment === 'prod'
      ? new ec2.Vpc(this, 'VPC', {
          maxAzs: 2,
          natGateways: 1, // Single NAT Gateway to save costs
          subnetConfiguration: [
            {
              cidrMask: 24,
              name: 'public',
              subnetType: ec2.SubnetType.PUBLIC,
            },
            {
              cidrMask: 24,
              name: 'private',
              subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
            },
            {
              cidrMask: 28,
              name: 'isolated',
              subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
            },
          ],
        })
      : ec2.Vpc.fromLookup(this, 'DefaultVPC', { isDefault: true });

    // Database credentials secret
    this.databaseSecret = new secretsmanager.Secret(this, 'DatabaseSecret', {
      secretName: `${config.environment}/investment-scanner/database`,
      description: 'Investment Scanner database credentials',
      generateSecretString: {
        secretStringTemplate: JSON.stringify({
          username: 'postgres',
        }),
        generateStringKey: 'password',
        excludePunctuation: true,
        includeSpace: false,
        passwordLength: 32,
      },
    });

    // Security Group for Aurora
    const dbSecurityGroup = new ec2.SecurityGroup(this, 'DatabaseSecurityGroup', {
      vpc: this.vpc,
      description: 'Security group for Aurora Serverless v2',
      allowAllOutbound: true,
    });

    // Allow Lambda access (will be refined when Lambda SG is created)
    dbSecurityGroup.addIngressRule(
      ec2.Peer.ipv4(this.vpc.vpcCidrBlock),
      ec2.Port.tcp(5432),
      'Allow PostgreSQL access from VPC'
    );

    // Parameter Group for PostgreSQL optimization
    const parameterGroup = new rds.ParameterGroup(this, 'ParameterGroup', {
      engine: rds.DatabaseClusterEngine.auroraPostgres({
        version: rds.AuroraPostgresEngineVersion.VER_15_4,
      }),
      description: 'Parameter group for Investment Scanner Aurora cluster',
      parameters: {
        'shared_preload_libraries': 'pg_stat_statements',
        'log_statement': 'all',
        'log_min_duration_statement': '1000', // Log queries > 1 second
      },
    });

    // Aurora Serverless v2 Cluster - MOST COST-EFFECTIVE FOR MVP
    this.database = new rds.DatabaseCluster(this, 'Database', {
      engine: rds.DatabaseClusterEngine.auroraPostgres({
        version: rds.AuroraPostgresEngineVersion.VER_15_4,
      }),
      credentials: rds.Credentials.fromSecret(this.databaseSecret),
      writer: rds.ClusterInstance.serverlessV2('writer', {
        autoMinorVersionUpgrade: true,
        publiclyAccessible: false,
        enablePerformanceInsights: config.enableDetailedMonitoring,
        parameterGroup,
      }),
      // No readers in MVP to save costs - add in production
      readers: config.enableMultiAz
        ? [
            rds.ClusterInstance.serverlessV2('reader1', {
              scaleWithWriter: true,
              autoMinorVersionUpgrade: true,
              publiclyAccessible: false,
            }),
          ]
        : [],
      vpc: this.vpc,
      vpcSubnets: {
        subnetType: config.environment === 'prod'
          ? ec2.SubnetType.PRIVATE_ISOLATED
          : ec2.SubnetType.PUBLIC, // Public for dev/MVP - easier Lambda access
      },
      securityGroups: [dbSecurityGroup],
      defaultDatabaseName: 'investmentscanner',
      backup: {
        retention: cdk.Duration.days(config.databaseBackupRetention),
        preferredWindow: '03:00-04:00', // EAT 6:00-7:00 AM (before digest generation)
      },
      cloudwatchLogsExports: ['postgresql'],
      cloudwatchLogsRetention: logs.RetentionDays.ONE_WEEK,
      storageEncrypted: true,
      // MVP COST OPTIMIZATION - Auto-pause when not in use
      serverlessV2MinCapacity: config.minAuroraCapacity,
      serverlessV2MaxCapacity: config.maxAuroraCapacity,
      deletionProtection: config.environment === 'prod',
      removalPolicy: config.environment === 'prod'
        ? cdk.RemovalPolicy.RETAIN
        : cdk.RemovalPolicy.DESTROY,
    });

    // Enable Data API for Lambda - No connection pooling needed!
    // This saves costs and simplifies Lambda code
    const cfnCluster = this.database.node.defaultChild as rds.CfnDBCluster;
    cfnCluster.enableHttpEndpoint = true;

    // CloudFormation Outputs
    new cdk.CfnOutput(this, 'DatabaseEndpoint', {
      value: this.database.clusterEndpoint.hostname,
      description: 'Aurora cluster endpoint',
      exportName: `${config.environment}-database-endpoint`,
    });

    new cdk.CfnOutput(this, 'DatabaseSecretArn', {
      value: this.databaseSecret.secretArn,
      description: 'Database secret ARN',
      exportName: `${config.environment}-database-secret-arn`,
    });

    new cdk.CfnOutput(this, 'DatabaseName', {
      value: 'investmentscanner',
      description: 'Database name',
      exportName: `${config.environment}-database-name`,
    });

    // Cost Estimation Tag
    cdk.Tags.of(this).add('MonthlyEstimate', config.environment === 'dev'
      ? '$2-5 (with auto-pause)'
      : config.environment === 'staging'
      ? '$7-15'
      : '$60-100');
  }
}

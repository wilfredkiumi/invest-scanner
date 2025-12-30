export interface EnvironmentConfig {
  environment: 'dev' | 'staging' | 'prod';
  account: string;
  region: string;

  // Cost optimization flags
  enableAutoPause: boolean;
  enableMultiAz: boolean;
  minAuroraCapacity: number;
  maxAuroraCapacity: number;

  // Lambda configuration
  lambdaMemorySize: number;
  lambdaTimeout: number;

  // Database
  databaseBackupRetention: number;

  // Monitoring
  enableDetailedMonitoring: boolean;
  logRetentionDays: number;

  // Application settings
  digestTimeEAT: string; // East Africa Time
  domainName?: string;
}

export const getConfig = (env: string = 'dev'): EnvironmentConfig => {
  const configs: Record<string, EnvironmentConfig> = {
    dev: {
      environment: 'dev',
      account: process.env.CDK_DEFAULT_ACCOUNT || '',
      region: process.env.CDK_DEFAULT_REGION || 'us-east-1',

      // MVP Cost Optimization - Maximum savings
      enableAutoPause: true,  // Aurora pauses after 5 min of inactivity
      enableMultiAz: false,   // Single AZ for dev/MVP
      minAuroraCapacity: 0.5, // Minimum ACU (Aurora Capacity Units)
      maxAuroraCapacity: 2,   // Max ACU for dev

      // Lambda - Small memory for MVP
      lambdaMemorySize: 256,  // MB - Most cost-effective for light workloads
      lambdaTimeout: 60,      // seconds - 1 minute max

      // Database backups - Minimal for dev
      databaseBackupRetention: 1, // days

      // Monitoring - Basic for dev
      enableDetailedMonitoring: false,
      logRetentionDays: 7,

      // Application
      digestTimeEAT: '06:00',
    },

    staging: {
      environment: 'staging',
      account: process.env.CDK_DEFAULT_ACCOUNT || '',
      region: 'us-east-1', // Primary region for cost efficiency

      // Staging - Balance cost and testing
      enableAutoPause: true,
      enableMultiAz: false,   // Still single AZ for staging
      minAuroraCapacity: 0.5,
      maxAuroraCapacity: 4,   // Allow more scale for load testing

      lambdaMemorySize: 512,  // MB - More memory for realistic testing
      lambdaTimeout: 120,     // 2 minutes

      databaseBackupRetention: 7,

      enableDetailedMonitoring: true,
      logRetentionDays: 30,

      digestTimeEAT: '06:00',
    },

    prod: {
      environment: 'prod',
      account: process.env.CDK_DEFAULT_ACCOUNT || '',
      region: 'us-east-1', // Primary region

      // Production - Performance and reliability
      enableAutoPause: false, // No auto-pause in production (24/7 availability)
      enableMultiAz: true,    // High availability
      minAuroraCapacity: 2,   // Higher minimum for production
      maxAuroraCapacity: 16,  // Can scale to handle load

      lambdaMemorySize: 1024, // 1 GB for production performance
      lambdaTimeout: 300,     // 5 minutes max

      databaseBackupRetention: 30,

      enableDetailedMonitoring: true,
      logRetentionDays: 90,

      digestTimeEAT: '06:00',
      domainName: 'investmentscanner.com', // Your domain
    },
  };

  return configs[env] || configs.dev;
};

export const STACK_PREFIX = 'InvestmentScanner';

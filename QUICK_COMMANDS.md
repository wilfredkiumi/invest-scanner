# ⚡ Quick Commands Reference

Handy commands for deploying and managing your Investment Scanner.

## 🚀 Initial Setup

```bash
# 1. Install dependencies
cd infrastructure
npm install

# 2. Set up environment
cp .env.example .env
# Edit .env with your AWS account details

# 3. Bootstrap CDK (one-time)
cdk bootstrap aws://YOUR-ACCOUNT-ID/us-east-1

# 4. Create secrets
aws secretsmanager create-secret \
  --name dev/investment-scanner/api-keys \
  --secret-string '{"ALPHA_VANTAGE_API_KEY":"demo","FRED_API_KEY":"your-key"}'
```

## 📦 Deployment

```bash
# Preview changes (recommended before deploying)
npm run diff

# Deploy to dev
npm run deploy:dev

# Deploy to staging
npm run deploy:staging

# Deploy to production
npm run deploy:prod

# Deploy specific stack
cdk deploy InvestmentScanner-Database-dev

# Deploy all stacks
npm run deploy
```

## 🧹 Cleanup

```bash
# Destroy all stacks (CAREFUL!)
npm run destroy

# Destroy specific environment
cdk destroy --all --context environment=dev

# List all stacks
cdk list
```

## 🔍 Monitoring

```bash
# View CloudWatch logs (Lambda)
aws logs tail /aws/lambda/dev-investment-scanner-fetch-stocks --follow

# View Step Functions logs
aws logs tail /aws/stepfunctions/dev-investment-scanner-scan --follow

# List recent executions
aws stepfunctions list-executions \
  --state-machine-arn arn:aws:states:REGION:ACCOUNT:stateMachine:dev-investment-scanner-scan-workflow

# Get execution details
aws stepfunctions describe-execution \
  --execution-arn EXECUTION_ARN
```

## 🧪 Testing

```bash
# Manual scan trigger
aws stepfunctions start-execution \
  --state-machine-arn arn:aws:states:us-east-1:ACCOUNT:stateMachine:dev-investment-scanner-scan-workflow \
  --name test-$(date +%s) \
  --input '{"scanType":"manual","stockTickers":["AAPL","MSFT"]}'

# Test API health endpoint
curl https://YOUR-API-ID.execute-api.us-east-1.amazonaws.com/dev/health

# Invoke Lambda directly
aws lambda invoke \
  --function-name dev-investment-scanner-fetch-stocks \
  --payload '{"tickers":["AAPL"]}' \
  response.json
cat response.json
```

## 📧 Email (SES)

```bash
# Verify email address
aws ses verify-email-identity --email-address no-reply@yourdomain.com

# Check verification status
aws ses get-identity-verification-attributes \
  --identities no-reply@yourdomain.com

# Check SES quota
aws ses get-send-quota

# List verified identities
aws ses list-identities
```

## 🗄️ Database

```bash
# Execute SQL via RDS Data API
aws rds-data execute-statement \
  --resource-arn "YOUR-DB-CLUSTER-ARN" \
  --secret-arn "YOUR-SECRET-ARN" \
  --database investmentscanner \
  --sql "SELECT COUNT(*) FROM users;"

# Describe cluster
aws rds describe-db-clusters \
  --db-cluster-identifier dev-investmentscanner-database

# Check if database is paused
aws rds describe-db-clusters \
  --db-cluster-identifier dev-investmentscanner-database \
  --query 'DBClusters[0].Status'
```

## 🔐 Secrets Manager

```bash
# Get secret value
aws secretsmanager get-secret-value \
  --secret-id dev/investment-scanner/api-keys

# Update secret
aws secretsmanager update-secret \
  --secret-id dev/investment-scanner/api-keys \
  --secret-string '{"ALPHA_VANTAGE_API_KEY":"new-key"}'

# List all secrets
aws secretsmanager list-secrets
```

## 👥 Cognito

```bash
# Create test user
aws cognito-idp sign-up \
  --client-id YOUR-USER-POOL-CLIENT-ID \
  --username testuser@example.com \
  --password TestPassword123!

# Confirm user (dev only)
aws cognito-idp admin-confirm-sign-up \
  --user-pool-id us-east-1_ABC123 \
  --username testuser@example.com

# List users
aws cognito-idp list-users \
  --user-pool-id us-east-1_ABC123
```

## 💰 Cost Monitoring

```bash
# Get current month costs
aws ce get-cost-and-usage \
  --time-period Start=2025-01-01,End=2025-01-31 \
  --granularity MONTHLY \
  --metrics BlendedCost \
  --filter file://filter.json

# Create budget alert
aws budgets create-budget \
  --account-id YOUR-ACCOUNT-ID \
  --budget file://budget.json \
  --notifications-with-subscribers file://notifications.json
```

## 🔧 Debugging

```bash
# Check CDK version
cdk --version

# Synthesize CloudFormation template
npm run synth

# View synthesized template
cat cdk.out/InvestmentScanner-Database-dev.template.json

# Check for stack drift
aws cloudformation detect-stack-drift \
  --stack-name InvestmentScanner-Database-dev

# Get stack outputs
aws cloudformation describe-stacks \
  --stack-name InvestmentScanner-Database-dev \
  --query 'Stacks[0].Outputs'
```

## 📊 CloudWatch Metrics

```bash
# Get Lambda invocation count
aws cloudwatch get-metric-statistics \
  --namespace AWS/Lambda \
  --metric-name Invocations \
  --dimensions Name=FunctionName,Value=dev-investment-scanner-fetch-stocks \
  --start-time 2025-01-01T00:00:00Z \
  --end-time 2025-01-02T00:00:00Z \
  --period 3600 \
  --statistics Sum

# Get Step Functions execution count
aws cloudwatch get-metric-statistics \
  --namespace AWS/States \
  --metric-name ExecutionsFailed \
  --dimensions Name=StateMachineArn,Value=arn:aws:states:REGION:ACCOUNT:stateMachine:dev-scan-workflow \
  --start-time 2025-01-01T00:00:00Z \
  --end-time 2025-01-02T00:00:00Z \
  --period 86400 \
  --statistics Sum
```

## 🌍 Multi-Region

```bash
# Deploy to Africa region
cdk deploy --all --context environment=dev --region af-south-1

# Set default region
export AWS_DEFAULT_REGION=af-south-1
```

## 🤖 AI/ML (When Implemented)

```bash
# List Bedrock models
aws bedrock list-foundation-models --region us-east-1

# Create SageMaker domain
aws sagemaker create-domain \
  --domain-name investment-ml \
  --auth-mode IAM

# List SageMaker endpoints
aws sagemaker list-endpoints

# Create Forecast dataset
aws forecast create-dataset \
  --dataset-name stock-prices \
  --domain CUSTOM \
  --dataset-type TARGET_TIME_SERIES
```

## 🔄 CI/CD (Future)

```bash
# GitHub Actions example
name: Deploy to AWS
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy CDK
        run: |
          cd infrastructure
          npm install
          npm run deploy:staging
```

## 📱 Quick Troubleshooting

```bash
# Lambda timeout?
aws lambda update-function-configuration \
  --function-name dev-investment-scanner-fetch-stocks \
  --timeout 120

# Out of memory?
aws lambda update-function-configuration \
  --function-name dev-investment-scanner-fetch-stocks \
  --memory-size 512

# Check Lambda environment variables
aws lambda get-function-configuration \
  --function-name dev-investment-scanner-fetch-stocks

# View recent errors
aws logs filter-log-events \
  --log-group-name /aws/lambda/dev-investment-scanner-fetch-stocks \
  --filter-pattern "ERROR" \
  --max-items 10
```

## 🎯 One-Liner Utilities

```bash
# Get all CloudFormation stack names
aws cloudformation list-stacks --stack-status-filter CREATE_COMPLETE UPDATE_COMPLETE --query 'StackSummaries[*].StackName'

# Count Lambda functions
aws lambda list-functions --query 'Functions[*].FunctionName' | grep investment-scanner | wc -l

# Total monthly cost estimate
aws ce get-cost-forecast \
  --time-period Start=2025-01-01,End=2025-01-31 \
  --metric BLENDED_COST \
  --granularity MONTHLY

# Delete all log groups (CAREFUL!)
aws logs describe-log-groups \
  --log-group-name-prefix /aws/lambda/dev-investment-scanner \
  --query 'logGroups[*].logGroupName' \
  --output text | xargs -n 1 aws logs delete-log-group --log-group-name

# Restart Aurora (if paused)
aws rds start-db-cluster --db-cluster-identifier dev-investmentscanner-database
```

## 📖 Useful AWS Console Links

```bash
# CloudFormation Stacks
https://console.aws.amazon.com/cloudformation/home?region=us-east-1

# Lambda Functions
https://console.aws.amazon.com/lambda/home?region=us-east-1

# Step Functions
https://console.aws.amazon.com/states/home?region=us-east-1

# CloudWatch Dashboard
https://console.aws.amazon.com/cloudwatch/home?region=us-east-1#dashboards:name=dev-InvestmentScanner

# RDS Databases
https://console.aws.amazon.com/rds/home?region=us-east-1

# Cost Explorer
https://console.aws.amazon.com/cost-management/home?region=us-east-1#/dashboard

# SES Email
https://console.aws.amazon.com/ses/home?region=us-east-1

# Secrets Manager
https://console.aws.amazon.com/secretsmanager/home?region=us-east-1
```

---

**💡 Tip:** Save this file and use it as your command reference when working with the Investment Scanner!

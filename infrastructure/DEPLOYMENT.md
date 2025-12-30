# 🚀 Deployment Guide - Investment Scanner

Step-by-step guide to deploy the Investment Scanner to AWS.

## Prerequisites Checklist

- [ ] AWS Account created
- [ ] AWS CLI installed and configured (`aws --version`)
- [ ] Node.js 20+ installed (`node --version`)
- [ ] AWS CDK installed (`npm install -g aws-cdk`)
- [ ] Git repository initialized
- [ ] Domain name (optional, for production)

## Step 1: AWS Account Setup

### 1.1 Configure AWS CLI

```bash
aws configure
# Enter your AWS Access Key ID
# Enter your AWS Secret Access Key
# Default region: us-east-1
# Default output format: json
```

### 1.2 Verify AWS Credentials

```bash
aws sts get-caller-identity
```

You should see your account ID and user ARN.

## Step 2: CDK Bootstrap

Bootstrap CDK in your AWS account (one-time setup per region):

```bash
cd infrastructure

# Bootstrap for dev environment
cdk bootstrap aws://YOUR-ACCOUNT-ID/us-east-1

# If deploying to multiple regions (e.g., Africa region)
cdk bootstrap aws://YOUR-ACCOUNT-ID/af-south-1
```

## Step 3: Create Required Secrets

### 3.1 API Keys Secret

Create a secret to store API keys for external services:

```bash
# Dev environment
aws secretsmanager create-secret \
  --name dev/investment-scanner/api-keys \
  --description "API keys for Investment Scanner - Dev" \
  --secret-string '{
    "ALPHA_VANTAGE_API_KEY": "demo",
    "FRED_API_KEY": "your-fred-api-key",
    "COINMARKETCAP_API_KEY": "optional"
  }' \
  --region us-east-1

# Staging environment
aws secretsmanager create-secret \
  --name staging/investment-scanner/api-keys \
  --description "API keys for Investment Scanner - Staging" \
  --secret-string '{
    "ALPHA_VANTAGE_API_KEY": "your-real-key",
    "FRED_API_KEY": "your-fred-api-key"
  }' \
  --region us-east-1
```

### 3.2 Verify Secrets

```bash
aws secretsmanager list-secrets --region us-east-1
```

## Step 4: Install Dependencies

```bash
cd infrastructure
npm install
```

## Step 5: Review Configuration

Edit `config/config.ts` if needed:

```typescript
// For MVP, defaults are cost-optimized:
// - Auto-pause enabled
// - Single AZ
// - Minimal Aurora capacity (0.5 ACU)
```

## Step 6: Deploy Infrastructure

### 6.1 Preview Changes (Recommended)

```bash
npm run diff
```

This shows what will be created/changed.

### 6.2 Deploy to Dev

```bash
npm run deploy:dev
```

This will deploy all stacks:
1. InvestmentScanner-Database-dev
2. InvestmentScanner-Messaging-dev
3. InvestmentScanner-Lambda-dev
4. InvestmentScanner-Api-dev
5. InvestmentScanner-StepFunctions-dev
6. InvestmentScanner-Scheduler-dev
7. InvestmentScanner-Monitoring-dev

**Expected deployment time: 10-15 minutes**

### 6.3 Save CloudFormation Outputs

After deployment, save these outputs (they'll be displayed):

```bash
# Example outputs
dev-database-endpoint = your-cluster.us-east-1.rds.amazonaws.com
dev-api-endpoint = https://abc123.execute-api.us-east-1.amazonaws.com/dev/
dev-user-pool-id = us-east-1_ABC123XYZ
dev-email-queue-url = https://sqs.us-east-1.amazonaws.com/123456789/dev-investment-scanner-email-queue
```

## Step 7: Configure Amazon SES

### 7.1 Verify Sender Email (Required)

```bash
# Verify the email you'll send from
aws ses verify-email-identity \
  --email-address no-reply@yourdomain.com \
  --region us-east-1

# Check verification status
aws ses get-identity-verification-attributes \
  --identities no-reply@yourdomain.com \
  --region us-east-1
```

Check your inbox and click the verification link.

### 7.2 Request Production Access (For Production Only)

By default, SES is in sandbox mode (can only send to verified emails).

For production, request production access:
```bash
# Go to AWS Console > SES > Account Dashboard > Request production access
# Or use CLI:
aws service-quotas request-service-quota-increase \
  --service-code ses \
  --quota-code L-804C8AE8 \
  --desired-value 50000 \
  --region us-east-1
```

### 7.3 Verify Your Domain (Optional, Recommended for Production)

```bash
# Verify domain for better deliverability
aws ses verify-domain-identity \
  --domain yourdomain.com \
  --region us-east-1
```

Add the TXT record to your DNS provider as instructed.

## Step 8: Initialize Database Schema

### 8.1 Connect to Aurora via RDS Data API

Create a SQL file `schema.sql`:

```sql
-- See investment_scanner_prd.md for full schema
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255),
    timezone VARCHAR(50) DEFAULT 'UTC',
    digest_time TIME DEFAULT '06:00:00',
    is_active BOOLEAN DEFAULT true,
    country_code VARCHAR(3) DEFAULT 'US',
    preferred_currency VARCHAR(3) DEFAULT 'USD',
    market_preference VARCHAR(20) DEFAULT 'global',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add other tables from PRD...
```

### 8.2 Execute Schema via AWS CLI

```bash
# Get database ARN and secret ARN from CloudFormation outputs

aws rds-data execute-statement \
  --resource-arn "arn:aws:rds:us-east-1:123456789:cluster:dev-investmentscanner-xyz" \
  --secret-arn "arn:aws:secretsmanager:us-east-1:123456789:secret:dev/investment-scanner/database" \
  --database investmentscanner \
  --sql "$(cat schema.sql)"
```

## Step 9: Test the Deployment

### 9.1 Manual Scan Trigger

Test the Step Functions workflow:

```bash
aws stepfunctions start-execution \
  --state-machine-arn arn:aws:states:us-east-1:YOUR-ACCOUNT:stateMachine:dev-investment-scanner-scan-workflow \
  --name test-run-$(date +%s) \
  --input '{
    "scanType": "manual",
    "stockTickers": ["AAPL", "MSFT", "JNJ"],
    "nseTickers": ["SCOM.NB", "KCB.NB"]
  }'
```

### 9.2 Check Execution Status

```bash
# View Step Functions execution in AWS Console
https://console.aws.amazon.com/states/home?region=us-east-1

# Or via CLI
aws stepfunctions list-executions \
  --state-machine-arn arn:aws:states:us-east-1:YOUR-ACCOUNT:stateMachine:dev-investment-scanner-scan-workflow \
  --max-results 5
```

### 9.3 Check CloudWatch Logs

```bash
# Tail Lambda logs
aws logs tail /aws/lambda/dev-investment-scanner-fetch-stocks --follow

# Check for errors
aws logs filter-log-events \
  --log-group-name /aws/lambda/dev-investment-scanner-fetch-stocks \
  --filter-pattern "ERROR"
```

### 9.4 Test API Endpoint

```bash
# Health check (no auth required)
curl https://YOUR-API-ID.execute-api.us-east-1.amazonaws.com/dev/health

# Should return: {"status":"healthy"}
```

## Step 10: Create Test User

### 10.1 Sign Up via Cognito

```bash
aws cognito-idp sign-up \
  --client-id YOUR-USER-POOL-CLIENT-ID \
  --username testuser@example.com \
  --password TestPassword123! \
  --user-attributes Name=email,Value=testuser@example.com
```

### 10.2 Confirm User (Dev Only)

```bash
aws cognito-idp admin-confirm-sign-up \
  --user-pool-id us-east-1_ABC123 \
  --username testuser@example.com
```

### 10.3 Insert User into Database

```bash
aws rds-data execute-statement \
  --resource-arn "YOUR-DB-ARN" \
  --secret-arn "YOUR-SECRET-ARN" \
  --database investmentscanner \
  --sql "INSERT INTO users (email, full_name, country_code, preferred_currency)
         VALUES ('testuser@example.com', 'Test User', 'KE', 'KES')"
```

## Step 11: Monitor the Deployment

### 11.1 Access CloudWatch Dashboard

```bash
# Go to CloudWatch Console
https://console.aws.amazon.com/cloudwatch/home?region=us-east-1#dashboards:name=dev-InvestmentScanner
```

### 11.2 Subscribe to Alarm Notifications

Update the email in `monitoring-stack.ts` and redeploy:

```typescript
this.alarmTopic.addSubscription(
  new subscriptions.EmailSubscription('YOUR-EMAIL@example.com')
);
```

```bash
npm run deploy:dev -- InvestmentScanner-Monitoring-dev
```

Confirm the SNS subscription in your email.

## Step 12: Production Deployment (When Ready)

### 12.1 Create Production Secrets

```bash
aws secretsmanager create-secret \
  --name prod/investment-scanner/api-keys \
  --description "API keys for Investment Scanner - Production" \
  --secret-string '{
    "ALPHA_VANTAGE_API_KEY": "production-key",
    "FRED_API_KEY": "production-key"
  }' \
  --region us-east-1
```

### 12.2 Update Configuration

Edit `config/config.ts` for production domain:

```typescript
prod: {
  // ...
  domainName: 'investmentscanner.com',
}
```

### 12.3 Deploy to Production

```bash
npm run deploy:prod
```

**Warning:** Production deployment includes:
- Multi-AZ (higher cost)
- No auto-pause (24/7 availability)
- Deletion protection enabled
- Higher resource limits

**Estimated cost: $325-350/month for 1,000 users**

## Troubleshooting

### Issue: CDK Bootstrap Fails

```bash
# Ensure you have administrator access
aws iam get-user

# Try with explicit credentials
export AWS_ACCESS_KEY_ID=your-key
export AWS_SECRET_ACCESS_KEY=your-secret
cdk bootstrap
```

### Issue: Aurora Won't Start

Check:
- VPC has correct subnets
- Security groups allow Lambda access
- Database secret exists

```bash
aws rds describe-db-clusters \
  --db-cluster-identifier dev-investmentscanner-database-xyz
```

### Issue: Lambda Timeout

Increase timeout in `config/config.ts`:

```typescript
lambdaTimeout: 120, // 2 minutes
```

### Issue: SES Emails Not Sending

Check:
- Email address verified
- Still in sandbox mode?
- Sender email matches verified address

```bash
aws ses get-send-quota --region us-east-1
```

### Issue: High Costs

Check:
- Aurora auto-pause is enabled (dev/staging)
- CloudWatch logs retention is set correctly
- No runaway Lambda invocations

```bash
# Check Aurora activity
aws rds describe-db-cluster-activity \
  --db-cluster-identifier dev-investmentscanner-xyz
```

## Cleanup / Destroy

To remove all resources:

```bash
# CAREFUL: This deletes everything!
npm run destroy

# Manually delete:
# - S3 buckets (if they have objects)
# - Secrets in Secrets Manager
# - CloudWatch log groups (optional)
```

## Cost Monitoring

Set up AWS Budget alerts:

```bash
aws budgets create-budget \
  --account-id YOUR-ACCOUNT-ID \
  --budget '{
    "BudgetName": "InvestmentScanner-Monthly",
    "BudgetLimit": {
      "Amount": "20",
      "Unit": "USD"
    },
    "TimeUnit": "MONTHLY",
    "BudgetType": "COST"
  }' \
  --notifications-with-subscribers '[{
    "Notification": {
      "NotificationType": "ACTUAL",
      "ComparisonOperator": "GREATER_THAN",
      "Threshold": 80
    },
    "Subscribers": [{
      "SubscriptionType": "EMAIL",
      "Address": "your-email@example.com"
    }]
  }]'
```

## Next Steps

1. ✅ Infrastructure deployed
2. 📝 Build Lambda function code
3. 🎨 Create email templates
4. 🖥️ Build Next.js frontend
5. 🧪 End-to-end testing
6. 🚀 Production deployment

---

**Need help?** Check AWS CloudWatch logs or open an issue in the repository.

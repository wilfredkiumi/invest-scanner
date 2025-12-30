# Investment Scanner - Serverless AWS Architecture

An automated investment opportunity scanner that delivers personalized daily digests via email. Built 100% on AWS serverless architecture with support for global markets including Kenya NSE.

## 📊 Architecture Overview

- **100% Serverless** - No servers to manage, automatic scaling
- **Cost-Optimized** - MVP costs ~$6-8/month with Aurora auto-pause
- **Global Markets** - Supports US stocks, NSE (Kenya), and other African markets
- **Multi-Currency** - USD, KES, NGN, ZAR, EGP support

## 🏗️ Infrastructure

### AWS Services Used

| Service | Purpose | Est. Cost (MVP) |
|---------|---------|-----------------|
| Aurora Serverless v2 | PostgreSQL database with auto-pause | $2-5/month |
| Lambda | Serverless compute for all functions | $0.20-1/month |
| Step Functions | Workflow orchestration | $0.03-0.10/month |
| EventBridge | Scheduled triggers (5:00 AM EAT daily) | $1/month |
| SQS | Email queue | $0 (free tier) |
| SES | Email delivery | $0.03-0.30/month |
| S3 | Email templates & digest archives | $0.50/month |
| API Gateway | REST API | $0.50-2/month |
| Cognito | User authentication | $0 (free tier) |
| CloudWatch | Monitoring & logs | $0.50-2/month |

**Total MVP Cost: ~$6-8/month**

## 🚀 Quick Start

### Prerequisites

- AWS Account
- Node.js 20+ installed
- AWS CLI configured
- AWS CDK CLI installed (`npm install -g aws-cdk`)

### 1. Clone and Setup

```bash
git clone <your-repo>
cd investment-advisor

# Install infrastructure dependencies
cd infrastructure
npm install
```

### 2. Configure Environment

Create a `.env` file in the `infrastructure/` directory:

```bash
CDK_DEFAULT_ACCOUNT=your-aws-account-id
CDK_DEFAULT_REGION=us-east-1
```

### 3. Bootstrap CDK (First Time Only)

```bash
cdk bootstrap aws://ACCOUNT-ID/us-east-1
```

### 4. Create Secrets in AWS Secrets Manager

Before deploying, create a secret for API keys:

```bash
aws secretsmanager create-secret \
  --name dev/investment-scanner/api-keys \
  --description "API keys for investment scanner" \
  --secret-string '{
    "ALPHA_VANTAGE_API_KEY": "your-key-here",
    "FRED_API_KEY": "your-key-here"
  }'
```

### 5. Deploy to Dev Environment

```bash
# Preview changes
npm run diff

# Deploy all stacks
npm run deploy:dev

# Or deploy specific stack
cdk deploy InvestmentScanner-Database-dev
```

### 6. Verify SES Email Address

After deployment, verify your sender email in Amazon SES:

```bash
aws ses verify-email-identity --email-address no-reply@yourdomain.com
```

## 📁 Project Structure

```
investment-advisor/
├── infrastructure/           # AWS CDK infrastructure code
│   ├── bin/
│   │   └── app.ts           # CDK app entry point
│   ├── lib/
│   │   └── stacks/
│   │       ├── database-stack.ts      # Aurora Serverless v2
│   │       ├── messaging-stack.ts     # SES, SNS, SQS
│   │       ├── lambda-stack.ts        # All Lambda functions
│   │       ├── api-stack.ts           # API Gateway + Cognito
│   │       ├── stepfunctions-stack.ts # Workflow orchestration
│   │       ├── scheduler-stack.ts     # EventBridge rules
│   │       └── monitoring-stack.ts    # CloudWatch dashboards
│   ├── config/
│   │   └── config.ts        # Environment configuration
│   └── package.json
├── backend/                 # Lambda function code (to be created)
│   ├── lambdas/
│   │   ├── fetch-stocks/
│   │   ├── fetch-bonds/
│   │   ├── scrape-data/
│   │   ├── analyze-opportunities/
│   │   ├── generate-digest/
│   │   ├── send-email/
│   │   └── api-handler/
│   └── layers/
│       └── shared/          # Shared dependencies
├── frontend/                # Next.js dashboard (to be created)
└── investment_scanner_prd.md # Product requirements
```

## 🛠️ Development Workflow

### Deploy to Different Environments

```bash
# Development (auto-pause enabled, single AZ)
npm run deploy:dev

# Staging (auto-pause enabled, load testing)
npm run deploy:staging

# Production (no auto-pause, multi-AZ, high availability)
npm run deploy:prod
```

### View CloudFormation Changes

```bash
npm run diff
```

### Synthesize CloudFormation Templates

```bash
npm run synth
```

### Destroy All Stacks

```bash
npm run destroy
```

## 💰 Cost Optimization Features

### Development/MVP (Maximize Savings)

- ✅ Aurora auto-pause after 5 minutes of inactivity
- ✅ Single AZ deployment
- ✅ Minimal Aurora capacity (0.5 ACU)
- ✅ Lambda with 256 MB memory
- ✅ 7-day log retention
- ✅ Free tier maximization

**Estimated: $6-8/month**

### Production (Performance & Reliability)

- 🔒 Multi-AZ for high availability
- 🔒 No auto-pause (24/7 availability)
- 🔒 Higher Aurora capacity (2+ ACU)
- 🔒 More Lambda memory (1024 MB)
- 🔒 90-day log retention
- 🔒 Deletion protection enabled

**Estimated: $325-350/month for 1,000 users**

## 📊 Monitoring

### CloudWatch Dashboard

Access your dashboard at:
```
https://console.aws.amazon.com/cloudwatch/home?region=us-east-1#dashboards:name=dev-InvestmentScanner
```

### Key Metrics Tracked

- Scan workflow executions (success/failure)
- Lambda function errors and duration
- Email queue depth
- Database ACU utilization
- Business metrics (opportunities found, emails sent)

### Alarms

Automatic alerts for:
- Scan workflow failures
- High Lambda error rates
- Failed email deliveries (DLQ)
- High database CPU (production only)

## 🔐 Security

- All data encrypted at rest (S3, Aurora, SQS)
- Secrets stored in AWS Secrets Manager
- IAM roles with least privilege
- Cognito for user authentication
- API Gateway with rate limiting
- VPC isolation for database (production)

## 🌍 Kenya/Africa-Specific Features

### Timezone Configuration

- All scans run at **5:00 AM EAT (East Africa Time)**
- EventBridge rules configured for UTC+3 offset

### Supported Markets

- **NSE (Nairobi)**: Safaricom, KCB, Equity, EABL, etc.
- **Kenya T-Bills**: 91-day, 182-day, 364-day
- **Kenya Treasury Bonds**: Infrastructure bonds, M-Akiba
- **Currency**: KES (Kenyan Shilling) support

### Mobile Optimization

- Email size <100 KB for mobile data efficiency
- SMS-only option available
- Lightweight CloudFront delivery via Johannesburg edge

## 🧪 Testing

### Manual Testing

Trigger a scan manually via AWS Console:

```bash
aws stepfunctions start-execution \
  --state-machine-arn arn:aws:states:us-east-1:ACCOUNT:stateMachine:dev-investment-scanner-scan-workflow \
  --input '{"scanType":"manual","stockTickers":["AAPL","MSFT"]}'
```

### Check Logs

```bash
# View Lambda logs
aws logs tail /aws/lambda/dev-investment-scanner-fetch-stocks --follow

# View Step Functions logs
aws logs tail /aws/stepfunctions/dev-investment-scanner-scan --follow
```

## 📝 Next Steps

1. **Build Lambda Functions** - Implement the backend logic
   - Data fetching (Alpha Vantage, Yahoo Finance, NSE)
   - Analysis engine (screening, scoring)
   - Digest generation
   - Email sending

2. **Create Email Templates** - Design HTML/plain text templates
   - Store in S3 bucket
   - Personalization logic

3. **Build Frontend Dashboard** - Next.js application
   - User authentication (Cognito)
   - Watchlist management
   - Digest archive viewing
   - User preferences

4. **Database Migrations** - Create initial schema
   - Users, watchlists, opportunities, digests tables

5. **Testing** - End-to-end testing
   - Unit tests for Lambda functions
   - Integration tests for workflows
   - Load testing for production readiness

## 📞 Support

For questions or issues:
- Review the [PRD](./investment_scanner_prd.md) for detailed requirements
- Check AWS CloudWatch logs for errors
- Review the monitoring dashboard

## 📄 License

MIT License - See LICENSE file for details

---

**Built with ❤️ using AWS CDK and serverless architecture**

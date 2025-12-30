# 💰 Cost Optimization Guide

This guide explains how the Investment Scanner infrastructure is optimized for cost-effectiveness, especially for MVP/development environments.

## Cost Breakdown by Environment

### 🧪 Development/MVP (~$6-8/month)

| Service | Monthly Cost | Optimization |
|---------|--------------|--------------|
| Aurora Serverless v2 | $2-5 | Auto-pause after 5 min, 0.5 ACU min |
| Lambda | $0.20-1 | Free tier (1M requests), 256 MB memory |
| Step Functions | $0.03-0.10 | Free tier (4K transitions) |
| EventBridge | $1 | Minimal rules (3 schedules) |
| SQS | $0 | Free tier (1M requests) |
| SES | $0.03-0.30 | $0.10 per 1,000 emails |
| S3 | $0.50 | <5 GB storage, lifecycle policies |
| API Gateway | $0.50-2 | Free tier (1M requests) |
| Cognito | $0 | Free tier (<50K MAU) |
| CloudWatch | $0.50-2 | 7-day log retention |

**Total: $6-8/month**

### 🔧 Staging (~$35-40/month)

Same as dev but with:
- More Aurora activity (~3 hours/day)
- Higher Lambda invocations for load testing
- 30-day log retention

### 🚀 Production (~$325-350/month for 1,000 users)

| Service | Monthly Cost | Notes |
|---------|--------------|-------|
| Aurora Serverless v2 | $60 | 24/7, Multi-AZ, 2 ACU min |
| ElastiCache | $50 | Serverless large |
| Lambda | $25 | 15M invocations |
| Step Functions | $7.50 | 300K transitions |
| API Gateway | $35 | 10M requests |
| SES | $3 | 30K emails |
| S3 + CloudFront | $20 | 50 GB + CDN |
| CloudWatch | $50 | Detailed monitoring |
| Others | $70 | Misc services |

**Total: $325-350/month**

## Key Cost-Saving Features

### 1. Aurora Serverless v2 Auto-Pause ⭐

**Biggest cost saver for MVP!**

```typescript
// In database-stack.ts
serverlessV2MinCapacity: 0.5,  // Minimum when active
serverlessV2MaxCapacity: 2,    // Maximum scale
enableAutoPause: true,         // Pause after 5 min inactivity
```

**Savings:**
- Dev: ~80% (database only active 1 hour/day)
- Staging: ~60% (active 3 hours/day)
- Production: 0% (no auto-pause, 24/7 availability)

**How it works:**
- Database pauses after 5 minutes of no connections
- When paused, you only pay for storage ($0.10/GB)
- Resumes automatically on first connection (5-10 second delay)

**Perfect for:** Development, testing, MVP, low-traffic apps

### 2. Lambda Memory Optimization

```typescript
// config.ts
dev: {
  lambdaMemorySize: 256,  // Minimal, cost-effective
  lambdaTimeout: 60,      // 1 minute
}

prod: {
  lambdaMemorySize: 1024, // Better performance
  lambdaTimeout: 300,     // 5 minutes
}
```

**Cost calculation:**
- 256 MB: $0.0000000021 per ms
- 1024 MB: $0.0000000083 per ms (4x more)

**For 100K invocations @ 500ms:**
- 256 MB: $0.11
- 1024 MB: $0.42

**Recommendation:** Start with 256 MB, increase if timeout issues occur

### 3. Free Tier Maximization

#### Always Free Tiers:
- **Lambda**: 1M requests/month + 400K GB-seconds compute
- **API Gateway**: 1M API calls/month (first 12 months)
- **DynamoDB**: 25 GB storage (if we switch from Aurora)
- **CloudWatch**: 10 custom metrics, 5 GB logs ingestion
- **SQS**: 1M requests/month
- **SNS**: 1M mobile push, 1K email notifications
- **Cognito**: 50K MAU (monthly active users)

#### 12-Month Free Tiers:
- **RDS/Aurora**: 750 hours/month (not applicable to Serverless v2)
- **ElastiCache**: 750 hours/month (t2.micro/t3.micro only)

### 4. S3 Lifecycle Policies

```typescript
// In messaging-stack.ts
lifecycleRules: [
  {
    id: 'DeleteOldDigests',
    enabled: true,
    prefix: 'digests/',
    expiration: cdk.Duration.days(90),
    transitions: [
      {
        // Move to cheaper storage after 30 days
        storageClass: s3.StorageClass.INTELLIGENT_TIERING,
        transitionAfter: cdk.Duration.days(30),
      },
    ],
  },
],
```

**Savings:**
- Standard: $0.023/GB/month
- Intelligent-Tiering: $0.0125/GB/month (after 30 days)
- Auto-delete after 90 days

**For 10 GB of digests:**
- Without lifecycle: $0.23/month
- With lifecycle: $0.15/month (35% savings)

### 5. CloudWatch Log Retention

```typescript
// config.ts
dev: {
  logRetentionDays: 7,  // Minimal for dev
}

prod: {
  logRetentionDays: 90, // Compliance requirement
}
```

**Cost:** $0.50/GB ingested + $0.03/GB stored

**Savings example:**
- 7-day retention: $0.50 + ($0.03 × 0.23) = $0.51/month
- 90-day retention: $0.50 + ($0.03 × 3) = $0.59/month

### 6. Single AZ vs Multi-AZ

```typescript
// config.ts
dev: {
  enableMultiAz: false,  // Single AZ
}

prod: {
  enableMultiAz: true,   // Multi-AZ for HA
}
```

**Aurora cost difference:**
- Single AZ: 1× cost
- Multi-AZ: 2× cost (additional reader instance)

**Savings:** 50% on database costs for dev/staging

### 7. API Gateway Caching (Production)

Not enabled in MVP to save costs. Can enable later:

```typescript
// For production when traffic grows
methodOptions: {
  caching: true,
  cacheTtl: cdk.Duration.minutes(5),
  cacheDataEncrypted: true,
}
```

**Cost:** $0.02/hour (~$15/month) per cache size

**ROI:** Reduces Lambda invocations by 60-80% for cached responses

### 8. No NAT Gateway in Dev

```typescript
// database-stack.ts
// Dev uses default VPC with public subnets
this.vpc = config.environment === 'prod'
  ? new ec2.Vpc(this, 'VPC', { ... })
  : ec2.Vpc.fromLookup(this, 'DefaultVPC', { isDefault: true });
```

**Savings:**
- NAT Gateway: $0.045/hour = $32.40/month
- Dev: $0 (uses default VPC, public subnets)

## Cost Monitoring Best Practices

### 1. Set Up AWS Budgets

```bash
aws budgets create-budget \
  --account-id YOUR-ACCOUNT-ID \
  --budget '{
    "BudgetName": "InvestmentScanner-Dev-Monthly",
    "BudgetLimit": { "Amount": "10", "Unit": "USD" },
    "TimeUnit": "MONTHLY",
    "BudgetType": "COST"
  }' \
  --notifications-with-subscribers '[{
    "Notification": {
      "NotificationType": "FORECASTED",
      "ComparisonOperator": "GREATER_THAN",
      "Threshold": 80
    },
    "Subscribers": [{
      "SubscriptionType": "EMAIL",
      "Address": "your-email@example.com"
    }]
  }]'
```

### 2. Use Cost Explorer Tags

All stacks are tagged with `MonthlyEstimate`:

```typescript
cdk.Tags.of(this).add('MonthlyEstimate', '$2-5');
```

Filter in Cost Explorer by tag to track actual vs estimated costs.

### 3. Enable Cost Allocation Tags

In AWS Console:
1. Go to Billing > Cost Allocation Tags
2. Activate tags: `Project`, `Environment`, `MonthlyEstimate`
3. Wait 24 hours for data to appear

### 4. CloudWatch Cost Anomaly Detection

Enable for automatic cost spike detection:

```bash
aws ce create-anomaly-monitor \
  --anomaly-monitor '{
    "MonitorName": "InvestmentScannerCostMonitor",
    "MonitorType": "DIMENSIONAL",
    "MonitorDimension": "SERVICE"
  }'
```

## Cost Scenarios

### Scenario 1: MVP with 1 User (You)

- **Daily scans:** 1× daily (5 AM)
- **Weekly scans:** 1× weekly
- **Monthly scans:** 1× monthly
- **Aurora active:** ~30 min/day
- **Emails:** 30/month

**Estimated:** $6-8/month

### Scenario 2: Beta with 10 Users

- **Daily scans:** 1× daily (all users)
- **Aurora active:** ~2 hours/day
- **Emails:** 300/month

**Estimated:** $8-12/month

### Scenario 3: Launch with 100 Users

- **Daily scans:** 1× daily
- **Aurora active:** ~6 hours/day
- **Emails:** 3,000/month
- **API calls:** ~10K/day

**Estimated:** $35-40/month

### Scenario 4: Growth with 1,000 Users

- **Daily scans:** 1× daily
- **Aurora:** 24/7 (disable auto-pause)
- **Multi-AZ:** Enabled for HA
- **Emails:** 30,000/month
- **API calls:** ~100K/day

**Estimated:** $325-350/month

## Red Flags (Cost Spikes)

### 🚨 Watch Out For:

1. **Aurora Never Pausing**
   - Check: CloudWatch metric `ServerlessDatabaseCapacity`
   - Fix: Ensure no long-running connections

2. **Lambda Runaway Invocations**
   - Check: Lambda invocation count CloudWatch metric
   - Fix: Add rate limiting, fix infinite loops

3. **CloudWatch Logs Explosion**
   - Check: Log group sizes in CloudWatch
   - Fix: Reduce log level, add log filtering

4. **API Gateway Abuse**
   - Check: API Gateway request count
   - Fix: Enable API keys, add rate limiting

5. **S3 Storage Growth**
   - Check: S3 bucket sizes
   - Fix: Ensure lifecycle policies are working

## Cost Optimization Checklist

### Daily Development:
- [ ] Stop Aurora manually if not needed (`aws rds stop-db-cluster`)
- [ ] Delete old CloudWatch log groups
- [ ] Review Step Functions execution costs

### Weekly Review:
- [ ] Check AWS Cost Explorer for trends
- [ ] Review CloudWatch metrics for unused resources
- [ ] Validate lifecycle policies are deleting old data

### Monthly Review:
- [ ] Compare actual vs estimated costs
- [ ] Review and optimize Lambda memory sizes
- [ ] Check for unused SES verified identities
- [ ] Review API Gateway usage patterns

## Transition: MVP → Production

When moving from MVP to production with real users:

### Keep:
- ✅ S3 lifecycle policies
- ✅ CloudWatch log retention policies
- ✅ Lambda memory optimization
- ✅ Free tier maximization

### Change:
- 🔄 Enable Multi-AZ for Aurora
- 🔄 Disable auto-pause for 24/7 availability
- 🔄 Increase Aurora min capacity (0.5 → 2 ACU)
- 🔄 Add ElastiCache for better performance
- 🔄 Increase Lambda memory for faster execution
- 🔄 Enable detailed CloudWatch monitoring
- 🔄 Add CloudFront for global CDN
- 🔄 Longer log retention (90 days for compliance)

## Summary: How We Achieve $6-8/month for MVP

1. **Aurora auto-pause** → Saves $40-50/month vs always-on
2. **No Multi-AZ** → Saves $50-60/month vs HA setup
3. **Free tiers** → Saves $10-15/month on Lambda, API Gateway, Cognito
4. **Minimal Lambda memory** → Saves $5-10/month vs high-memory config
5. **Short log retention** → Saves $3-5/month vs 90-day retention
6. **No NAT Gateway** → Saves $32/month vs custom VPC
7. **S3 lifecycle** → Saves $2-3/month on storage

**Total savings: $140-200/month vs production setup**

---

**💡 Tip:** Start with MVP config, monitor usage for 2-4 weeks, then optimize based on actual patterns before scaling to production.

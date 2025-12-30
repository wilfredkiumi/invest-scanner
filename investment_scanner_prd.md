# Investment Opportunity Scanner - Product Requirements Document

## 1. Executive Summary

### 1.1 Product Overview
An automated web application that scans financial markets daily for low-risk investment opportunities and delivers personalized digest reports via email every morning. The system prioritizes dividend stocks, bonds, treasury securities, and stable ETFs suitable for risk-averse investors.

### 1.2 Target User
- Individual investors seeking low-risk opportunities
- Focus on passive income generation (dividends, interest)
- Preference for data-driven decision support
- Limited time for manual market research
- **Global reach**: Including investors in developing markets (Kenya, Nigeria, South Africa, Egypt)
- **Mobile-first users** in emerging markets with limited desktop access

### 1.3 Core Value Proposition
Saves 2-3 hours daily by automating market scanning, filtering noise, and highlighting opportunities that match specific low-risk criteria.

---

## 2. Product Goals & Success Metrics

### 2.1 Primary Goals
1. Deliver actionable investment insights before market open (6:00 AM local time)
2. Maintain 95%+ email delivery success rate
3. Identify minimum 3-5 qualified opportunities per digest
4. Achieve signal accuracy (profitable opportunities) > 60% over 3 months

### 2.2 Key Performance Indicators (KPIs)
- Email open rate > 40%
- User engagement (link clicks) > 25%
- Digest generation completion time < 5 minutes
- API uptime > 99.5%
- False positive rate < 30%

---

## 3. Functional Requirements

### 3.1 Data Collection Module

#### 3.1.1 Financial Data Sources
**Primary APIs:**
- **Alpha Vantage** (Free tier: 500 calls/day)
  - Stock fundamentals (PE ratio, EPS, dividend yield)
  - Company overview data
  - Income statements

- **Yahoo Finance (yfinance Python library)**
  - Real-time stock prices
  - Historical price data
  - ETF holdings information
  - **Global markets support**: NSE (Nairobi), JSE (Johannesburg), EGX (Cairo), NGX (Lagos)

- **FRED API (Federal Reserve Economic Data)**
  - Treasury bond yields (1-year, 5-year, 10-year)
  - Federal funds rate
  - Inflation indicators

- **CoinGecko API** (Optional, for diversification)
  - Top 50 cryptocurrencies by market cap
  - Only include stablecoins and Bitcoin/Ethereum

**Developing Markets Data Sources:**
- **Nairobi Securities Exchange (NSE) API** - Kenya stocks and bonds
- **Central Bank of Kenya Open Data** - Treasury bills, bonds, inflation rates
- **African Markets API** (if available) - Regional opportunities
- **Mobile Money Rates** - M-Pesa money market funds, Saccos

**Web Scraping Targets:**
- Dividend.com - Dividend aristocrat lists
- Bankrate.com - High-yield savings account rates
- Treasury Direct - Latest bond auction results
- Seeking Alpha - Analyst ratings (respectful scraping with delays)
- **Kenya-specific**: CBK website for bond rates, NSE for dividend stocks

#### 3.1.2 Data Collection Schedule
- **Daily scan**: 5:00 AM (before market open)
- **Weekly deep scan**: Sundays 8:00 PM (fundamental analysis update)
- **Monthly refresh**: 1st of month (watchlist rebalancing)

#### 3.1.3 Watchlist Management
**Default Asset Categories:**
1. **Dividend Stocks** (50 tickers)
   - Dividend aristocrats (25+ years consecutive increases)
   - High-yield dividend stocks (yield > 3%)
   - REITs with stable distributions

2. **ETFs** (30 tickers)
   - Bond ETFs (AGG, BND, TLT)
   - Dividend ETFs (SCHD, VYM, DVY)
   - Low-volatility ETFs (USMV, SPLV)

3. **Fixed Income** (20 instruments)
   - US Treasury bonds (various maturities)
   - Investment-grade corporate bonds
   - Municipal bonds (tax advantages)

4. **Cash Equivalents** (10 sources)
   - High-yield savings accounts
   - Money market funds
   - Certificates of Deposit (CDs)

5. **Developing Markets Instruments** (Kenya Focus)
   - Kenya Treasury Bills (91-day, 182-day, 364-day)
   - Kenya Treasury Bonds (infrastructure bonds, tax-free bonds)
   - NSE Blue Chip Stocks (Safaricom, EABL, KCB, Equity Bank)
   - Money Market Funds (CIC, Britam, NCBA, Sanlam)
   - Saccos with dividends (government-backed)

**Dynamic Watchlist Features:**
- User can add/remove tickers via web interface
- Auto-suggest similar securities based on criteria
- Remove tickers with 3+ consecutive failed scans

---

### 3.2 Analysis Engine

#### 3.2.1 Low-Risk Screening Criteria

**Stock Screening (All must pass):**
```
Mandatory Filters:
- Market cap > $2 billion (avoid penny stocks)
- Average daily volume > 500,000 shares (liquidity)
- Price > $10 (avoid low-priced volatility)
- Listed on major exchange (NYSE, NASDAQ)

Low-Risk Indicators (Score ≥ 4 out of 6):
1. Dividend yield ≥ 2.5% (income generation)
2. Dividend payout ratio < 70% (sustainability)
3. PE ratio < 20 (not overvalued)
4. Debt-to-equity ratio < 1.0 (strong balance sheet)
5. Beta < 1.0 (less volatile than market)
6. Positive free cash flow (financial health)
```

**Bond/Fixed Income Criteria:**
```
- Credit rating ≥ BBB (investment grade)
- Yield > Current inflation rate + 1%
- Maturity < 10 years (interest rate risk management)
- Issuer diversification (max 20% from single issuer)
```

**ETF Criteria:**
```
- Expense ratio < 0.3%
- Assets under management > $500 million
- 3-year return volatility < 15%
- Distribution yield > 2%
```

#### 3.2.2 Opportunity Scoring Algorithm

**Scoring Formula (0-100 points):**
```python
base_score = 0

# Financial Health (30 points)
if debt_to_equity < 0.5: base_score += 15
elif debt_to_equity < 1.0: base_score += 10
else: base_score += 5

if current_ratio > 1.5: base_score += 10
elif current_ratio > 1.0: base_score += 5

if free_cash_flow > 0: base_score += 5

# Valuation (25 points)
if pe_ratio < 15: base_score += 15
elif pe_ratio < 20: base_score += 10
else: base_score += 5

if price_to_book < 3: base_score += 10

# Income Generation (25 points)
if dividend_yield > 4: base_score += 15
elif dividend_yield > 2.5: base_score += 10

if dividend_growth_5yr > 5%: base_score += 10

# Stability (20 points)
if beta < 0.8: base_score += 10
elif beta < 1.0: base_score += 5

if volatility_30day < 15%: base_score += 10

# Bonus triggers (+5 points each, max 15)
if recent_upgrade: base_score += 5
if insider_buying: base_score += 5
if earnings_beat: base_score += 5

final_score = min(base_score, 100)
```

**Risk Rating:**
- 85-100: Excellent low-risk opportunity
- 70-84: Good opportunity
- 60-69: Moderate opportunity
- <60: Filtered out (don't include)

#### 3.2.3 Contextual Analysis
Each opportunity includes:
- **Market sentiment**: Compare to sector performance
- **Recent news**: Flag any material events (earnings, dividends, management changes)
- **Historical patterns**: 52-week high/low context
- **Peer comparison**: How does it rank vs similar securities?

---

### 3.3 Digest Generation Module

#### 3.3.1 Email Template Structure

**Subject Line Format:**
```
📊 Your Daily Investment Digest - [Date] - [X] Opportunities Found
```

**Email Body Sections:**

1. **Market Overview** (50-75 words)
   - S&P 500, Dow, NASDAQ performance (previous day)
   - Treasury yield summary
   - Key economic indicator if relevant
   - Sentiment indicator (bullish/neutral/bearish)

2. **Top Opportunities** (Top 5, ranked by score)
   ```
   For each opportunity:
   
   [TICKER SYMBOL] - [Company Name]
   Risk Score: [Score]/100 | Category: [Stock/Bond/ETF]
   
   Quick Stats:
   • Current Price: $XX.XX (▲/▼ X.XX%)
   • Dividend Yield: X.XX%
   • P/E Ratio: XX.X
   • Market Cap: $X.XXB
   
   Why it matters:
   [2-3 sentence explanation of why it passed criteria]
   
   Considerations:
   [1-2 sentence risk note or context]
   
   [View Full Analysis] [Add to Watchlist]
   ```

3. **Fixed Income Update** (If applicable)
   - Best savings account rates
   - Notable bond yields
   - CD rate highlights

4. **Portfolio Context** (Optional, requires user portfolio input)
   - How opportunities fit existing holdings
   - Diversification suggestions
   - Rebalancing alerts

5. **Educational Snippet** (Rotates daily)
   - Investment term definition
   - Strategy explanation
   - Market mechanic insight

6. **Footer**
   - Disclaimer: "This is informational content, not financial advice"
   - Unsubscribe link
   - Settings link (digest preferences)
   - Date/time generated

#### 3.3.2 Alternative Delivery Formats

**SMS Summary** (Optional premium feature):
```
Daily Digest: 5 opportunities found
Top pick: $SCHD - Score 89
Avg yield: 3.4%
View full: [link]
```

**Web Dashboard**:
- Archive of past 90 days of digests
- Interactive charts
- Watchlist management
- Performance tracking

---

### 3.4 Notification & Delivery System

#### 3.4.1 Email Delivery Specifications
- **Service**: SendGrid or AWS SES
- **Delivery time**: 6:00 AM user's local timezone
- **Retry logic**: 3 attempts with exponential backoff
- **Bounce handling**: Remove invalid emails after 3 bounces
- **Formatting**: Responsive HTML with plain text fallback

#### 3.4.2 Backup Delivery Channels
- **Web push notifications**: Optional browser notification
- **Webhook**: POST digest to user-specified endpoint
- **API endpoint**: RESTful API to fetch latest digest programmatically

---

## 4. Technical Architecture

### 4.1 Technology Stack (100% AWS Serverless)

#### 4.1.1 Backend (Serverless)
- **Compute**: AWS Lambda (Node.js 20 or Python 3.12)
  - Individual functions for each API endpoint
  - Separate functions for data collection, analysis, digest generation
- **API Layer**: Amazon API Gateway (REST API)
  - Request validation
  - Rate limiting (burst: 100, rate: 50 req/sec)
  - API keys for internal services
- **Orchestration**: AWS Step Functions
  - Coordinate daily scan workflow
  - Handle retries with exponential backoff
  - Error handling and alerting
- **Task Queue**: Amazon SQS (Standard Queue)
  - Decouple email sending from digest generation
  - Dead letter queue for failed messages
- **Scheduler**: Amazon EventBridge (CloudWatch Events)
  - Daily scan trigger: 5:00 AM EAT (Kenya timezone)
  - Weekly deep scan: Sundays 8:00 PM
  - Monthly rebalancing: 1st of month
- **Web Scraping**: Lambda with Puppeteer Core + Chrome AWS Lambda Layer
  - Lightweight headless Chrome for serverless

#### 4.1.2 Database (Serverless)
- **Primary DB**: Amazon Aurora Serverless v2 (PostgreSQL 15)
  - Auto-scaling ACU (0.5 - 16 ACUs)
  - Pause after 5 minutes of inactivity (MVP cost savings)
  - Data API for direct Lambda access (no connection pooling needed)
  - Multi-AZ for production
- **Alternative**: Amazon DynamoDB (NoSQL)
  - On-demand pricing (pay per request)
  - Global tables for multi-region (if scaling globally)
  - Use for high-velocity data (watchlists, user preferences)
- **Cache Layer**: Amazon ElastiCache Serverless (Redis)
  - Auto-scaling based on load
  - Cache API responses (5-minute TTL)
  - Rate limit tracking
  - Session management

#### 4.1.3 Frontend (Serverless)
- **Hosting**: AWS Amplify Hosting
  - Next.js 14+ with App Router (SSR/SSG)
  - Automatic deployments from Git
  - Global CDN via CloudFront
  - Custom domain with Route 53
- **UI Library**: Shadcn/ui + Tailwind CSS
- **Charts**: Recharts (lightweight)
- **Authentication**: Amazon Cognito
  - User pools for signup/login
  - Social login (Google, Apple)
  - MFA support
  - Passwordless email/SMS login

#### 4.1.4 Infrastructure (Fully Managed AWS)
- **Email Delivery**: Amazon SES
  - $0.10 per 1000 emails (cheapest option)
  - Bounce/complaint handling via SNS
  - Email templates stored in S3
  - Configuration sets for tracking
- **SMS**: Amazon SNS (for future SMS digests)
  - Pay-per-message pricing
  - Multi-region support
- **Storage**: Amazon S3
  - Email templates (HTML/JSON)
  - Digest archives (90-day retention)
  - User uploads (future: CSV imports)
  - S3 Intelligent-Tiering for cost optimization
- **Secrets Management**: AWS Secrets Manager
  - API keys (Alpha Vantage, Yahoo Finance)
  - Database credentials
  - JWT signing keys
  - Automatic rotation support
- **Monitoring**: Amazon CloudWatch
  - Logs (Lambda, API Gateway, Step Functions)
  - Metrics (custom business metrics)
  - Alarms (email delivery failures, API errors)
  - Dashboards (system health, KPIs)
- **Tracing**: AWS X-Ray
  - End-to-end request tracing
  - Performance bottleneck identification
  - Service map visualization
- **CDN**: Amazon CloudFront
  - Global edge locations (low latency for Kenya)
  - HTTPS enforcement
  - Cache static assets
- **DNS**: Amazon Route 53
  - Domain registration
  - Health checks
  - Geolocation routing (future: route Kenya users to optimized content)
- **CI/CD**: AWS CodePipeline + CodeBuild
  - Automated testing
  - Deploy to staging/production
  - Integration with GitHub
- **Infrastructure as Code**: AWS CDK (TypeScript)
  - Version-controlled infrastructure
  - Reproducible deployments
  - Multi-environment support (dev, staging, prod)

### 4.2 System Architecture Diagram (AWS Serverless)

```
┌──────────────────────────────────────────────────────────────────┐
│               Amazon EventBridge (Scheduler)                      │
│  Rules: Daily 5:00 AM EAT | Weekly Sun 8PM | Monthly 1st        │
└─────────────────────────┬────────────────────────────────────────┘
                          │
                          ↓
┌──────────────────────────────────────────────────────────────────┐
│              AWS Step Functions (Orchestrator)                    │
│  ┌────────────────────────────────────────────────────────┐     │
│  │ 1. Trigger Data Collection → 2. Analysis →             │     │
│  │ 3. Digest Generation → 4. Queue Emails → 5. Send       │     │
│  │ - Parallel execution for multiple tickers               │     │
│  │ - Error handling with retries (3 attempts)              │     │
│  │ - Dead letter queue for failures                        │     │
│  └────────────────────────────────────────────────────────┘     │
└─────────────────────────┬────────────────────────────────────────┘
                          │
          ┌───────────────┴───────────────┬────────────────────┐
          ↓                               ↓                    ↓
┌──────────────────────┐    ┌──────────────────────┐   ┌────────────────┐
│ Lambda: Fetch Stocks │    │ Lambda: Fetch Bonds  │   │ Lambda: Scrape │
│ - Alpha Vantage      │    │ - FRED API           │   │ - NSE/CBK      │
│ - Yahoo Finance      │    │ - Kenya T-Bills      │   │ - Dividend.com │
│ - NSE (Safaricom,    │    │                      │   │ - Puppeteer    │
│   KCB, Equity Bank)  │    │                      │   │   Chrome Layer │
└──────────┬───────────┘    └──────────┬───────────┘   └────────┬───────┘
           │                           │                        │
           └───────────────┬───────────┴────────────────────────┘
                           │
                           ↓
           ┌───────────────────────────────────────────────────┐
           │  AWS Secrets Manager (API Keys & Credentials)     │
           └───────────────────────────────────────────────────┘
                           │
                           ↓
┌──────────────────────────────────────────────────────────────────┐
│          ElastiCache Serverless (Redis Cache)                     │
│  - 5-min TTL for API responses  - Rate limit counters            │
│  - Reduce duplicate API calls   - Session tokens                 │
└─────────────────────────┬────────────────────────────────────────┘
                          │
                          ↓
┌──────────────────────────────────────────────────────────────────┐
│              Lambda: Analysis Engine                              │
│  ┌────────────────────────────────────────────────────────┐     │
│  │ 1. Apply screening criteria (PE < 20, yield > 2.5%)     │     │
│  │ 2. Calculate risk scores (0-100)                        │     │
│  │ 3. Kenya-specific: T-Bill vs inflation comparison       │     │
│  │ 4. Rank opportunities by score                          │     │
│  │ 5. Store results in Aurora                              │     │
│  └────────────────────────────────────────────────────────┘     │
└─────────────────────────┬────────────────────────────────────────┘
                          │
                          ↓
┌──────────────────────────────────────────────────────────────────┐
│         Aurora Serverless v2 (PostgreSQL 15)                      │
│  Tables: users, watchlists, opportunities, digests, api_logs     │
│  - Auto-pause after 5 min (cost savings)                         │
│  - Data API (no connection pooling needed)                       │
│  - Backup to S3 (90-day retention)                               │
└─────────────────────────┬────────────────────────────────────────┘
                          │
                          ↓
┌──────────────────────────────────────────────────────────────────┐
│              Lambda: Digest Generator                             │
│  - Load user preferences from Aurora                             │
│  - Fetch email templates from S3                                 │
│  - Personalize content (Kenya users get NSE opportunities)       │
│  - Generate HTML + plain text versions                           │
│  - Multi-currency support (USD, KES)                             │
└─────────────────────────┬────────────────────────────────────────┘
                          │
                          ↓
┌──────────────────────────────────────────────────────────────────┐
│                  Amazon SQS (Email Queue)                         │
│  - Batch emails for delivery                                     │
│  - Dead letter queue for failures                                │
│  - Visibility timeout: 30 seconds                                │
└─────────────────────────┬────────────────────────────────────────┘
                          │
                          ↓
┌──────────────────────────────────────────────────────────────────┐
│              Lambda: Email Sender                                 │
│  - Poll SQS queue                                                │
│  - Send via Amazon SES                                           │
│  - Track bounces/complaints via SNS                              │
│  - Log delivery status to Aurora                                 │
└─────────────────────────┬────────────────────────────────────────┘
                          │
                          ↓
┌──────────────────────────────────────────────────────────────────┐
│                   Amazon SES (Email Delivery)                     │
│  - $0.10 per 1000 emails                                         │
│  - Configuration sets for open/click tracking                    │
│  - Bounce/complaint handling                                     │
│  - Reputation monitoring                                         │
└──────────────────────────────────────────────────────────────────┘

                          │
                          ↓
┌──────────────────────────────────────────────────────────────────┐
│          User-Facing Components (Web & API)                       │
│                                                                   │
│  ┌──────────────────────────┐    ┌────────────────────────────┐ │
│  │ AWS Amplify Hosting      │    │ API Gateway + Lambda       │ │
│  │ - Next.js Dashboard      │◄───┤ - REST API endpoints      │ │
│  │ - CloudFront CDN         │    │ - Cognito auth             │ │
│  │ - Route 53 DNS           │    │ - Rate limiting            │ │
│  │ - Mobile-responsive      │    │ - CORS enabled             │ │
│  │ - Kenya-optimized edge   │    │ - API keys                 │ │
│  └──────────────────────────┘    └────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────┘

                          │
                          ↓
┌──────────────────────────────────────────────────────────────────┐
│              Monitoring & Observability                           │
│  ┌──────────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │ CloudWatch       │  │ X-Ray        │  │ CloudWatch       │  │
│  │ - Logs           │  │ - Tracing    │  │ Alarms           │  │
│  │ - Metrics        │  │ - Service map│  │ - SNS alerts     │  │
│  │ - Dashboards     │  │              │  │ - PagerDuty      │  │
│  └──────────────────┘  └──────────────┘  └──────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```

**Architecture Benefits:**
- **100% Serverless**: No servers to manage, automatic scaling
- **Cost-Optimized**: Pay only for actual usage (Aurora pauses when idle)
- **Global Reach**: CloudFront edge locations minimize latency for Kenya
- **Resilient**: Automatic retries, dead letter queues, multi-AZ
- **Secure**: Secrets Manager, Cognito, IAM roles with least privilege
- **Observable**: CloudWatch metrics, X-Ray tracing, custom alarms

### 4.3 Database Schema

```sql
-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255),
    timezone VARCHAR(50) DEFAULT 'UTC',
    digest_time TIME DEFAULT '06:00:00',
    is_active BOOLEAN DEFAULT true,
    country_code VARCHAR(3) DEFAULT 'US', -- 'US', 'KE', 'NG', 'ZA', 'EG'
    preferred_currency VARCHAR(3) DEFAULT 'USD', -- 'USD', 'KES', 'NGN', 'ZAR', 'EGP'
    market_preference VARCHAR(20) DEFAULT 'global', -- 'global', 'local', 'both'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Watchlists table
CREATE TABLE watchlists (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    ticker VARCHAR(20) NOT NULL,
    asset_type VARCHAR(20), -- 'stock', 'etf', 'bond'
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, ticker)
);

-- Opportunities table (daily scan results)
CREATE TABLE opportunities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    scan_date DATE NOT NULL,
    ticker VARCHAR(20) NOT NULL,
    company_name VARCHAR(255),
    asset_type VARCHAR(20),
    market VARCHAR(10) DEFAULT 'US', -- 'US', 'NSE', 'JSE', 'NGX', 'EGX'
    current_price DECIMAL(10,2),
    currency VARCHAR(3) DEFAULT 'USD', -- 'USD', 'KES', 'NGN', 'ZAR', 'EGP'
    price_in_usd DECIMAL(10,2), -- Normalized for comparison
    risk_score INTEGER,
    criteria_met JSONB, -- Stores which criteria passed
    fundamental_data JSONB, -- PE, yield, beta, etc.
    analysis_summary TEXT,
    local_context TEXT, -- Kenya-specific insights (e.g., "Safaricom dividend growth")
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_scan_date (scan_date),
    INDEX idx_ticker (ticker),
    INDEX idx_risk_score (risk_score),
    INDEX idx_market (market)
);

-- Digests table (sent emails log)
CREATE TABLE digests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    opportunities_count INTEGER,
    email_status VARCHAR(20), -- 'sent', 'failed', 'bounced'
    email_opened BOOLEAN DEFAULT false,
    email_clicked BOOLEAN DEFAULT false,
    digest_content JSONB, -- Full digest data
    INDEX idx_user_sent (user_id, sent_at)
);

-- API logs (for monitoring)
CREATE TABLE api_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    api_name VARCHAR(100),
    endpoint VARCHAR(255),
    response_time_ms INTEGER,
    status_code INTEGER,
    error_message TEXT,
    called_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_api_called (api_name, called_at)
);

-- User preferences
CREATE TABLE user_preferences (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    min_dividend_yield DECIMAL(5,2) DEFAULT 2.5,
    max_pe_ratio DECIMAL(8,2) DEFAULT 20.0,
    preferred_sectors TEXT[], -- Array of sector names
    exclude_tickers TEXT[], -- Tickers to never include
    include_crypto BOOLEAN DEFAULT false,
    risk_tolerance VARCHAR(20) DEFAULT 'low', -- 'low', 'medium'
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 4.4 API Endpoints

#### 4.4.1 Public API (for users)

```
POST /api/auth/register
- Register new user
- Body: { email, password, full_name, timezone }

POST /api/auth/login
- Authenticate user
- Body: { email, password }
- Returns: JWT token

GET /api/digests/latest
- Get most recent digest
- Auth: Required
- Returns: Latest digest with opportunities

GET /api/digests/history?page=1&limit=30
- Get past digests
- Auth: Required
- Query params: page, limit, start_date, end_date

GET /api/watchlist
- Get user's watchlist
- Auth: Required

POST /api/watchlist
- Add ticker to watchlist
- Auth: Required
- Body: { ticker, asset_type }

DELETE /api/watchlist/:ticker
- Remove ticker from watchlist
- Auth: Required

GET /api/opportunities?date=2024-01-15
- Get all opportunities from specific date
- Auth: Required
- Query params: date, min_score, asset_type

PUT /api/preferences
- Update user preferences
- Auth: Required
- Body: { min_dividend_yield, max_pe_ratio, ... }

GET /api/preferences
- Get user preferences
- Auth: Required
```

#### 4.4.2 Internal API (for scheduled jobs)

```
POST /internal/scan/execute
- Trigger market scan
- Auth: Service token
- Returns: Scan job ID

GET /internal/scan/status/:jobId
- Check scan progress
- Auth: Service token

POST /internal/digest/generate/:userId
- Generate digest for specific user
- Auth: Service token

POST /internal/digest/send-all
- Send digests to all active users
- Auth: Service token
```

---

## 5. Data Flow & Process

### 5.1 Daily Scan Workflow

```
1. Scheduler triggers at 5:00 AM
   ↓
2. Load all active watchlists from database
   ↓
3. For each ticker in watchlist:
   a. Check Redis cache for recent data
   b. If cache miss, call API (with rate limiting)
   c. Store response in cache
   d. Parse financial metrics
   ↓
4. Apply screening criteria to each ticker
   ↓
5. Calculate risk scores for qualified opportunities
   ↓
6. Store opportunities in database
   ↓
7. For each active user:
   a. Load user preferences
   b. Filter opportunities based on preferences
   c. Rank opportunities by score
   d. Generate personalized digest
   e. Queue email for delivery
   ↓
8. Deliver emails via SendGrid/SES
   ↓
9. Log delivery status
   ↓
10. Send monitoring alert if errors > 5%
```

### 5.2 Rate Limiting Strategy

**API Rate Limits:**
- Alpha Vantage: 500 calls/day = ~0.35 calls/minute
- Yahoo Finance: ~2000 calls/hour = ~33 calls/minute
- FRED: 120 calls/minute

**Implementation:**
```javascript
// Redis-based rate limiter
const canMakeRequest = async (apiName) => {
  const key = `rate_limit:${apiName}`;
  const current = await redis.incr(key);
  
  if (current === 1) {
    await redis.expire(key, 60); // 1 minute window
  }
  
  const limit = API_LIMITS[apiName];
  return current <= limit;
};

// Exponential backoff for retries
const fetchWithRetry = async (url, maxRetries = 3) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url);
      if (response.ok) return response;
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await sleep(Math.pow(2, i) * 1000); // 1s, 2s, 4s
    }
  }
};
```

---

## 6. Non-Functional Requirements

### 6.1 Performance
- Digest generation: < 5 minutes for 100 tickers
- Email delivery: < 30 seconds per user
- API response time: < 500ms (95th percentile)
- Database queries: < 100ms average

### 6.2 Scalability
- Support up to 10,000 users in Phase 1
- Handle 100,000 API calls per day
- Store 90 days of historical data (auto-archive older)

### 6.3 Reliability
- System uptime: 99.5% (43.8 hours downtime/year max)
- Email delivery success: 95%+
- Graceful degradation if API unavailable
- Automatic retry for failed scans

### 6.4 Security
- HTTPS/TLS for all communications
- API keys stored in environment variables
- User passwords hashed with bcrypt (cost factor 12)
- JWT tokens for authentication (24-hour expiry)
- Rate limiting on public endpoints (100 req/min per IP)
- SQL injection prevention (parameterized queries)
- XSS protection on frontend

### 6.5 Compliance
- Email footer with unsubscribe link (CAN-SPAM Act)
- Privacy policy explaining data usage
- Disclaimer: "Not financial advice"
- GDPR-compliant data handling (if EU users)
- Allow users to export/delete their data

---

## 7. User Interface Requirements

### 7.1 Web Dashboard Pages

#### 7.1.1 Dashboard Home
- **Header**: Logo, user menu, timezone display
- **Hero Section**: 
  - Today's market summary (S&P, Dow, NASDAQ)
  - Latest digest delivery status
  - Quick stats (opportunities found, watchlist size)
- **Opportunities Grid**: 
  - Cards showing today's top 5 opportunities
  - Each card: ticker, score, key metrics, "Add to watchlist" button
- **Recent Activity**: Last 7 days of digest summaries

#### 7.1.2 Watchlist Manager
- **Search bar**: Add tickers by symbol or company name
- **Category tabs**: Stocks | ETFs | Bonds | Cash
- **Table columns**: 
  - Ticker | Name | Asset Type | Date Added | Last Score | Actions
- **Bulk actions**: Export CSV, Remove selected
- **Recommendations**: "Based on your preferences, consider..."

#### 7.1.3 Digest Archive
- **Date picker**: Select date range
- **Digest list**: Expandable cards for each day
  - Header: Date, opportunities count, delivery status
  - Body: Full digest content (HTML view)
- **Search**: Filter by ticker or keyword
- **Export**: Download as PDF

#### 7.1.4 Settings
- **Profile**: Email, name, timezone
- **Digest Preferences**:
  - Delivery time slider
  - Enable/disable email
  - Frequency: Daily | Weekdays only
- **Screening Criteria**: 
  - Sliders for min yield, max PE, etc.
  - Sector preferences (checkboxes)
  - Exclude list (ticker input)
- **Notifications**: 
  - Email preferences
  - SMS opt-in (future)
  - Webhook URL (advanced)

### 7.2 Email Design Mockup

**Desktop View:**
```
┌─────────────────────────────────────────────────────┐
│  📊 Your Daily Investment Digest - Jan 15, 2025     │
├─────────────────────────────────────────────────────┤
│                                                      │
│  Market Overview                                     │
│  S&P 500: 4,783 (+0.4%) | 10Y Treasury: 4.12%      │
│  Sentiment: Cautiously Optimistic                   │
│                                                      │
├─────────────────────────────────────────────────────┤
│                                                      │
│  🎯 Top Opportunities (5 found)                     │
│                                                      │
│  ┌───────────────────────────────────────────────┐ │
│  │ SCHD - Schwab US Dividend Equity ETF          │ │
│  │ Risk Score: 89/100 | Category: ETF            │ │
│  │                                                │ │
│  │ Quick Stats:                                   │ │
│  │ • Price: $78.45 (▲ 0.8%)                      │ │
│  │ • Yield: 3.4% • P/E: 18.2 • Cap: $51.2B      │ │
│  │                                                │ │
│  │ Why it matters: High-quality dividend ETF with│ │
│  │ low expense ratio and consistent growth...    │ │
│  │                                                │ │
│  │ [View Analysis] [Add to Watchlist]            │ │
│  └───────────────────────────────────────────────┘ │
│                                                      │
│  [4 more opportunity cards...]                      │
│                                                      │
├─────────────────────────────────────────────────────┤
│                                                      │
│  💡 Today's Insight: Understanding Dividend Yield   │
│  Dividend yield is calculated by...                 │
│                                                      │
├─────────────────────────────────────────────────────┤
│                                                      │
│  Disclaimer: Informational only, not advice         │
│  Unsubscribe | Settings | View on Web              │
│  Generated at 6:00 AM EAT on Jan 15, 2025          │
│                                                      │
└─────────────────────────────────────────────────────┘
```

---

## 8. Development Phases

### Phase 1: MVP (4-6 weeks)
**Week 1-2: Core Infrastructure**
- Set up project structure (monorepo or separate repos)
- Configure database (PostgreSQL + Redis)
- Set up hosting (Railway/Render for backend, Vercel for frontend)
- Implement authentication system
- Create basic API endpoints

**Week 3-4: Data Collection & Analysis**
- Integrate Alpha Vantage and Yahoo Finance APIs
- Build scraper for dividend data
- Implement caching layer
- Create screening criteria logic
- Build scoring algorithm
- Write unit tests for analysis engine

**Week 5-6: Digest & Delivery**
- Design email template
- Integrate SendGrid/SES
- Build scheduler for daily runs
- Create digest generator
- Implement user preferences
- End-to-end testing

**MVP Features:**
- Single user (yourself)
- 50 ticker watchlist
- Email digest at fixed time
- Basic web dashboard (view digests)
- Manual trigger option

### Phase 2: Multi-User (2-3 weeks)
- User registration and authentication
- Multi-tenant database support
- Per-user watchlists
- Per-user preferences
- Email delivery queue
- User dashboard improvements

### Phase 3: Enhanced Analysis (3-4 weeks)
- Add FRED API for bonds
- Implement web scraping for savings rates
- Add news sentiment analysis
- Historical backtesting of signals
- Performance tracking
- Peer comparison features

### Phase 4: Premium Features (4-6 weeks)
- Portfolio integration
- Advanced filtering
- SMS notifications
- Webhook support
- Mobile app (React Native)
- API access for users

---

## 9. Testing Requirements

### 9.1 Unit Tests
- Analysis engine functions (criteria checks, scoring)
- Data parsing functions
- Email template generation
- Rate limiter logic
- Target coverage: 80%+

### 9.2 Integration Tests
- API endpoint responses
- Database CRUD operations
- Email delivery flow
- Scheduler execution
- Authentication flow

### 9.3 End-to-End Tests
- Complete digest generation workflow
- User registration → digest delivery
- Watchlist management flow
- Settings update flow

### 9.4 Performance Tests
- Load test: 1000 concurrent digest generations
- API stress test: 100 req/sec
- Database query optimization
- Email delivery at scale

### 9.5 Security Tests
- SQL injection attempts
- XSS vulnerability scanning
- Authentication bypass attempts
- Rate limit effectiveness

---

## 10. Monitoring & Observability

### 10.1 Application Metrics
- Digest generation time (P50, P95, P99)
- API response times by endpoint
- Email delivery success rate
- Database query performance
- Cache hit rate

### 10.2 Business Metrics
- Daily active users
- Digest open rates
- Opportunities identified per day
- User retention (7-day, 30-day)
- Average risk score of delivered opportunities

### 10.3 Alerts
- Email delivery failure rate > 10%
- API rate limit exceeded
- Database connection failures
- Scheduler job failures
- Error rate > 5% (5xx responses)
- Disk space > 80%

### 10.4 Logging
- All API calls (request/response, timing)
- Digest generation events
- Email delivery status
- Error stack traces
- User actions (login, settings changes)

### 10.5 Dashboards
- Grafana dashboard with:
  - Real-time system health
  - API usage graphs
  - Email delivery metrics
  - User growth charts
  - Error rate trends

---

## 11. Risks & Mitigation

### 11.1 Technical Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| API rate limits exceeded | High | Medium | Implement aggressive caching, stagger requests, use multiple API keys |
| Email deliverability issues | High | Low | Use reputable ESP (SendGrid), warm up IP, maintain sender reputation |
| Web scraping breaks | Medium | High | Graceful degradation, use multiple sources, notify if critical data missing |
| Database performance degradation | High | Low | Optimize queries, add indexes, implement connection pooling |
| Scheduler failures | High | Low | Implement health checks, redundant cron jobs, alerting |

### 11.2 Business Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Low signal accuracy | High | Medium | Backtest strategies, adjust criteria based on results |
| User churn due to irrelevant opportunities | Medium | Medium | Personalization, user feedback loop, A/B test criteria |
| Legal issues (unlicensed advice) | Very High | Low | Strong disclaimers, legal review, avoid prescriptive language |
| Competition from established platforms | Medium | High | Focus on simplicity, low-risk niche, superior UX |

### 11.3 Operational Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Cost overrun (API fees) | Medium | Medium | Monitor usage, implement cost alerts, optimize calls |
| Vendor lock-in | Low | Medium | Use abstraction layers, design for portability |
| Data loss | High | Low | Daily backups, point-in-time recovery, test restores |

---

## 12. Cost Estimation (Monthly) - AWS Serverless

### 12.1 MVP Infrastructure Costs (Single User - You)

**Compute:**
- AWS Lambda (100K invocations/month): **$0.20**
  - Free tier: First 1M requests/month free
  - 128 MB memory for most functions
  - Average 500ms execution time
- Step Functions (1K state transitions): **$0.025**
  - 4K free transitions/month

**Database:**
- Aurora Serverless v2 (PostgreSQL):
  - Minimum ACU: 0.5 (auto-pause enabled)
  - Active ~1 hour/day for scans: **$2.50**
  - Storage (1 GB): **$0.10**
  - Backup storage: **$0**
- ElastiCache Serverless (Redis):
  - cache.serverless.small: **$0** (free tier eligible)
  - Or use DAX for caching: **$12/month**

**Storage & Data Transfer:**
- S3 (email templates, archives): **$0.50**
  - 1 GB storage + requests
- Data Transfer Out: **$0.50**
  - Minimal for single user

**Email Delivery:**
- Amazon SES: **$0.03** (30 emails/month)
  - $0.10 per 1,000 emails
  - First 62K emails/month free if sending from EC2 (not Lambda)

**Orchestration:**
- EventBridge: **$1.00**
  - 1 rule × 30 daily triggers
- SQS: **$0** (free tier - 1M requests/month)

**Monitoring:**
- CloudWatch Logs: **$0.50** (500 MB ingested)
- CloudWatch Metrics: **$0** (first 10 custom metrics free)
- CloudWatch Alarms: **$0.20** (2 alarms)
- X-Ray: **$0** (free tier - 100K traces/month)

**Security:**
- Secrets Manager: **$0.40** (1 secret)
- Cognito: **$0** (free tier - <50K MAUs)

**Frontend:**
- Amplify Hosting: **$0** (free tier - 1 app)
  - 15 GB served/month
  - Build minutes: 1000 free/month
- Route 53: **$0.50** (1 hosted zone)

**Total MVP Cost (Single User): ~$6-8/month**
- With Aurora pausing most of the day
- Free tiers cover most Lambda/API Gateway usage
- Minimal data transfer

### 12.2 Scaling Costs (100 Users)

**Compute:**
- Lambda (2M invocations): **$3.20**
- Step Functions (30K transitions): **$0.75**

**Database:**
- Aurora Serverless v2:
  - Active ~3 hours/day: **$7.50**
  - Storage (5 GB): **$0.50**
  - Backup storage: **$0.25**
- ElastiCache Serverless: **$15** (cache.serverless.medium)

**Email:**
- SES (3,000 emails/month): **$0.30**

**Storage & Data Transfer:**
- S3: **$2**
- Data Transfer: **$3**

**Other Services:** (same as MVP)
- EventBridge: **$1**
- CloudWatch: **$2**
- Secrets Manager: **$0.40**

**Total for 100 Users: ~$35-40/month**

### 12.3 Scaling Costs (1,000 Users - Production)

**Compute:**
- Lambda (15M invocations): **$25**
  - More complex workflows
  - Web scraping functions (higher memory)
- Step Functions (300K transitions): **$7.50**

**Database:**
- Aurora Serverless v2:
  - Active 24/7 (disable auto-pause): **$60**
  - 2 ACUs minimum for production
  - Storage (50 GB): **$5**
  - Backup storage (100 GB): **$2.50**
- ElastiCache Serverless: **$50** (cache.serverless.large)

**Email:**
- SES (30,000 emails/month): **$3**
- SNS (for bounce notifications): **$0.50**

**Storage & Data Transfer:**
- S3: **$10** (50 GB + requests)
- CloudFront (CDN): **$5** (500 GB transfer)
- Data Transfer: **$15**

**API Gateway:**
- REST API (10M requests): **$35**
- WebSocket API (for future real-time): **$0** (not implemented yet)

**Monitoring & Security:**
- CloudWatch Logs (100 GB): **$50**
- CloudWatch Metrics (50 custom): **$15**
- CloudWatch Alarms (20): **$2**
- X-Ray (5M traces): **$25**
- Secrets Manager: **$0.40**

**Frontend:**
- Amplify Hosting: **$15** (100 GB served, 100 build minutes)
- Route 53: **$0.50**

**Total for 1,000 Users: ~$325-350/month**

### 12.4 Cost Optimization Strategies

1. **Aurora Auto-Pause**: Save 60-80% on database costs during idle periods
2. **Lambda Reserved Concurrency**: Not needed for MVP (on-demand is cheaper)
3. **S3 Intelligent-Tiering**: Auto-move old digests to cheaper storage ($0.0125/GB vs $0.023/GB)
4. **CloudWatch Logs Retention**: 7 days for debug logs, 90 days for audit logs
5. **Spot Instances for Scraping**: Not applicable (using Lambda)
6. **Multi-Region Deployment**: Not needed initially (single region: us-east-1 or af-south-1 for Kenya proximity)

### 12.5 Kenya-Specific Considerations

**Africa (Cape Town) Region (af-south-1):**
- Lambda pricing: ~10% higher than us-east-1
- Data transfer: Lower latency for Kenya users
- SES: Not available in af-south-1 (use us-east-1 or eu-west-1)

**Recommended Setup:**
- **Primary Region**: us-east-1 (cheapest, most services)
- **CloudFront Edge Locations**: Automatically serve Kenya users from Johannesburg edge
- **Future**: Multi-region deployment when user base grows in Africa

**Mobile Data Costs (Kenya):**
- Optimize email size: <100 KB per digest (mobile-friendly)
- Use image compression for charts
- Provide SMS-only option (cheaper than data for some users)

---

## 13. Future Enhancements (Post-MVP)

### 13.1 AI/ML Features
- Predictive modeling for stock price movements
- Natural language processing for news sentiment
- Personalized recommendation engine
- Automated portfolio rebalancing suggestions

### 13.2 Social Features
- Share watchlists with friends
- Community-voted opportunities
- Expert commentary/analysis
- Discussion forums per ticker

### 13.3 Advanced Analytics
- Backtesting historical signals
- Performance attribution
- Risk-adjusted returns calculation
- Monte Carlo simulations

### 13.4 Integrations
- Brokerage account connection (Plaid)
- Automatic trade execution
- Calendar integration (earnings dates)
- Slack/Discord bot

### 13.5 Mobile App
- React Native app (iOS + Android)
- Push notifications
- Biometric authentication
- Offline mode for digest viewing

---

## 14. Success Criteria

### 14.1 Launch Success (First 30 Days)
- ✅ Email delivery success rate > 95%
- ✅ Zero critical bugs in production
- ✅ Average digest generation time < 5 minutes
- ✅ Personal use validated (you find 3+ opportunities you act on)

### 14.2 Product-Market Fit (90 Days)
- ✅ 100 active users
- ✅ Email open rate > 40%
- ✅ 30-day retention > 60%
- ✅ Positive user feedback (NPS > 50)
- ✅ Signal accuracy > 60% (tracked opportunities are profitable)

### 14.3 Growth Stage (6 Months)
- ✅ 1,000 active users
- ✅ MRR > $500 (if monetized)
- ✅ 7-day retention > 70%
- ✅ Referral rate > 15%

---

## 15. Legal & Compliance

### 15.1 Disclaimers (Required)
**Email Footer:**
```
DISCLAIMER: This digest provides informational content only and does not 
constitute financial, investment, or legal advice. The information is 
provided "as-is" without warranty. Past performance does not guarantee 
future results. You should consult with qualified professionals before 
making any investment decisions. [Your Company] is not a registered 
investment advisor.
```

**Website Terms:**
- No fiduciary relationship
- No guarantees of accuracy
- User assumes all investment risk
- Data sourced from third parties
- Right to terminate service anytime

### 15.2 Privacy Policy Requirements
- Data collection practices
- How data is used (digest generation)
- Third-party sharing (email provider)
- User rights (access, deletion, export)
- Cookie usage
- International transfers (if applicable)

### 15.3 Regulatory Considerations
- **SEC**: Avoid making specific buy/sell recommendations
- **FINRA**: Do not provide personalized investment advice
- **FTC**: Honest advertising if you promote the service
- **GDPR**: Comply if you have EU users
- **CAN-SPAM**: Unsubscribe mechanism, physical address

### 15.4 Liability Mitigation
- Strong disclaimers throughout application
- Terms of Service agreement at signup
- Educational framing (not prescriptive)
- Avoid language like "you should buy" or "guaranteed returns"
- Consider E&O insurance if scaling commercially

---

## 16. Launch Checklist

### 16.1 Pre-Launch (Technical)
- [ ] All unit tests passing
- [ ] Integration tests passing
- [ ] Load testing completed
- [ ] Security audit completed
- [ ] Error tracking configured (Sentry)
- [ ] Monitoring dashboards set up
- [ ] Backup/restore tested
- [ ] SSL certificates installed
- [ ] Environment variables secured
- [ ] Database migrations tested

### 16.2 Pre-Launch (Content)
- [ ] Legal disclaimers reviewed by attorney
- [ ] Privacy policy published
- [ ] Terms of Service published
- [ ] Email templates finalized
- [ ] Educational snippets written (30 days)
- [ ] Help documentation created
- [ ] FAQ page completed

### 16.3 Launch Day
- [ ] Deploy to production
- [ ] Verify cron jobs running
- [ ] Send test digest to personal email
- [ ] Monitor error logs
- [ ] Check email deliverability
- [ ] Announce to beta users (if applicable)
- [ ] Social media announcement
- [ ] Monitor system metrics

### 16.4 Post-Launch (Week 1)
- [ ] Daily monitoring of all metrics
- [ ] User feedback collection
- [ ] Bug triage and fixes
- [ ] Performance optimization
- [ ] A/B test email subject lines
- [ ] Adjust screening criteria based on results

---

## 17. Documentation Requirements

### 17.1 Technical Documentation
- **README.md**: Project overview, setup instructions
- **API Documentation**: OpenAPI/Swagger spec
- **Architecture Decision Records (ADRs)**: Key technical choices
- **Deployment Guide**: Step-by-step production setup
- **Runbook**: How to handle common issues
- **Database Schema**: Entity-relationship diagrams

### 17.2 User Documentation
- **Getting Started Guide**: Account creation, first digest
- **FAQ**: Common questions answered
- **Feature Guides**: How to use each feature
- **Troubleshooting**: Common issues and fixes
- **Video Tutorials**: Screen recordings (3-5 minutes each)

### 17.3 Internal Documentation
- **Product Roadmap**: Planned features by quarter
- **Metrics Dashboard Guide**: How to interpret data
- **Incident Response Plan**: Steps for outages
- **Customer Support Guide**: How to handle user issues

---

## 18. Appendix

### 18.1 Glossary

| Term | Definition |
|------|------------|
| **Alpha Vantage** | Financial data API provider offering stock, forex, and crypto data |
| **Beta** | Measure of stock volatility relative to the market (beta < 1 = less volatile) |
| **Dividend Yield** | Annual dividend per share divided by stock price (expressed as percentage) |
| **P/E Ratio** | Price-to-earnings ratio; stock price divided by earnings per share |
| **REIT** | Real Estate Investment Trust; company that owns/operates income-producing real estate |
| **Debt-to-Equity** | Ratio comparing company's total liabilities to shareholder equity |
| **ETF** | Exchange-Traded Fund; investment fund traded on stock exchanges |
| **Free Cash Flow** | Cash generated by operations minus capital expenditures |
| **Dividend Aristocrat** | S&P 500 company that has increased dividends for 25+ consecutive years |

### 18.2 Sample Watchlist (Default 70 Tickers - Global + Kenya)

**US Dividend Stocks (20):**
JNJ, PG, KO, PEP, MCD, WMT, ABBV, CVX, XOM, T, VZ, SO, D, NEE, DUK, O, STAG, AVB, EXR, PSA

**US Dividend ETFs (10):**
SCHD, VYM, DVY, SDY, NOBL, VIG, DGRO, HDV, DIA, IWD

**US Bond ETFs (10):**
AGG, BND, TLT, IEF, SHY, VCSH, VCIT, MUB, HYG, LQD

**Low-Volatility ETFs (5):**
USMV, SPLV, LVHD, EFAV, XMLV

**Sector ETFs (5):**
XLU (Utilities), VNQ (Real Estate), XLRE (Real Estate), XLP (Consumer Staples), VDC (Consumer Staples)

**Kenya NSE Stocks (15):**
- **SCOM** (Safaricom PLC) - Telecommunications, consistent dividends
- **KCB** (KCB Group) - Banking, stable earnings
- **EQTY** (Equity Group Holdings) - Banking, regional expansion
- **EABL** (East African Breweries) - Consumer goods, dividend aristocrat
- **BAT** (British American Tobacco Kenya) - Consumer goods, high yield
- **SCBK** (Standard Chartered Bank Kenya) - Banking
- **ABSA** (Absa Bank Kenya) - Banking
- **BAMB** (Bamburi Cement) - Construction materials
- **NCBA** (NCBA Group) - Banking
- **KENO** (KenolKobil) - Energy/petroleum
- **COOP** (Co-operative Bank) - Banking
- **SBIC** (Stanbic Holdings) - Banking
- **TOTL** (TotalEnergies Marketing Kenya) - Energy
- **UNGA** (Unga Group) - Food processing
- **KNRE** (Kenya Re) - Insurance

**Kenya Fixed Income (5):**
- 91-Day Treasury Bills
- 182-Day Treasury Bills
- 364-Day Treasury Bills
- Infrastructure Bonds (IFB series)
- M-Akiba (Mobile-based retail bonds)

### 18.3 Resource Links

**APIs:**
- Alpha Vantage: https://www.alphavantage.co/documentation/
- Yahoo Finance (yfinance): https://github.com/ranaroussi/yfinance
- FRED: https://fred.stlouisfed.org/docs/api/

**Kenya-Specific Data:**
- Nairobi Securities Exchange: https://www.nse.co.ke/
- Central Bank of Kenya: https://www.centralbank.go.ke/
- CBK Open Data Portal: https://www.centralbank.go.ke/open-data/
- NSE Live Prices: https://www.nse.co.ke/live-prices/
- Kenya Revenue Authority (for tax info): https://www.kra.go.ke/

**Educational:**
- Investopedia: https://www.investopedia.com/
- Dividend.com: https://www.dividend.com/
- Seeking Alpha: https://seekingalpha.com/
- Standard Investment Bank Kenya: https://www.sib.co.ke/ (research reports)

**AWS Services:**
- AWS Lambda: https://docs.aws.amazon.com/lambda/
- AWS CDK: https://docs.aws.amazon.com/cdk/
- Aurora Serverless: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2.html
- Amazon SES: https://docs.aws.amazon.com/ses/
- Step Functions: https://docs.aws.amazon.com/step-functions/

**Tools:**
- Puppeteer for Lambda: https://github.com/alixaxel/chrome-aws-lambda
- PostgreSQL: https://www.postgresql.org/docs/

**Communities:**
- r/dividends: https://reddit.com/r/dividends
- r/investing: https://reddit.com/r/investing
- Bogleheads: https://www.bogleheads.org/
- Kenya Wall Street (Facebook): Investment community for Kenya investors

---

## 19. Contact & Support

**Product Owner:** Wilfred  
**Development Start:** [TBD]  
**Target Launch:** [TBD]  

**Questions or Feedback:**
During development, document any questions, assumptions, or challenges in a GitHub Discussions thread or project management tool (Linear, Jira, etc.)

---

**Document Version:** 1.0  
**Last Updated:** December 30, 2024  
**Next Review:** Upon Phase 1 completion

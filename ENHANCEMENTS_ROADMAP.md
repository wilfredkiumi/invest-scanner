# Investment Advisor - Enhancement Roadmap

## Priority Matrix: High Value Features to Build Next

Last Updated: 2025-12-30

---

## 🔥 CRITICAL - Implement First (High Value, Low Effort)

### 1. Global Disclaimer & Legal Protection ⚖️
**Priority:** CRITICAL
**Effort:** 1-2 hours
**Value:** Legal compliance, avoid liability
**Status:** ❌ Not Started

- Add disclaimer banner on all pages
- Terms of service page
- Privacy policy page
- Investment risk disclosure
- "Not financial advice" footer

**Why Critical:** Legal liability protection. Must have before any real users.

---

### 2. Performance Charts & Visualizations 📊
**Priority:** HIGH
**Effort:** 2-3 hours
**Value:** User engagement, portfolio tracking
**Status:** ❌ Not Started

**Features:**
- Portfolio performance line chart (£10k → £100k journey)
- Benchmark comparison (vs S&P 500, NSE All-Share)
- Holding-level performance charts
- Sector allocation pie chart
- Geographic allocation donut chart

**Implementation:**
- Use Recharts library (already installed)
- Add to Dashboard and Portfolio pages
- Real-time progress indicator toward £100k goal

---

### 3. Price Alerts & Notifications System 🔔
**Priority:** HIGH
**Effort:** 3-4 hours
**Value:** User retention, engagement
**Status:** ❌ Not Started

**Features:**
- Set price alerts (target reached, stop loss triggered)
- Signal confidence threshold alerts (>90%)
- New crowdfunding opportunity alerts
- Daily digest summary notification
- Alert management page

**Technical:**
- Browser notifications API
- localStorage for alert preferences
- Email integration with AWS SES
- SMS via AWS SNS for high-priority alerts

---

### 4. Stock Screener with Custom Filters 🔍
**Priority:** HIGH
**Effort:** 4-5 hours
**Value:** User empowerment, discovery
**Status:** ❌ Not Started

**Filters:**
- Price range
- Market cap
- P/E ratio
- Dividend yield
- Volume
- Country/Market
- Sector/Industry
- AI confidence score
- Expected return percentage

**Output:**
- Sortable table
- Save custom screens
- Export to CSV
- Add to watchlist from results

---

## 🚀 HIGH PRIORITY (High Value, Medium Effort)

### 5. Research Dashboard for Each Stock 📈
**Priority:** HIGH
**Effort:** 6-8 hours
**Value:** Deep analysis, informed decisions
**Status:** ❌ Not Started

**Components:**
- Company overview & description
- Key statistics (P/E, EPS, Market Cap, etc.)
- Financials table (Revenue, Profit, Margins)
- Historical price chart with technical indicators
- Dividend history
- Analyst recommendations
- Recent news feed
- AI-generated summary

**Pages to Create:**
- `/dashboard/stock/[ticker]` - Individual stock page
- Accessible from signals, portfolio, watchlist

---

### 6. Transaction History & Tax Reporting 💰
**Priority:** HIGH
**Effort:** 5-6 hours
**Value:** Record keeping, tax compliance
**Status:** ❌ Not Started

**Features:**
- Transaction log (buy, sell, dividend)
- Cost basis tracking
- Realized/unrealized gains
- Tax loss harvesting suggestions
- Capital gains report
- Export for tax filing (CSV, PDF)
- Filter by date range, ticker, type

**Data Structure:**
```typescript
interface Transaction {
  id: string
  date: Date
  type: 'BUY' | 'SELL' | 'DIVIDEND'
  ticker: string
  quantity: number
  price: number
  fees: number
  total: number
  notes?: string
}
```

---

### 7. Paper Trading / Simulation Mode 🎮
**Priority:** HIGH
**Effort:** 8-10 hours
**Value:** Risk-free testing, onboarding
**Status:** ❌ Not Started

**Features:**
- Virtual $10,000 starting balance
- Execute mock trades
- Track virtual portfolio performance
- Leaderboard of best performers
- Reset/restart simulation
- Compare against real portfolio (if any)

**Benefits:**
- Users can test strategies
- Learn the platform risk-free
- Build confidence before real money

---

### 8. AI Chat Assistant 🤖
**Priority:** HIGH
**Effort:** 6-8 hours
**Value:** User support, engagement
**Status:** ❌ Not Started

**Capabilities:**
- Answer investment questions
- Explain AI signal reasoning
- Compare stocks
- Portfolio analysis suggestions
- Educational content delivery
- Query historical data

**Technical:**
- AWS Bedrock Claude integration
- Chat interface component
- Context-aware responses
- Message history

---

## 💡 MEDIUM PRIORITY (Medium Value, Various Effort)

### 9. Dividend Tracker & Calendar 💵
**Priority:** MEDIUM
**Effort:** 3-4 hours
**Value:** Income investors
**Status:** ❌ Not Started

**Features:**
- Upcoming dividend payments calendar
- Dividend history chart
- Yield on cost calculation
- Total dividend income tracking
- Projected annual income
- Dividend growth rate

---

### 10. Rebalancing Suggestions 🔄
**Priority:** MEDIUM
**Effort:** 4-5 hours
**Value:** Portfolio optimization
**Status:** ❌ Not Started

**Features:**
- Current vs target allocation comparison
- Rebalancing trade suggestions
- Minimize tax impact
- Consider transaction costs
- One-click execute rebalancing

**Target Allocations:**
- By asset class (stocks, bonds, cash)
- By geography (US, UK, Kenya, Other)
- By sector (Tech, Finance, Healthcare, etc.)
- By risk level (Conservative, Moderate, Aggressive)

---

### 11. News Feed Integration 📰
**Priority:** MEDIUM
**Effort:** 3-4 hours
**Value:** Informed decisions
**Status:** ❌ Not Started

**Sources:**
- Financial Times API
- Alpha Vantage news
- Polygon.io news
- Reddit /r/investing, /r/stocks sentiment
- Twitter financial influencers

**Features:**
- Personalized feed (watched stocks)
- Sentiment analysis (Comprehend)
- News impact on stock price
- Filter by source, sentiment, ticker

---

### 12. Economic Calendar 📅
**Priority:** MEDIUM
**Effort:** 2-3 hours
**Value:** Macro awareness
**Status:** ❌ Not Started

**Events:**
- Fed meetings (FOMC)
- CPI/inflation reports
- GDP releases
- Earnings calendar
- Dividend ex-dates
- IPO calendar

**Features:**
- Filter by importance (High, Medium, Low)
- Set reminders
- Historical impact analysis

---

### 13. Social Features & Community 👥
**Priority:** MEDIUM
**Effort:** 10-12 hours
**Value:** Engagement, retention
**Status:** ❌ Not Started

**Features:**
- Share signals with friends
- Copy trading (follow top performers)
- Discussion threads per stock
- User leaderboard
- Portfolio sharing (optional)
- Achievement badges

**Challenges:**
- Requires user authentication
- Moderation needed
- Privacy concerns

---

## 🔧 TECHNICAL INFRASTRUCTURE (Critical for Scale)

### 14. Backend Lambda Functions
**Priority:** CRITICAL for Production
**Effort:** 20-30 hours
**Value:** Real data, scalability
**Status:** ❌ Not Started

**Functions to Build:**
1. `fetchStockData` - Get prices from Alpha Vantage, Polygon
2. `fetchNSEData` - Scrape Kenya NSE data
3. `analyzeWithAI` - Bedrock Claude analysis
4. `generateSignals` - SageMaker LSTM predictions
5. `sendEmailDigest` - SES email delivery
6. `manageCrowdfundingData` - Scrape Crowdcube, Wefunder APIs
7. `calculatePortfolio` - Real-time portfolio valuation

**API Endpoints Needed:**
- `GET /api/signals` - Get AI signals
- `GET /api/portfolio` - Get portfolio holdings
- `GET /api/stock/:ticker` - Get stock details
- `POST /api/transactions` - Create transaction
- `GET /api/watchlist` - Get watchlist
- `POST /api/alerts` - Create alert

---

### 15. Database Schema & Migrations
**Priority:** CRITICAL for Production
**Effort:** 8-10 hours
**Value:** Data persistence
**Status:** ❌ Not Started

**Tables:**
```sql
-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  name VARCHAR(255),
  country VARCHAR(50),
  currency VARCHAR(3),
  created_at TIMESTAMP
);

-- Portfolio Holdings
CREATE TABLE holdings (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  ticker VARCHAR(20),
  quantity DECIMAL(18,8),
  avg_price DECIMAL(18,2),
  purchase_date DATE,
  market VARCHAR(50)
);

-- Transactions
CREATE TABLE transactions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  ticker VARCHAR(20),
  type VARCHAR(20),
  quantity DECIMAL(18,8),
  price DECIMAL(18,2),
  fees DECIMAL(18,2),
  transaction_date TIMESTAMP
);

-- Watchlist
CREATE TABLE watchlist (
  user_id UUID REFERENCES users(id),
  ticker VARCHAR(20),
  added_date TIMESTAMP,
  PRIMARY KEY (user_id, ticker)
);

-- Price Alerts
CREATE TABLE alerts (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  ticker VARCHAR(20),
  condition VARCHAR(50), -- 'above', 'below', 'pct_change'
  threshold DECIMAL(18,2),
  notification_type VARCHAR(20), -- 'email', 'sms', 'browser'
  active BOOLEAN DEFAULT true
);

-- AI Signals (cached)
CREATE TABLE signals (
  id UUID PRIMARY KEY,
  ticker VARCHAR(20),
  type VARCHAR(10), -- 'BUY', 'SELL', 'HOLD'
  confidence DECIMAL(5,2),
  target_price DECIMAL(18,2),
  reasoning JSONB,
  generated_at TIMESTAMP,
  expires_at TIMESTAMP
);
```

---

### 16. Authentication Flow (Cognito)
**Priority:** CRITICAL for Production
**Effort:** 6-8 hours
**Value:** User management
**Status:** ❌ Not Started

**Pages to Create:**
- `/signin` - Login page
- `/signup` - Registration page
- `/forgot-password` - Password reset
- `/verify-email` - Email verification

**Features:**
- Email/password authentication
- Social login (Google, Apple)
- MFA support
- Session management
- Protected routes

---

## 📱 MOBILE & UX IMPROVEMENTS

### 17. Mobile Optimization
**Priority:** MEDIUM
**Effort:** 8-10 hours
**Value:** Mobile users (60%+ of traffic)
**Status:** ⚠️ Partially Done (responsive but not optimized)

**Improvements:**
- Touch-friendly buttons (larger hit targets)
- Swipe gestures (dismiss cards, navigate)
- Bottom navigation bar for mobile
- Pull-to-refresh
- Mobile-first charts
- Offline mode (cache data)

---

### 18. Dark Mode
**Priority:** LOW
**Effort:** 4-6 hours
**Value:** User preference
**Status:** ❌ Not Started

**Implementation:**
- Theme toggle in settings
- Dark color palette
- Persist preference (localStorage)
- System preference detection

---

## 🎯 IMPLEMENTATION PLAN

### Phase 1: Legal & Core (Week 1)
1. ✅ Global disclaimer & legal pages
2. ✅ Performance charts
3. ✅ Price alerts system

### Phase 2: Discovery & Analysis (Week 2)
4. ✅ Stock screener
5. ✅ Research dashboard per stock
6. ✅ Transaction history

### Phase 3: Engagement (Week 3)
7. ✅ Paper trading mode
8. ✅ AI chat assistant
9. ✅ News feed integration

### Phase 4: Backend Infrastructure (Week 4-6)
10. ✅ Lambda functions
11. ✅ Database schema & migrations
12. ✅ Authentication flow
13. ✅ Connect frontend to real APIs

---

## 📊 SUCCESS METRICS

**Track these KPIs:**
- Daily Active Users (DAU)
- Portfolio value growth rate
- Signal accuracy (backtesting)
- User retention (7-day, 30-day)
- Transaction volume
- Average session duration
- Feature adoption rates

---

## 🚀 QUICK WINS TO START NOW

**Top 3 to implement immediately:**

1. **Legal Disclaimer** (1 hour)
   - Protects from liability
   - Quick to implement
   - Unblocks real users

2. **Performance Chart on Dashboard** (2 hours)
   - High visual impact
   - Users want to track £10k → £100k
   - Uses existing Recharts library

3. **Stock Research Page** (3 hours)
   - Clicking any ticker shows detail
   - Builds user trust
   - Increases time on site

---

**NEXT STEPS:**
Let's start with these 3 quick wins. Which would you like me to build first?

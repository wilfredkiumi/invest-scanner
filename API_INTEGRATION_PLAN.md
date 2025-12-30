# API Integration Plan for Real Market Data

## Overview
This document outlines the API providers and integration strategy for fetching real-time and historical market data for US stocks (NASDAQ, NYSE) and Kenya NSE stocks.

---

## 1. Kenya NSE Market Data

### Official NSE Data Services
The Nairobi Securities Exchange provides official market data through their [Data Services portal](https://www.nse.co.ke/dataservices/).

**Contact Information:**
- **Email**: dataservices@nse.co.ke
- **Phone**: +254 202831000

**Access Options:**
- **Direct Connection**: Connect to NSE data center in Nairobi for real-time streaming data
- **Authorized Vendors**: Access via approved data vendors (NSE maintains a vendors directory)
- **API Access**: Technical specifications available for download

**Data Types Available:**
- **Live/Real-time data**: Direct connection to NSE data centre in Nairobi
- **Intra-day data**: Generated throughout trading on equities, fixed income, and equity derivatives
- **End-of-day data**: Statistical and pricing data packaged as end-of-day products
- **Historical data**: Available on ad-hoc basis with request forms
- **Reference data**: Corporate actions and regulatory news

**Markets Covered:**
- Equities (Nairobi Securities Exchange stocks)
- Fixed Income (bonds)
- Single-stock futures (SSFs)
- Index futures

**API Specifications Available:**
NSE provides [7 API specification documents](https://www.nse.co.ke/dataservices/api-specification-documents/) for download:

1. **Equities Trading Gateway (FIX 5.0)** v1.25 - For order execution
2. **Equities Market Data Feed (MITCH - UDP)** v1.22 - Real-time market data via UDP
3. **Equities Drop Copy Gateway (FIX 5.0)** v1.22 - Transaction confirmations
4. **Derivatives FIX Adapter Specification** - Derivatives trading
5. **Bonds and Derivatives MITS Market Data API** - Fixed income & derivatives data
6. **NSE Widgets Guide** - Ticker and investor relations widgets
7. **Bonds and Derivatives FIX Specification** - Bond trading

**Protocol Standards:**
- **FIX Protocol 5.0**: For trading gateways and drop copy
- **MITCH (UDP)**: For real-time market data feeds
- **MITS API**: For bonds and derivatives market data
- **Widgets**: For simple ticker integration on websites

**Pricing:**
- No public pricing tiers listed
- Discounted rates available for academic research (per Market Data Policy section 17.0)
- Contact dataservices@nse.co.ke for pricing quotes

### Third-Party NSE APIs

#### 1. **ICE Data Services** (Recommended for Production)
- **URL**: https://developer.ice.com/fixed-income-data-services/catalog/nairobi-securities-exchange-nse
- **Features**:
  - Level 1 streaming market data for NSE equities and indices
  - ICE Consolidated Feed for real-time data
  - ICE Consolidated History for end-of-day data
  - Integration via ICE Connect Desktop, ICE XL, or APIs
- **Pricing**: Enterprise (contact for pricing)
- **Status**: Active ✅

#### 2. **myStocks.co.ke**
- **URL**: https://live.mystocks.co.ke/
- **Features**:
  - Real-time price quotes
  - Level 2 market depth data
  - News and analysis
- **Pricing**: Subscription-based
- **Status**: Active ✅

#### 3. **RapidAPI NSE API** (Not Recommended)
- **URL**: https://rapidapi.com/iancenry/api/nairobi-stock-exchange-nse
- **Status**: UNDER MAINTENANCE ❌
- **Note**: Unreliable for production use

### Recommendation for Kenya NSE

**For MVP (Quickest Setup - 1-2 weeks):**
1. **NSE Widgets Integration** - Use NSE's official ticker widgets (simplest approach)
   - Download NSE Widgets Guide from API specifications
   - Embed ticker widgets on your pages
   - No complex FIX/UDP integration needed
   - Limited to basic price data

2. **MITS API for Bonds & Derivatives** - If focusing on fixed income
   - Download specification from NSE
   - Contact dataservices@nse.co.ke for access
   - REST API (easier than FIX/UDP)

**For Production (Real-time Equity Data - 4-8 weeks):**
1. **Contact NSE Data Services** directly
   - Email: dataservices@nse.co.ke
   - Phone: +254 202831000
   - Request pricing for MITCH Market Data Feed (UDP)
   - Requires technical setup for UDP streaming

2. **ICE Data Services** (Authorized Vendor)
   - Simpler integration than direct NSE connection
   - REST API + WebSocket available
   - Enterprise pricing

**Fallback (Development Only):**
- Scrape myStocks.co.ke (with rate limiting and caching)
- Not recommended for production due to reliability concerns

---

## 2. US Market Data (NASDAQ, NYSE)

### Top Stock Market APIs (2025)

#### 1. **Alpha Vantage** (Recommended for MVP)
- **URL**: https://www.alphavantage.co/
- **Features**:
  - 200,000+ stock tickers across 20+ global exchanges
  - NASDAQ-licensed US market data provider
  - Extensive technical indicators (MACD, RSI, Bollinger Bands, etc.)
  - Real-time and historical data
  - Fundamental data (earnings, balance sheets, income statements)
- **Pricing**:
  - Free tier: 25 requests/day (NO real-time US data)
  - Basic: $49.99/month (75 API calls/min)
  - Premium: $249.99/month (1200 calls/min + real-time data)
- **Best For**: Academic, research, hobbyist projects
- **AWS Integration**: Easy via Lambda function
- **Status**: Active ✅

**Sample API Endpoints**:
```bash
# Real-time quote
GET https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=NVDA&apikey=YOUR_KEY

# Historical daily data
GET https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=YOUR_KEY

# Technical indicators
GET https://www.alphavantage.co/query?function=RSI&symbol=NVDA&interval=daily&time_period=14&apikey=YOUR_KEY

# Company fundamentals
GET https://www.alphavantage.co/query?function=OVERVIEW&symbol=NVDA&apikey=YOUR_KEY
```

#### 2. **Polygon.io**
- **URL**: https://polygon.io/
- **Features**:
  - Real-time US equities, options, forex, crypto
  - WebSocket streaming for ultra-low latency
  - Developer-first platform with strong SDK support
  - SQL query interface and flat file downloads
- **Pricing**:
  - Starter: $99/month (real-time data, 5 API calls/sec)
  - Developer: $199/month (unlimited historical data)
  - Advanced: $399/month (WebSocket streaming)
- **Best For**: Production apps requiring real-time data
- **AWS Integration**: WebSocket via API Gateway or AppSync
- **Status**: Active ✅

**Sample API Endpoints**:
```bash
# Real-time quote
GET https://api.polygon.io/v2/aggs/ticker/NVDA/prev?apiKey=YOUR_KEY

# Historical aggregates
GET https://api.polygon.io/v2/aggs/ticker/MSFT/range/1/day/2023-01-01/2024-01-01?apiKey=YOUR_KEY

# Company details
GET https://api.polygon.io/v3/reference/tickers/NVDA?apiKey=YOUR_KEY
```

#### 3. **Finnhub**
- **URL**: https://finnhub.io/
- **Features**:
  - Fast multi-asset coverage (stocks, forex, crypto)
  - Global market data
  - Free tier available
  - Real-time WebSocket streaming
  - News and sentiment analysis
- **Pricing**:
  - Free: 60 API calls/minute (delayed data)
  - Starter: $49.99/month (real-time US stocks)
  - Professional: $299.99/month (unlimited calls)
- **Best For**: Quick integration with free tier for testing
- **AWS Integration**: REST API via Lambda
- **Status**: Active ✅

**Sample API Endpoints**:
```bash
# Real-time quote
GET https://finnhub.io/api/v1/quote?symbol=NVDA&token=YOUR_KEY

# Company profile
GET https://finnhub.io/api/v1/stock/profile2?symbol=NVDA&token=YOUR_KEY

# News sentiment
GET https://finnhub.io/api/v1/news-sentiment?symbol=NVDA&token=YOUR_KEY
```

#### 4. **Financial Modeling Prep (FMP)**
- **URL**: https://site.financialmodelingprep.com/
- **Features**:
  - Comprehensive fundamental data
  - Historical price data
  - Financial statements (income, balance sheet, cash flow)
  - Valuation metrics
- **Pricing**:
  - Free: 250 requests/day
  - Starter: $29.99/month (1000 requests/day)
  - Professional: $99.99/month (10,000 requests/day)
- **Best For**: Fundamental analysis and financial modeling
- **AWS Integration**: REST API via Lambda
- **Status**: Active ✅

#### 5. **Yahoo Finance (Unofficial)**
- **Features**:
  - Free, no API key required
  - Historical data
  - Real-time quotes (delayed 15 minutes)
- **Pricing**: Free
- **Limitations**:
  - No official API (relies on scraping or unofficial libraries)
  - Rate limiting enforced
  - No SLA or support
- **Best For**: Quick prototyping only
- **Status**: Unofficial ⚠️

---

## 3. AWS Bedrock AI Integration with Financial Data

AWS provides reference architectures for building AI-powered investment advisors using Amazon Bedrock.

### AWS Bedrock Solutions for Financial Analysis

#### 1. **Multi-Agent Investment Research Assistant**
- **URL**: https://aws.amazon.com/blogs/machine-learning/part-3-building-an-ai-powered-assistant-for-investment-research-with-multi-agent-collaboration-in-amazon-bedrock-and-amazon-bedrock-data-automation/
- **Features**:
  - Specialized AI agents for different tasks (news analysis, stock evaluation, portfolio optimization)
  - Natural language interface for investment insights
  - Multi-modal data processing (text, PDFs, images)
- **Use Case**: Comprehensive investment research automation

#### 2. **Virtual Stock Technical Analyst**
- **URL**: https://aws.amazon.com/blogs/machine-learning/create-a-virtual-stock-technical-analyst-using-amazon-bedrock-agents/
- **Features**:
  - Amazon Bedrock Agents with Claude 3.5 Sonnet
  - Technical analysis automation
  - Pattern recognition and signal generation
- **Use Case**: Automated technical analysis and trading signals

#### 3. **Investment Analysis with Structured & Unstructured Data**
- **GitHub**: https://github.com/aws-solutions-library-samples/guidance-for-investment-analysis-using-amazon-bedrock
- **Features**:
  - Process financial statements, market data, news
  - Generate comprehensive investment reports
  - Accelerate analyst decision-making
- **Use Case**: End-to-end investment analysis pipeline

### AWS Data Integration Points
- **Amazon S3**: Store historical market data, financial statements, news articles
- **Amazon RDS (PostgreSQL)**: Store structured stock data, user portfolios, transactions
- **Amazon OpenSearch**: Vector storage for semantic search of financial documents
- **Amazon EventBridge**: Schedule data ingestion jobs
- **AWS Lambda**: API integration layer, data transformation
- **Amazon Bedrock**: AI-powered analysis and signal generation

---

## 4. Recommended Architecture for MVP

### Data Sources
1. **US Stocks**: Alpha Vantage (Free tier for development, Starter plan for production)
2. **Kenya NSE**: ICE Data Services or scrape myStocks.co.ke
3. **News Data**: Finnhub News API (free tier)
4. **Sentiment Analysis**: AWS Comprehend

### AWS Stack
```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (Next.js)                    │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│              API Gateway (REST API)                      │
└────────────────────┬────────────────────────────────────┘
                     │
         ┌───────────┼───────────┐
         │           │           │
┌────────▼──────┐ ┌──▼─────┐ ┌──▼──────────┐
│ Lambda:       │ │ Lambda:│ │ Lambda:     │
│ GetStockData  │ │ GetAI  │ │ GetPortfolio│
│               │ │ Signal │ │             │
└───────┬───────┘ └───┬────┘ └──────┬──────┘
        │             │              │
┌───────▼─────────────▼──────────────▼──────┐
│         Amazon RDS (Aurora Serverless)     │
│  - Stock prices (cached)                   │
│  - User portfolios                         │
│  - AI signals                              │
└────────────────────────────────────────────┘
        │
┌───────▼──────────────────────────────────┐
│      External APIs (Lambda Functions)     │
│  - Alpha Vantage (US stocks)              │
│  - ICE/myStocks (Kenya NSE)               │
│  - Finnhub (News)                         │
└───────────────────────────────────────────┘
        │
┌───────▼──────────────────────────────────┐
│        Amazon Bedrock (AI Analysis)       │
│  - Claude 3.5 Sonnet                      │
│  - Signal generation                      │
│  - Risk assessment                        │
│  - News summarization                     │
└───────────────────────────────────────────┘
```

### Lambda Function: Get Stock Data
```python
import boto3
import requests
import os
from datetime import datetime

# Environment variables
ALPHA_VANTAGE_KEY = os.environ['ALPHA_VANTAGE_API_KEY']
FINNHUB_KEY = os.environ['FINNHUB_API_KEY']

def lambda_handler(event, context):
    ticker = event['pathParameters']['ticker']

    # Check cache in RDS first
    cached_data = get_cached_stock_data(ticker)
    if cached_data and is_fresh(cached_data):
        return cached_data

    # Fetch from Alpha Vantage
    if ticker in ['NVDA', 'MSFT', 'TSLA']:  # US stocks
        data = fetch_alpha_vantage(ticker)
    elif ticker.endswith('.NB'):  # Kenya NSE
        data = fetch_nse_data(ticker)

    # Cache in RDS
    cache_stock_data(ticker, data)

    return {
        'statusCode': 200,
        'body': json.dumps(data)
    }

def fetch_alpha_vantage(ticker):
    url = f"https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol={ticker}&apikey={ALPHA_VANTAGE_KEY}"
    response = requests.get(url)
    return response.json()
```

### Lambda Function: Generate AI Signal
```python
import boto3
import json

bedrock = boto3.client('bedrock-runtime')

def lambda_handler(event, context):
    ticker = event['ticker']
    stock_data = event['stock_data']
    news_data = event['news_data']

    # Prepare prompt
    prompt = f"""
    You are an expert investment analyst. Analyze the following stock data and news for {ticker}:

    Stock Data:
    {json.dumps(stock_data, indent=2)}

    Recent News:
    {json.dumps(news_data, indent=2)}

    Provide:
    1. BUY/SELL/HOLD recommendation
    2. Confidence score (0-100)
    3. Target price
    4. Key reasons (3-5 bullet points)
    5. Risk level
    6. Time horizon
    """

    # Call Bedrock Claude
    response = bedrock.invoke_model(
        modelId='anthropic.claude-3-5-sonnet-20241022-v2:0',
        body=json.dumps({
            'anthropic_version': 'bedrock-2023-05-31',
            'max_tokens': 2000,
            'messages': [
                {'role': 'user', 'content': prompt}
            ]
        })
    )

    result = json.loads(response['body'].read())
    return parse_ai_signal(result['content'][0]['text'])
```

---

## 5. Cost Estimation (MVP - First 3 Months)

### API Costs
- **Alpha Vantage Starter**: $49.99/month × 3 = $149.97
- **Finnhub Starter** (optional): $49.99/month × 3 = $149.97
- **NSE Data** (ICE or myStocks): ~$100/month × 3 = $300
- **Total API Costs**: ~$600

### AWS Costs (with AWS Free Tier)
- **Lambda**: Free tier (1M requests/month) - $0
- **API Gateway**: Free tier (1M requests/month) - $0
- **Aurora Serverless v2**: ~$30/month × 3 = $90
- **Bedrock Claude 3.5 Sonnet**: ~$50/month × 3 = $150 (100k input + 50k output tokens/day)
- **S3**: ~$5/month × 3 = $15
- **EventBridge**: Free tier - $0
- **Total AWS Costs**: ~$255

### **Grand Total MVP (3 months)**: ~$855

---

## 6. Data Refresh Strategy

### Real-time Updates (for production)
- **WebSocket**: Polygon.io or Finnhub WebSocket for live prices
- **Polling**: Every 5 minutes during market hours via EventBridge

### Cached Updates (for MVP)
- **Stock Prices**: Refresh every 15 minutes during market hours
- **Company Fundamentals**: Refresh daily at market close
- **News**: Refresh every 30 minutes
- **AI Signals**: Regenerate every 4 hours or on significant price movement

### Caching Strategy
```
┌────────────────────────────────────────┐
│     RDS Aurora Serverless v2           │
├────────────────────────────────────────┤
│  stocks_cache                          │
│    - ticker (PK)                       │
│    - price                             │
│    - change                            │
│    - volume                            │
│    - last_updated (timestamp)          │
│    - ttl (15 minutes)                  │
├────────────────────────────────────────┤
│  ai_signals_cache                      │
│    - ticker (PK)                       │
│    - signal_type (BUY/SELL/HOLD)       │
│    - confidence                        │
│    - reasoning (JSON)                  │
│    - generated_at (timestamp)          │
│    - ttl (4 hours)                     │
└────────────────────────────────────────┘
```

---

## 7. Implementation Phases

### Phase 1: MVP (Week 1-2)
- [ ] Set up Alpha Vantage API integration (Lambda function)
- [ ] Create RDS schema for stock cache
- [ ] Implement basic caching (15-minute TTL)
- [ ] Test with 3 US stocks (NVDA, MSFT, TSLA)
- [ ] Add error handling and rate limiting

### Phase 2: Kenya NSE Integration (Week 3)
- [ ] Contact NSE Data Services for API access
- [ ] Integrate ICE Data Services OR implement myStocks scraper
- [ ] Add NSE stock data to cache
- [ ] Test with 3 Kenya stocks (SCOM.NB, EQTY.NB, KCB.NB)

### Phase 3: AI Signal Generation (Week 4)
- [ ] Set up Amazon Bedrock integration
- [ ] Create Lambda function for AI signal generation
- [ ] Implement prompt engineering for stock analysis
- [ ] Store AI signals in RDS with 4-hour TTL
- [ ] Test signal accuracy

### Phase 4: News & Sentiment (Week 5)
- [ ] Integrate Finnhub News API
- [ ] Add AWS Comprehend for sentiment analysis
- [ ] Link news sentiment to AI signals
- [ ] Display news on stock detail pages

### Phase 5: Production Optimization (Week 6+)
- [ ] Upgrade to Polygon.io for real-time data
- [ ] Implement WebSocket streaming
- [ ] Add CloudWatch monitoring and alerts
- [ ] Set up EventBridge schedules for data refresh
- [ ] Load testing and optimization

---

## 8. Sources

### Kenya NSE Market Data
- [Nairobi Securities Exchange Data Services](https://www.nse.co.ke/dataservices/)
- [ICE Data Services - NSE API](https://developer.ice.com/fixed-income-data-services/catalog/nairobi-securities-exchange-nse)
- [myStocks.co.ke Live Data](https://live.mystocks.co.ke/)
- [RapidAPI NSE API](https://rapidapi.com/iancenry/api/nairobi-stock-exchange-nse)

### US Stock Market APIs
- [Alpha Vantage Documentation](https://www.alphavantage.co/)
- [Best Stock Market APIs 2025 Review](https://www.alphavantage.co/best_stock_market_api_review/)
- [Top 5 Finance APIs 2025](https://quartr.com/insights/investor-relations/top-5-finance-and-stock-market-apis)
- [12 Best Financial Market APIs 2025](https://blog.apilayer.com/12-best-financial-market-apis-for-real-time-data-in-2025/)
- [Finnhub Stock APIs](https://finnhub.io/)

### AWS Bedrock AI Integration
- [Part 3: Building AI-powered Investment Research Assistant](https://aws.amazon.com/blogs/machine-learning/part-3-building-an-ai-powered-assistant-for-investment-research-with-multi-agent-collaboration-in-amazon-bedrock-and-amazon-bedrock-data-automation/)
- [Create Virtual Stock Technical Analyst](https://aws.amazon.com/blogs/machine-learning/create-a-virtual-stock-technical-analyst-using-amazon-bedrock-agents/)
- [GitHub: Guidance for Investment Analysis using Amazon Bedrock](https://github.com/aws-solutions-library-samples/guidance-for-investment-analysis-using-amazon-bedrock)
- [AI-powered Investment Research with Multi-modal Data](https://aws.amazon.com/blogs/machine-learning/ai-powered-assistants-for-investment-research-with-multi-modal-data-an-application-of-agents-for-amazon-bedrock/)

---

## Next Steps

1. **Immediate**: Sign up for Alpha Vantage Starter plan ($49.99/month)
2. **Week 1**: Contact NSE Data Services for official API access quote
3. **Week 1**: Implement Lambda functions for Alpha Vantage integration
4. **Week 2**: Set up RDS caching layer
5. **Week 3**: Begin Kenya NSE integration
6. **Week 4**: Activate Amazon Bedrock AI signal generation

This plan balances cost-effectiveness for MVP development while maintaining a clear path to production-grade real-time data integration.

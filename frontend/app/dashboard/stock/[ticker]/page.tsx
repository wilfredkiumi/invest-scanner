'use client'

import { use } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, TrendingUp, TrendingDown, Info, Building2, Calendar, DollarSign, Target, Globe } from 'lucide-react'
import { formatCurrency, formatPercentage } from '@/lib/utils'
import Link from 'next/link'
import { StockPriceChart } from '@/components/charts/stock-price-chart'

// Mock stock data - will be replaced with real API calls
const stockData: Record<string, any> = {
  'NVDA': {
    ticker: 'NVDA',
    companyName: 'NVIDIA Corporation',
    country: 'United States',
    market: 'NASDAQ',
    sector: 'Technology',
    industry: 'Semiconductors',
    currentPrice: 875.40,
    previousClose: 862.15,
    dayChange: 13.25,
    dayChangePercentage: 1.54,
    yearHigh: 924.50,
    yearLow: 410.20,
    marketCap: 2150000000000,
    peRatio: 68.5,
    eps: 12.78,
    dividendYield: 0.03,
    beta: 1.72,
    volume: 45230000,
    avgVolume: 48500000,
    description: 'NVIDIA Corporation is a leading designer of graphics processing units (GPUs) for gaming, professional visualization, data centers, and automotive markets. The company has become a dominant force in AI computing with its CUDA platform and data center GPUs.',
    aiSignal: {
      type: 'BUY',
      confidence: 94,
      targetPrice: 1050,
      expectedReturn: 20,
      timeHorizon: 30,
      riskLevel: 'MEDIUM-HIGH',
      reasoning: [
        'Q4 earnings beat expectations by 18% ($5.16 vs $4.37 expected)',
        'Data center revenue up 217% YoY to $18.4B',
        'AI chip demand exceeding supply by 3-4x',
        'New Blackwell architecture launching Q2 2024 with 2.5x performance',
        'Partnership with all major cloud providers (AWS, Azure, GCP)',
      ],
      aiModels: ['Bedrock Claude', 'SageMaker LSTM', 'Forecast'],
    },
    financials: {
      revenue: 60922000000,
      revenueGrowth: 126,
      netIncome: 29760000000,
      profitMargin: 48.9,
      operatingMargin: 54.2,
      roe: 123.8,
      debtToEquity: 0.18,
    },
    news: [
      {
        title: 'NVIDIA announces new AI superchip for autonomous vehicles',
        source: 'Reuters',
        date: '2024-06-14',
        sentiment: 'positive',
      },
      {
        title: 'Major cloud providers increase NVIDIA GPU orders by 40%',
        source: 'Bloomberg',
        date: '2024-06-13',
        sentiment: 'positive',
      },
      {
        title: 'NVIDIA stock hits new all-time high on AI demand',
        source: 'CNBC',
        date: '2024-06-12',
        sentiment: 'positive',
      },
    ],
  },
  'SCOM.NB': {
    ticker: 'SCOM.NB',
    companyName: 'Safaricom PLC',
    country: 'Kenya',
    market: 'NSE',
    sector: 'Telecommunications',
    industry: 'Wireless Services',
    currentPrice: 12.50,
    previousClose: 12.20,
    dayChange: 0.30,
    dayChangePercentage: 2.46,
    yearHigh: 14.80,
    yearLow: 9.50,
    marketCap: 500000000,
    peRatio: 15.2,
    eps: 0.82,
    dividendYield: 5.6,
    beta: 0.85,
    volume: 8500000,
    avgVolume: 7200000,
    description: 'Safaricom PLC is the leading telecommunications provider in Kenya with over 42 million subscribers. The company pioneered mobile money with M-Pesa, which now serves 30+ million customers and processes 51% of Kenya\'s GDP annually.',
    aiSignal: {
      type: 'BUY',
      confidence: 88,
      targetPrice: 15.20,
      expectedReturn: 21.6,
      timeHorizon: 45,
      riskLevel: 'MEDIUM',
      reasoning: [
        'M-Pesa revenue grew 18.4% YoY to KES 120B',
        'Ethiopia expansion gaining traction (5M subscribers in 18 months)',
        'Mobile data revenue up 12.3% on 5G rollout',
        'Dividend yield 5.6% - best in sector',
        'Kenya macro indicators improving (GDP growth 5.2%)',
      ],
      aiModels: ['Bedrock Claude', 'Forecast'],
    },
    financials: {
      revenue: 298800000000,
      revenueGrowth: 11.5,
      netIncome: 68200000000,
      profitMargin: 22.8,
      operatingMargin: 34.5,
      roe: 32.5,
      debtToEquity: 0.42,
    },
    news: [
      {
        title: 'Safaricom Ethiopia subscriber base hits 5 million milestone',
        source: 'Business Daily',
        date: '2024-06-15',
        sentiment: 'positive',
      },
      {
        title: 'M-Pesa to launch in 3 new African markets',
        source: 'The East African',
        date: '2024-06-10',
        sentiment: 'positive',
      },
      {
        title: 'Safaricom announces 15% dividend increase',
        source: 'Nation Media',
        date: '2024-06-08',
        sentiment: 'positive',
      },
    ],
  },
  'MSFT': {
    ticker: 'MSFT',
    companyName: 'Microsoft Corporation',
    country: 'United States',
    market: 'NASDAQ',
    sector: 'Technology',
    industry: 'Software',
    currentPrice: 425.30,
    previousClose: 421.80,
    dayChange: 3.50,
    dayChangePercentage: 0.83,
    yearHigh: 468.35,
    yearLow: 309.45,
    marketCap: 3160000000000,
    peRatio: 35.8,
    eps: 11.88,
    dividendYield: 0.72,
    beta: 0.91,
    volume: 22450000,
    avgVolume: 24800000,
    description: 'Microsoft Corporation develops, licenses, and supports software, services, devices, and solutions worldwide. The company operates in Productivity and Business Processes, Intelligent Cloud, and More Personal Computing segments.',
    aiSignal: {
      type: 'BUY',
      confidence: 89,
      targetPrice: 475.00,
      expectedReturn: 11.7,
      timeHorizon: 60,
      riskLevel: 'MEDIUM',
      reasoning: [
        'Azure cloud revenue growth accelerating (+28% YoY)',
        'AI integration driving enterprise adoption',
        'Strong balance sheet with $100B+ cash',
        'Copilot adoption exceeding expectations',
      ],
      aiModels: ['Bedrock Claude', 'SageMaker LSTM'],
    },
    financials: {
      revenue: 227600000000,
      revenueGrowth: 13.2,
      netIncome: 88140000000,
      profitMargin: 38.7,
      operatingMargin: 42.5,
      roe: 43.2,
      debtToEquity: 0.28,
    },
    news: [
      {
        title: 'Microsoft Copilot reaches 10M+ enterprise users',
        source: 'TechCrunch',
        date: '2024-06-14',
        sentiment: 'positive',
      },
      {
        title: 'Azure AI services revenue doubles in Q3',
        source: 'Bloomberg',
        date: '2024-06-11',
        sentiment: 'positive',
      },
    ],
  },
}

export default function StockPage({ params }: { params: Promise<{ ticker: string }> }) {
  const { ticker } = use(params)
  const stock = stockData[ticker.toUpperCase()]

  if (!stock) {
    return (
      <div className="space-y-8">
        <Link href="/dashboard/signals">
          <Button variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Signals
          </Button>
        </Link>
        <Card className="p-12 text-center">
          <p className="text-gray-600">Stock not found: {ticker}</p>
        </Card>
      </div>
    )
  }

  const priceChangeColor = stock.dayChange >= 0 ? 'text-emerald-600' : 'text-red-600'

  return (
    <div className="space-y-8">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between">
        <Link href="/dashboard/signals">
          <Button variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Signals
          </Button>
        </Link>
        <div className="flex gap-2">
          <Button variant="outline">Add to Watchlist</Button>
          <Button>Execute Trade</Button>
        </div>
      </div>

      {/* Stock Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap mb-3">
                <CardTitle className="text-3xl">{stock.ticker}</CardTitle>
                <Badge variant="secondary">{stock.market}</Badge>
                <Badge variant="outline">
                  <Globe className="h-3 w-3 mr-1" />
                  {stock.country}
                </Badge>
              </div>
              <CardDescription className="text-lg mb-2">{stock.companyName}</CardDescription>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <Building2 className="h-4 w-4" />
                  {stock.sector}
                </span>
                <span>•</span>
                <span>{stock.industry}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold">{formatCurrency(stock.currentPrice)}</p>
              <p className={`text-lg font-semibold ${priceChangeColor} flex items-center justify-end gap-1`}>
                {stock.dayChange >= 0 ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
                {stock.dayChange >= 0 ? '+' : ''}{formatCurrency(stock.dayChange)} ({formatPercentage(stock.dayChangePercentage)})
              </p>
              <p className="text-sm text-gray-600 mt-1">Previous Close: {formatCurrency(stock.previousClose)}</p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* AI Signal Card */}
      <Card className="bg-emerald-50 border-emerald-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Badge variant={stock.aiSignal.type === 'BUY' ? 'default' : 'destructive'} className="text-lg px-3 py-1">
                  {stock.aiSignal.type}
                </Badge>
                AI Signal - {stock.aiSignal.confidence}% Confidence
              </CardTitle>
              <CardDescription className="mt-2">
                Target: {formatCurrency(stock.aiSignal.targetPrice)} | Expected Return: +{formatPercentage(stock.aiSignal.expectedReturn)} | Horizon: {stock.aiSignal.timeHorizon} days
              </CardDescription>
            </div>
            <Badge variant="outline" className="text-lg px-4 py-2">
              {stock.aiSignal.riskLevel}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-white p-4 rounded-lg">
            <p className="font-semibold mb-3 flex items-center gap-2">
              <Info className="h-4 w-4 text-emerald-600" />
              AI Analysis:
            </p>
            <ul className="space-y-2">
              {stock.aiSignal.reasoning.map((reason: string, i: number) => (
                <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                  <span className="text-emerald-600 mt-0.5">✓</span>
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-2 flex-wrap mt-4 pt-4 border-t">
              <p className="text-sm text-gray-600">AI Models:</p>
              {stock.aiSignal.aiModels.map((model: string) => (
                <Badge key={model} variant="secondary">{model}</Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Price Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Price Chart - Last 6 Months</CardTitle>
          <CardDescription>Historical price performance with volume</CardDescription>
        </CardHeader>
        <CardContent>
          <StockPriceChart ticker={stock.ticker} />
        </CardContent>
      </Card>

      {/* Key Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Key Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Market Cap</p>
              <p className="text-xl font-semibold">
                {stock.marketCap >= 1000000000000
                  ? `$${(stock.marketCap / 1000000000000).toFixed(2)}T`
                  : stock.marketCap >= 1000000000
                  ? `$${(stock.marketCap / 1000000000).toFixed(2)}B`
                  : `$${(stock.marketCap / 1000000).toFixed(2)}M`}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">P/E Ratio</p>
              <p className="text-xl font-semibold">{stock.peRatio}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">EPS</p>
              <p className="text-xl font-semibold">{formatCurrency(stock.eps)}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Dividend Yield</p>
              <p className="text-xl font-semibold">{formatPercentage(stock.dividendYield)}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">52-Week High</p>
              <p className="text-xl font-semibold">{formatCurrency(stock.yearHigh)}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">52-Week Low</p>
              <p className="text-xl font-semibold">{formatCurrency(stock.yearLow)}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Beta</p>
              <p className="text-xl font-semibold">{stock.beta}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Avg Volume</p>
              <p className="text-xl font-semibold">{(stock.avgVolume / 1000000).toFixed(1)}M</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Company Description */}
      <Card>
        <CardHeader>
          <CardTitle>About {stock.companyName}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed">{stock.description}</p>
        </CardContent>
      </Card>

      {/* Financials */}
      <Card>
        <CardHeader>
          <CardTitle>Financial Performance</CardTitle>
          <CardDescription>Key financial metrics (TTM)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Revenue</p>
              <p className="text-xl font-semibold">
                {stock.financials.revenue >= 1000000000
                  ? `$${(stock.financials.revenue / 1000000000).toFixed(1)}B`
                  : `$${(stock.financials.revenue / 1000000).toFixed(1)}M`}
              </p>
              <p className="text-xs text-emerald-600">+{formatPercentage(stock.financials.revenueGrowth)} YoY</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Net Income</p>
              <p className="text-xl font-semibold">
                {stock.financials.netIncome >= 1000000000
                  ? `$${(stock.financials.netIncome / 1000000000).toFixed(1)}B`
                  : `$${(stock.financials.netIncome / 1000000).toFixed(1)}M`}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Profit Margin</p>
              <p className="text-xl font-semibold">{formatPercentage(stock.financials.profitMargin)}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Operating Margin</p>
              <p className="text-xl font-semibold">{formatPercentage(stock.financials.operatingMargin)}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">ROE</p>
              <p className="text-xl font-semibold">{formatPercentage(stock.financials.roe)}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Debt/Equity</p>
              <p className="text-xl font-semibold">{stock.financials.debtToEquity}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent News */}
      <Card>
        <CardHeader>
          <CardTitle>Recent News</CardTitle>
          <CardDescription>Latest updates and market sentiment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stock.news.map((article: any, i: number) => (
              <div key={i} className="flex items-start gap-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{article.title}</p>
                  <div className="flex items-center gap-3 mt-2 text-sm text-gray-600">
                    <span>{article.source}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(article.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <Badge variant={article.sentiment === 'positive' ? 'default' : 'secondary'}>
                  {article.sentiment}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

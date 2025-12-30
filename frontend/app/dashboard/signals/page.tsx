'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Bot, TrendingUp, TrendingDown, Info, Globe } from 'lucide-react'
import { formatCurrency, formatPercentage } from '@/lib/utils'

const allSignals = [
  // United States - High Confidence
  {
    id: '1',
    ticker: 'NVDA',
    companyName: 'NVIDIA Corporation',
    country: 'United States',
    market: 'NASDAQ',
    type: 'BUY',
    confidence: 94,
    currentPrice: 875.40,
    targetPrice: 1050,
    expectedReturn: 20,
    timeHorizon: 30,
    riskLevel: 'MEDIUM-HIGH',
    reasoning: [
      'Strong earnings beat detected (Claude analysis)',
      'Upward price trend (SageMaker LSTM: 89% accuracy)',
      'Positive news sentiment (Comprehend: +0.87/1.0)',
      'Forecast predicts continued growth through Q2',
    ],
    aiModels: ['Bedrock Claude', 'SageMaker LSTM', 'Forecast'],
    recommendedPosition: '10% of portfolio',
    stopLoss: 820,
    takeProfit: 1050,
  },
  {
    id: '2',
    ticker: 'SCHD',
    companyName: 'Schwab US Dividend Equity ETF',
    country: 'United States',
    market: 'NYSE',
    type: 'BUY',
    confidence: 92,
    currentPrice: 78.45,
    targetPrice: 85.00,
    expectedReturn: 8.3,
    timeHorizon: 90,
    riskLevel: 'LOW',
    reasoning: [
      'Low expense ratio (0.06%) - best in class',
      'Consistent dividend growth (10-year track record)',
      'Diversified across quality dividend stocks',
      'Safe haven during market volatility',
    ],
    aiModels: ['Bedrock Claude'],
    recommendedPosition: '15% of portfolio',
    stopLoss: 75.00,
    takeProfit: 85.00,
  },
  {
    id: '3',
    ticker: 'MSFT',
    companyName: 'Microsoft Corporation',
    country: 'United States',
    market: 'NASDAQ',
    type: 'BUY',
    confidence: 89,
    currentPrice: 425.30,
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
    recommendedPosition: '12% of portfolio',
    stopLoss: 400.00,
    takeProfit: 475.00,
  },
  {
    id: '4',
    ticker: 'VYM',
    companyName: 'Vanguard High Dividend Yield ETF',
    country: 'United States',
    market: 'NYSE',
    type: 'BUY',
    confidence: 86,
    currentPrice: 112.80,
    targetPrice: 120.00,
    expectedReturn: 6.4,
    timeHorizon: 120,
    riskLevel: 'LOW',
    reasoning: [
      'Dividend yield 3.1% - above market average',
      'Low volatility during market corrections',
      'Broad diversification across 400+ stocks',
      'Expense ratio 0.06% - highly competitive',
    ],
    aiModels: ['Bedrock Claude', 'Forecast'],
    recommendedPosition: '10% of portfolio',
    stopLoss: 108.00,
    takeProfit: 120.00,
  },
  // Kenya - High Confidence
  {
    id: '5',
    ticker: 'SCOM.NB',
    companyName: 'Safaricom PLC',
    country: 'Kenya',
    market: 'NSE',
    type: 'BUY',
    confidence: 88,
    currentPrice: 12.50,
    targetPrice: 15.20,
    expectedReturn: 21.6,
    timeHorizon: 45,
    riskLevel: 'MEDIUM',
    reasoning: [
      'Dividend growth streak continues (15 years)',
      'M-Pesa expansion into Ethiopia showing strong traction',
      'Undervalued vs regional peers (P/E: 12.3)',
      'Kenya macro indicators improving (GDP growth 5.2%)',
    ],
    aiModels: ['Bedrock Claude', 'Forecast'],
    recommendedPosition: '5% of portfolio',
    stopLoss: 11.20,
    takeProfit: 15.20,
  },
  {
    id: '6',
    ticker: 'EQTY.NB',
    companyName: 'Equity Group Holdings',
    country: 'Kenya',
    market: 'NSE',
    type: 'BUY',
    confidence: 84,
    currentPrice: 3.25,
    targetPrice: 4.10,
    expectedReturn: 26.2,
    timeHorizon: 60,
    riskLevel: 'MEDIUM-HIGH',
    reasoning: [
      'Regional banking expansion into 6 African countries',
      'Digital banking platform gaining market share',
      'Strong loan book growth (+18% YoY)',
      'Government infrastructure bonds providing stability',
    ],
    aiModels: ['Bedrock Claude', 'SageMaker LSTM'],
    recommendedPosition: '4% of portfolio',
    stopLoss: 2.90,
    takeProfit: 4.10,
  },
  {
    id: '7',
    ticker: 'KCB.NB',
    companyName: 'KCB Group Holdings',
    country: 'Kenya',
    market: 'NSE',
    type: 'BUY',
    confidence: 81,
    currentPrice: 2.35,
    targetPrice: 2.85,
    expectedReturn: 21.3,
    timeHorizon: 75,
    riskLevel: 'MEDIUM',
    reasoning: [
      'Merger synergies with NBK still being realized',
      'Improved asset quality (NPL ratio down to 8.2%)',
      'East Africa economic recovery accelerating',
      'Dividend yield 7.5% - attractive income play',
    ],
    aiModels: ['Bedrock Claude', 'Forecast'],
    recommendedPosition: '3% of portfolio',
    stopLoss: 2.15,
    takeProfit: 2.85,
  },
  // United Kingdom
  {
    id: '8',
    ticker: 'AZN.L',
    companyName: 'AstraZeneca PLC',
    country: 'United Kingdom',
    market: 'LSE',
    type: 'BUY',
    confidence: 87,
    currentPrice: 112.50,
    targetPrice: 128.00,
    expectedReturn: 13.8,
    timeHorizon: 90,
    riskLevel: 'LOW-MEDIUM',
    reasoning: [
      'Oncology pipeline showing strong Phase III results',
      'Obesity drug candidate promising early data',
      'Emerging markets revenue +15% YoY',
      'Defensive healthcare play amid uncertainty',
    ],
    aiModels: ['Bedrock Claude', 'Comprehend'],
    recommendedPosition: '6% of portfolio',
    stopLoss: 105.00,
    takeProfit: 128.00,
  },
  // Low Confidence (filtered out by default)
  {
    id: '9',
    ticker: 'TSLA',
    companyName: 'Tesla Inc',
    country: 'United States',
    market: 'NASDAQ',
    type: 'SELL',
    confidence: 78,
    currentPrice: 645,
    targetPrice: 580,
    expectedReturn: -10,
    timeHorizon: 20,
    riskLevel: 'HIGH',
    reasoning: [
      'Overbought conditions detected (RSI: 78)',
      'Negative news sentiment shift (competition concerns)',
      'Technical indicators suggest correction incoming',
      'Good profit already realized from entry at £580',
    ],
    aiModels: ['SageMaker LSTM', 'Comprehend'],
    recommendedPosition: 'Reduce by 60%',
    stopLoss: null,
    takeProfit: 645,
  },
  {
    id: '10',
    ticker: 'BAMB.NB',
    companyName: 'Bamburi Cement',
    country: 'Kenya',
    market: 'NSE',
    type: 'HOLD',
    confidence: 72,
    currentPrice: 32.50,
    targetPrice: 34.00,
    expectedReturn: 4.6,
    timeHorizon: 90,
    riskLevel: 'MEDIUM',
    reasoning: [
      'Construction sector recovery slower than expected',
      'Input cost pressures from energy prices',
      'Market share stable but growth limited',
      'Wait for clearer economic signals',
    ],
    aiModels: ['Bedrock Claude'],
    recommendedPosition: 'Hold current position',
    stopLoss: 30.00,
    takeProfit: 34.00,
  },
]

// Crowdfunding & Early-Stage Opportunities
const crowdfundingOpportunities = [
  {
    id: 'cf1',
    companyName: 'BrewDog Equity for Punks',
    platform: 'Crowdcube',
    country: 'United Kingdom',
    sector: 'Food & Beverage',
    type: 'EQUITY',
    minimumInvestment: 25,
    targetRaise: 1500000,
    currentRaise: 1250000,
    percentageRaised: 83.3,
    valuation: 45000000,
    investorsCount: 2847,
    daysRemaining: 12,
    confidence: 86,
    expectedReturn: 150,
    timeHorizon: 1825, // 5 years
    riskLevel: 'HIGH',
    reasoning: [
      'Established brand with global presence in 60+ countries',
      'Strong community engagement (200k+ equity punk shareholders)',
      'Revenue growth 22% YoY, approaching profitability',
      'Craft beer market growing 8% annually',
      'Previous funding rounds delivered 3x returns to early investors',
    ],
    aiModels: ['Bedrock Claude', 'Comprehend'],
    platformUrl: 'https://www.crowdcube.com/brewdog',
  },
  {
    id: 'cf2',
    companyName: 'M-KOPA Solar',
    platform: 'Direct Investment',
    country: 'Kenya',
    sector: 'Clean Energy',
    type: 'SERIES C',
    minimumInvestment: 1000,
    targetRaise: 50000000,
    currentRaise: 42000000,
    percentageRaised: 84.0,
    valuation: 750000000,
    investorsCount: 156,
    daysRemaining: 45,
    confidence: 92,
    expectedReturn: 300,
    timeHorizon: 1095, // 3 years
    riskLevel: 'MEDIUM-HIGH',
    reasoning: [
      'Leading pay-as-you-go solar provider in East Africa',
      '3M+ customers across Kenya, Uganda, Nigeria, Ghana',
      'Backed by Bill Gates, Generation Investment Management',
      'Revenue $150M ARR, growing 60% YoY',
      'Clear path to IPO within 18-24 months',
      'Addressing massive market: 600M Africans without electricity',
    ],
    aiModels: ['Bedrock Claude', 'SageMaker LSTM'],
    platformUrl: 'https://m-kopa.com/investors',
  },
  {
    id: 'cf3',
    companyName: 'Kobo360',
    platform: 'Seedrs',
    country: 'Nigeria',
    sector: 'Logistics Tech',
    type: 'EQUITY',
    minimumInvestment: 100,
    targetRaise: 2000000,
    currentRaise: 1680000,
    percentageRaised: 84.0,
    valuation: 28000000,
    investorsCount: 423,
    daysRemaining: 18,
    confidence: 81,
    expectedReturn: 200,
    timeHorizon: 1460, // 4 years
    riskLevel: 'HIGH',
    reasoning: [
      'Uber for freight - digitizing Africa logistics industry',
      'Operating in Nigeria, Kenya, Ghana, Togo, Uganda',
      'Revenue growing 120% YoY, $25M ARR',
      'Backed by Y Combinator, Goldman Sachs, IFC',
      'African logistics market worth $150B - highly fragmented',
      'Strong network effects with 10k+ trucks on platform',
    ],
    aiModels: ['Bedrock Claude', 'Comprehend'],
    platformUrl: 'https://www.seedrs.com/kobo360',
  },
  {
    id: 'cf4',
    companyName: 'Ripple Foods',
    platform: 'Wefunder',
    country: 'United States',
    sector: 'Plant-Based Foods',
    type: 'REGULATION CF',
    minimumInvestment: 100,
    targetRaise: 5000000,
    currentRaise: 4250000,
    percentageRaised: 85.0,
    valuation: 125000000,
    investorsCount: 3215,
    daysRemaining: 22,
    confidence: 83,
    expectedReturn: 180,
    timeHorizon: 1095, // 3 years
    riskLevel: 'MEDIUM-HIGH',
    reasoning: [
      'Pea protein milk alternative in Whole Foods, Target, Walmart',
      'Revenue $45M, growing 80% YoY',
      'Superior nutrition vs dairy (8g protein, 50% less sugar)',
      'Plant-based milk market growing 20% annually to $40B by 2026',
      'Clear acquisition target for big food companies',
    ],
    aiModels: ['Bedrock Claude', 'Forecast'],
    platformUrl: 'https://wefunder.com/ripplefoods',
  },
  {
    id: 'cf5',
    companyName: 'Sendy',
    platform: 'Direct Investment',
    country: 'Kenya',
    sector: 'Delivery Tech',
    type: 'SERIES B',
    minimumInvestment: 500,
    targetRaise: 20000000,
    currentRaise: 17500000,
    percentageRaised: 87.5,
    valuation: 180000000,
    investorsCount: 89,
    daysRemaining: 30,
    confidence: 88,
    expectedReturn: 250,
    timeHorizon: 912, // 2.5 years
    riskLevel: 'MEDIUM-HIGH',
    reasoning: [
      'Leading last-mile delivery platform in East Africa',
      'B2B focus serving Unilever, Diageo, Coca-Cola',
      'Revenue $35M ARR, growing 95% YoY, profitable in Kenya',
      'Expanding to Nigeria, Uganda, Ivory Coast',
      'Toyota Tsusho Corporation strategic investor',
      'African e-commerce growing 3x faster than global average',
    ],
    aiModels: ['Bedrock Claude', 'SageMaker LSTM', 'Forecast'],
    platformUrl: 'https://sendy.co.ke/investors',
  },
]

export default function SignalsPage() {
  const [selectedCountry, setSelectedCountry] = useState('All')
  const [confidenceFilter, setConfidenceFilter] = useState('high') // 'all' or 'high'
  const [typeFilter, setTypeFilter] = useState('all') // 'all', 'BUY', 'SELL'

  // Filter signals based on confidence (default >80%)
  let filteredSignals = confidenceFilter === 'high'
    ? allSignals.filter(s => s.confidence > 80)
    : allSignals

  // Filter by country
  if (selectedCountry !== 'All') {
    filteredSignals = filteredSignals.filter(s => s.country === selectedCountry)
  }

  // Filter by type
  if (typeFilter !== 'all') {
    filteredSignals = filteredSignals.filter(s => s.type === typeFilter)
  }

  // Get unique countries
  const countries = ['All', ...Array.from(new Set(allSignals.map(s => s.country)))]

  // Count by country (high confidence only)
  const countryStats = countries.slice(1).map(country => ({
    country,
    count: allSignals.filter(s => s.country === country && s.confidence > 80).length
  }))

  const buySignals = filteredSignals.filter(s => s.type === 'BUY')
  const sellSignals = filteredSignals.filter(s => s.type === 'SELL')
  const highConfidenceCount = allSignals.filter(s => s.confidence > 80).length

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Bot className="h-8 w-8 text-emerald-600" />
            AI Signals (High Confidence Only)
          </h1>
          <p className="text-gray-600 mt-1">
            Showing {highConfidenceCount} signals with &gt;80% confidence
          </p>
        </div>
        <div className="flex gap-2">
          <Badge variant="default">{buySignals.length} BUY</Badge>
          <Badge variant="destructive">{sellSignals.length} SELL</Badge>
        </div>
      </div>

      {/* Country Filter Tabs */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-emerald-600" />
            <CardTitle className="text-lg">Filter by Country/Market</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 flex-wrap">
            {countries.map((country) => {
              const stat = countryStats.find(s => s.country === country)
              return (
                <Button
                  key={country}
                  variant={selectedCountry === country ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCountry(country)}
                >
                  {country}
                  {stat && <Badge variant="secondary" className="ml-2">{stat.count}</Badge>}
                  {country === 'All' && <Badge variant="secondary" className="ml-2">{highConfidenceCount}</Badge>}
                </Button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Filter Bar */}
      <div className="flex gap-2 flex-wrap items-center">
        <span className="text-sm font-medium text-gray-600">Filters:</span>
        <Button
          variant={typeFilter === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setTypeFilter('all')}
        >
          All Signals
        </Button>
        <Button
          variant={typeFilter === 'BUY' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setTypeFilter('BUY')}
        >
          BUY Only
        </Button>
        <Button
          variant={typeFilter === 'SELL' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setTypeFilter('SELL')}
        >
          SELL Only
        </Button>
        <div className="h-4 w-px bg-gray-300 mx-2"></div>
        <Button
          variant={confidenceFilter === 'high' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setConfidenceFilter('high')}
        >
          High Confidence (&gt;80%)
        </Button>
        <Button
          variant={confidenceFilter === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setConfidenceFilter('all')}
        >
          All Confidence Levels
        </Button>
      </div>

      {/* Results Summary */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-gray-700">
          <span className="font-semibold">{filteredSignals.length} signals found</span>
          {selectedCountry !== 'All' && <span> in {selectedCountry}</span>}
          {confidenceFilter === 'high' && <span> with &gt;80% confidence</span>}
          {typeFilter !== 'all' && <span className="font-semibold"> • {typeFilter} signals only</span>}
        </p>
      </div>

      {/* Signals List - Grouped by Country */}
      {selectedCountry === 'All' ? (
        // Show grouped by country when "All" is selected
        countries.slice(1).map((country) => {
          const countrySignals = filteredSignals.filter(s => s.country === country)
          if (countrySignals.length === 0) return null

          return (
            <div key={country} className="space-y-4">
              <div className="flex items-center gap-3 border-b pb-2">
                <Globe className="h-5 w-5 text-emerald-600" />
                <h2 className="text-xl font-bold">{country}</h2>
                <Badge variant="secondary">{countrySignals.length} signals</Badge>
              </div>
              {countrySignals.map((signal) => (
                <SignalCard key={signal.id} signal={signal} />
              ))}
            </div>
          )
        })
      ) : (
        // Show flat list when specific country is selected
        <div className="space-y-4">
          {filteredSignals.map((signal) => (
            <SignalCard key={signal.id} signal={signal} />
          ))}
        </div>
      )}

      {/* No Results */}
      {filteredSignals.length === 0 && (
        <Card className="p-12 text-center">
          <p className="text-gray-600">No signals match your current filters</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              setSelectedCountry('All')
              setConfidenceFilter('high')
              setTypeFilter('all')
            }}
          >
            Reset Filters
          </Button>
        </Card>
      )}

      {/* Summary Card */}
      <Card className="bg-emerald-50 border-emerald-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg">Today's Signal Summary</h3>
              <p className="text-sm text-gray-600 mt-1">
                AI models analyzed {allSignals.length} opportunities ({highConfidenceCount} high confidence) with an average confidence of{' '}
                {Math.round(allSignals.reduce((acc, s) => acc + s.confidence, 0) / allSignals.length)}%
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Potential Portfolio Impact</p>
              <p className="text-2xl font-bold text-emerald-600">
                +{formatPercentage(12.5)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Crowdfunding & Early-Stage Opportunities Section */}
      <div className="border-t-4 border-purple-200 pt-8 mt-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <TrendingUp className="h-7 w-7 text-purple-600" />
              Early-Stage & Crowdfunding Opportunities
            </h2>
            <p className="text-gray-600 mt-1">
              High-growth potential investments from Crowdcube, Wefunder, Seedrs & private rounds
            </p>
          </div>
          <Badge variant="secondary" className="text-lg px-4 py-2">
            {crowdfundingOpportunities.length} Active
          </Badge>
        </div>

        {/* Risk Warning */}
        <Card className="bg-yellow-50 border-yellow-300 mb-6">
          <CardContent className="p-4">
            <p className="text-sm text-gray-800">
              <span className="font-semibold">⚠️ Higher Risk / Higher Reward:</span> Early-stage investments are illiquid and carry higher risk than public markets.
              Only invest what you can afford to lose. Potential returns 2-5x higher than public equities but with 5-10 year time horizons.
            </p>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {crowdfundingOpportunities.map((opportunity) => (
            <CrowdfundingCard key={opportunity.id} opportunity={opportunity} />
          ))}
        </div>
      </div>
    </div>
  )
}

// Signal Card Component
function SignalCard({ signal }: { signal: typeof allSignals[0] }) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <CardTitle className="text-2xl">{signal.ticker}</CardTitle>
              <Badge variant={signal.type === 'BUY' ? 'default' : signal.type === 'SELL' ? 'destructive' : 'secondary'}>
                {signal.type}
              </Badge>
              <Badge variant="outline">
                {signal.confidence}% Confidence
              </Badge>
              <Badge variant="secondary">
                {signal.market}
              </Badge>
              <Badge variant="outline">
                {signal.riskLevel}
              </Badge>
            </div>
            <CardDescription className="mt-2">{signal.companyName}</CardDescription>
            <p className="text-xs text-gray-500 mt-1">
              <Globe className="h-3 w-3 inline mr-1" />
              {signal.country}
            </p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold">
              {formatCurrency(signal.currentPrice)}
            </p>
            <p className="text-sm text-gray-600">
              Target: {formatCurrency(signal.targetPrice)}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Expected Return</p>
            <p className={`text-2xl font-semibold ${signal.expectedReturn >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
              {signal.expectedReturn > 0 ? '+' : ''}{signal.expectedReturn}%
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Time Horizon</p>
            <p className="text-2xl font-semibold">{signal.timeHorizon} days</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Position Size</p>
            <p className="text-2xl font-semibold text-sm">{signal.recommendedPosition}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Stop Loss</p>
            <p className="text-2xl font-semibold text-sm">
              {signal.stopLoss ? formatCurrency(signal.stopLoss) : 'N/A'}
            </p>
          </div>
        </div>

        {/* AI Reasoning */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="font-semibold mb-3 flex items-center gap-2">
            <Info className="h-4 w-4 text-blue-600" />
            AI Reasoning:
          </p>
          <ul className="space-y-2">
            {signal.reasoning.map((reason, i) => (
              <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                <span className="text-emerald-600 mt-0.5">✓</span>
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* AI Models Used */}
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-sm text-gray-600">AI Models:</p>
          {signal.aiModels.map((model) => (
            <Badge key={model} variant="secondary">{model}</Badge>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button className="flex-1">
            {signal.type === 'BUY' ? (
              <>
                <TrendingUp className="h-4 w-4 mr-2" />
                Execute Buy
              </>
            ) : signal.type === 'SELL' ? (
              <>
                <TrendingDown className="h-4 w-4 mr-2" />
                Execute Sell
              </>
            ) : (
              'Hold Position'
            )}
          </Button>
          <Button variant="outline">View Chart</Button>
          <Button variant="ghost">Ignore</Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Crowdfunding Card Component
function CrowdfundingCard({ opportunity }: { opportunity: typeof crowdfundingOpportunities[0] }) {
  const progressPercentage = (opportunity.currentRaise / opportunity.targetRaise) * 100

  return (
    <Card className="hover:shadow-lg transition-shadow border-purple-200">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <Badge variant="outline" className="bg-purple-50 border-purple-300 text-purple-700">
                {opportunity.platform}
              </Badge>
              <Badge variant="secondary">{opportunity.type}</Badge>
              <Badge variant="outline">{opportunity.country}</Badge>
              <Badge variant="secondary">{opportunity.sector}</Badge>
            </div>
            <CardTitle className="text-2xl mb-2">{opportunity.companyName}</CardTitle>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>{opportunity.investorsCount.toLocaleString()} investors</span>
              <span>•</span>
              <span className="font-semibold text-purple-600">{opportunity.daysRemaining} days left</span>
              <span>•</span>
              <span>Min: {formatCurrency(opportunity.minimumInvestment)}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">AI Confidence</p>
            <p className="text-3xl font-bold text-purple-600">{opportunity.confidence}%</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Funding Progress Bar */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium">Funding Progress</p>
            <p className="text-sm text-gray-600">
              {formatCurrency(opportunity.currentRaise)} / {formatCurrency(opportunity.targetRaise)}
            </p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-purple-600 h-3 rounded-full transition-all"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {opportunity.percentageRaised.toFixed(1)}% funded
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <p className="text-sm text-gray-600">Expected Return</p>
            <p className="text-2xl font-semibold text-purple-600">
              {opportunity.expectedReturn}%
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Time Horizon</p>
            <p className="text-2xl font-semibold">
              {Math.round(opportunity.timeHorizon / 365)}y
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Valuation</p>
            <p className="text-lg font-semibold">
              {formatCurrency(opportunity.valuation / 1000000)}M
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Risk Level</p>
            <p className="text-lg font-semibold text-orange-600">
              {opportunity.riskLevel}
            </p>
          </div>
        </div>

        {/* AI Reasoning */}
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <p className="font-semibold mb-3 flex items-center gap-2">
            <Info className="h-4 w-4 text-purple-600" />
            Investment Thesis:
          </p>
          <ul className="space-y-2">
            {opportunity.reasoning.map((reason, i) => (
              <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                <span className="text-purple-600 mt-0.5">✓</span>
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* AI Models Used */}
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-sm text-gray-600">AI Analysis:</p>
          {opportunity.aiModels.map((model) => (
            <Badge key={model} variant="secondary">{model}</Badge>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button
            className="flex-1 bg-purple-600 hover:bg-purple-700"
            onClick={() => window.open(opportunity.platformUrl, '_blank')}
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            View on {opportunity.platform}
          </Button>
          <Button variant="outline">Research</Button>
          <Button variant="ghost">Save</Button>
        </div>

        {/* Disclaimer */}
        <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
          <p className="text-xs text-gray-700">
            <span className="font-semibold">⚠️ Illiquid Investment:</span> Early-stage equity is typically locked for {Math.round(opportunity.timeHorizon / 365)} years.
            Capital at risk. This is not financial advice.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

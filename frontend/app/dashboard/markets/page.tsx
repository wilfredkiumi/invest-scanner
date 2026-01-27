'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Globe,
  TrendingUp,
  TrendingDown,
  Building2,
  Clock,
  DollarSign,
  ArrowRight,
  Star,
  BarChart3
} from 'lucide-react'

const markets = [
  {
    id: 'us',
    name: 'United States',
    flag: '🇺🇸',
    exchanges: ['NYSE', 'NASDAQ'],
    currency: 'USD',
    timezone: 'EST/EDT',
    tradingHours: '9:30 AM - 4:00 PM',
    status: 'open',
    indices: [
      { name: 'S&P 500', value: '5,234.18', change: '+0.82%', positive: true },
      { name: 'NASDAQ', value: '16,428.82', change: '+1.24%', positive: true },
      { name: 'Dow Jones', value: '39,512.84', change: '+0.45%', positive: true },
    ],
    topOpportunities: [
      { ticker: 'NVDA', name: 'NVIDIA Corp', signal: 'BUY', confidence: 92, price: '$875.28' },
      { ticker: 'SCHD', name: 'Schwab US Dividend ETF', signal: 'BUY', confidence: 88, price: '$81.45' },
      { ticker: 'GOOGL', name: 'Alphabet Inc', signal: 'BUY', confidence: 85, price: '$178.92' },
    ],
    totalStocks: 6000,
    activeSignals: 24,
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    flag: '🇬🇧',
    exchanges: ['LSE'],
    currency: 'GBP',
    timezone: 'GMT/BST',
    tradingHours: '8:00 AM - 4:30 PM',
    status: 'closed',
    indices: [
      { name: 'FTSE 100', value: '8,245.37', change: '-0.32%', positive: false },
      { name: 'FTSE 250', value: '20,892.45', change: '+0.18%', positive: true },
    ],
    topOpportunities: [
      { ticker: 'ULVR', name: 'Unilever PLC', signal: 'BUY', confidence: 86, price: '£42.85' },
      { ticker: 'BATS', name: 'British American Tobacco', signal: 'HOLD', confidence: 72, price: '£24.12' },
    ],
    totalStocks: 2000,
    activeSignals: 8,
  },
  {
    id: 'kenya',
    name: 'Kenya',
    flag: '🇰🇪',
    exchanges: ['NSE'],
    currency: 'KES',
    timezone: 'EAT',
    tradingHours: '9:00 AM - 3:00 PM',
    status: 'closed',
    indices: [
      { name: 'NSE 20', value: '1,642.28', change: '+1.85%', positive: true },
      { name: 'NSE All Share', value: '108.45', change: '+2.12%', positive: true },
    ],
    topOpportunities: [
      { ticker: 'SCOM', name: 'Safaricom PLC', signal: 'BUY', confidence: 91, price: 'KSh 28.50' },
      { ticker: 'EQTY', name: 'Equity Group Holdings', signal: 'BUY', confidence: 89, price: 'KSh 42.75' },
      { ticker: 'KCB', name: 'KCB Group PLC', signal: 'BUY', confidence: 87, price: 'KSh 32.40' },
    ],
    totalStocks: 65,
    activeSignals: 12,
    featured: true,
  },
  {
    id: 'nigeria',
    name: 'Nigeria',
    flag: '🇳🇬',
    exchanges: ['NGX'],
    currency: 'NGN',
    timezone: 'WAT',
    tradingHours: '10:00 AM - 2:30 PM',
    status: 'closed',
    indices: [
      { name: 'NGX All Share', value: '98,234.56', change: '+0.94%', positive: true },
      { name: 'NGX 30', value: '2,845.32', change: '+1.02%', positive: true },
    ],
    topOpportunities: [
      { ticker: 'DANGCEM', name: 'Dangote Cement', signal: 'BUY', confidence: 84, price: '₦542.00' },
      { ticker: 'MTNN', name: 'MTN Nigeria', signal: 'BUY', confidence: 82, price: '₦285.50' },
    ],
    totalStocks: 150,
    activeSignals: 6,
  },
  {
    id: 'south-africa',
    name: 'South Africa',
    flag: '🇿🇦',
    exchanges: ['JSE'],
    currency: 'ZAR',
    timezone: 'SAST',
    tradingHours: '9:00 AM - 5:00 PM',
    status: 'closed',
    indices: [
      { name: 'JSE Top 40', value: '72,458.92', change: '+0.65%', positive: true },
      { name: 'JSE All Share', value: '78,234.18', change: '+0.58%', positive: true },
    ],
    topOpportunities: [
      { ticker: 'NPN', name: 'Naspers Ltd', signal: 'BUY', confidence: 83, price: 'R3,245.00' },
      { ticker: 'SOL', name: 'Sasol Ltd', signal: 'HOLD', confidence: 71, price: 'R285.40' },
    ],
    totalStocks: 350,
    activeSignals: 5,
    comingSoon: true,
  },
]

export default function MarketsPage() {
  const [selectedRegion, setSelectedRegion] = useState<string>('all')

  const regions = [
    { id: 'all', name: 'All Markets' },
    { id: 'americas', name: 'Americas' },
    { id: 'europe', name: 'Europe' },
    { id: 'africa', name: 'Africa' },
  ]

  const filteredMarkets = markets.filter(market => {
    if (selectedRegion === 'all') return true
    if (selectedRegion === 'americas') return market.id === 'us'
    if (selectedRegion === 'europe') return market.id === 'uk'
    if (selectedRegion === 'africa') return ['kenya', 'nigeria', 'south-africa'].includes(market.id)
    return true
  })

  const totalSignals = markets.reduce((acc, m) => acc + m.activeSignals, 0)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Globe className="h-8 w-8 text-emerald-600" />
            Markets
          </h1>
          <p className="text-gray-600 mt-1">
            Explore investment opportunities across global exchanges
          </p>
        </div>
        <div className="flex gap-2">
          {regions.map(region => (
            <Button
              key={region.id}
              variant={selectedRegion === region.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedRegion(region.id)}
            >
              {region.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{markets.length}</div>
            <p className="text-sm text-gray-600">Markets Available</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{totalSignals}</div>
            <p className="text-sm text-gray-600">Active Signals</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-emerald-600">8,500+</div>
            <p className="text-sm text-gray-600">Stocks Tracked</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">5</div>
            <p className="text-sm text-gray-600">Currencies Supported</p>
          </CardContent>
        </Card>
      </div>

      {/* Markets Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredMarkets.map((market) => (
          <Card key={market.id} className={`relative overflow-hidden ${market.featured ? 'ring-2 ring-emerald-500' : ''} ${market.comingSoon ? 'opacity-75' : ''}`}>
            {market.featured && (
              <div className="absolute top-0 right-0 bg-emerald-500 text-white text-xs px-2 py-1 rounded-bl-lg flex items-center gap-1">
                <Star className="h-3 w-3" /> Featured
              </div>
            )}
            {market.comingSoon && (
              <div className="absolute top-0 right-0 bg-gray-500 text-white text-xs px-2 py-1 rounded-bl-lg">
                Coming Soon
              </div>
            )}

            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{market.flag}</span>
                  <div>
                    <CardTitle className="text-lg">{market.name}</CardTitle>
                    <CardDescription>{market.exchanges.join(', ')}</CardDescription>
                  </div>
                </div>
                <Badge variant={market.status === 'open' ? 'default' : 'secondary'}>
                  {market.status === 'open' ? 'Open' : 'Closed'}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Market Info */}
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <DollarSign className="h-4 w-4" />
                  {market.currency}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="h-4 w-4" />
                  {market.timezone}
                </div>
              </div>

              {/* Indices */}
              <div className="space-y-2">
                <p className="text-xs font-medium text-gray-500 uppercase">Indices</p>
                {market.indices.map((index) => (
                  <div key={index.name} className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">{index.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{index.value}</span>
                      <span className={`flex items-center ${index.positive ? 'text-emerald-600' : 'text-red-600'}`}>
                        {index.positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                        {index.change}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Top Opportunities */}
              <div className="space-y-2">
                <p className="text-xs font-medium text-gray-500 uppercase">Top Opportunities</p>
                {market.topOpportunities.slice(0, 2).map((opp) => (
                  <Link
                    key={opp.ticker}
                    href={`/dashboard/stock/${opp.ticker}`}
                    className="flex items-center justify-between text-sm p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div>
                      <span className="font-medium">{opp.ticker}</span>
                      <span className="text-gray-500 ml-2 text-xs">{opp.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={opp.signal === 'BUY' ? 'default' : 'secondary'} className="text-xs">
                        {opp.signal}
                      </Badge>
                      <span className="text-xs text-gray-500">{opp.confidence}%</span>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between pt-2 border-t text-sm">
                <div className="flex items-center gap-1 text-gray-600">
                  <Building2 className="h-4 w-4" />
                  {market.totalStocks.toLocaleString()} stocks
                </div>
                <div className="flex items-center gap-1 text-emerald-600 font-medium">
                  <BarChart3 className="h-4 w-4" />
                  {market.activeSignals} signals
                </div>
              </div>

              {/* Action Button */}
              {!market.comingSoon && (
                <Link href={`/dashboard/signals?country=${encodeURIComponent(market.name)}`}>
                  <Button variant="outline" className="w-full gap-2">
                    View All Signals
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* African Markets Highlight */}
      <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">🌍</span>
            African Markets Focus
          </CardTitle>
          <CardDescription>
            Discover high-growth opportunities in Africa&apos;s emerging markets
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-sm text-gray-600">Avg. Dividend Yield</p>
              <p className="text-2xl font-bold text-emerald-600">7.2%</p>
              <p className="text-xs text-gray-500">vs 2.1% US average</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-sm text-gray-600">YTD Performance</p>
              <p className="text-2xl font-bold text-emerald-600">+18.5%</p>
              <p className="text-xs text-gray-500">NSE 20 Index</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-sm text-gray-600">AI Signal Success</p>
              <p className="text-2xl font-bold text-emerald-600">87%</p>
              <p className="text-xs text-gray-500">Last 6 months</p>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <Link href="/dashboard/signals?country=Kenya">
              <Button className="gap-2">
                🇰🇪 Kenya Signals
              </Button>
            </Link>
            <Link href="/dashboard/signals?country=Nigeria">
              <Button variant="outline" className="gap-2">
                🇳🇬 Nigeria Signals
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Briefcase, TrendingUp, TrendingDown, Plus, Download } from 'lucide-react'
import { formatCurrency, formatPercentage, formatDate } from '@/lib/utils'

const holdings = [
  {
    id: '1',
    ticker: 'NVDA',
    name: 'NVIDIA Corporation',
    market: 'US',
    quantity: 15,
    avgPrice: 720.50,
    currentPrice: 875.40,
    totalValue: 13131,
    totalCost: 10807.50,
    gainLoss: 2323.50,
    gainLossPercentage: 21.5,
    purchaseDate: '2024-03-15',
    lastUpdated: new Date(),
  },
  {
    id: '2',
    ticker: 'SCOM.NB',
    name: 'Safaricom PLC',
    market: 'NSE',
    quantity: 150,
    avgPrice: 11.20,
    currentPrice: 12.50,
    totalValue: 1875,
    totalCost: 1680,
    gainLoss: 195,
    gainLossPercentage: 11.6,
    purchaseDate: '2024-04-01',
    lastUpdated: new Date(),
  },
  {
    id: '3',
    ticker: 'SCHD',
    name: 'Schwab US Dividend Equity ETF',
    market: 'US',
    quantity: 10,
    avgPrice: 76.20,
    currentPrice: 78.45,
    totalValue: 784.50,
    totalCost: 762,
    gainLoss: 22.50,
    gainLossPercentage: 2.95,
    purchaseDate: '2024-05-10',
    lastUpdated: new Date(),
  },
  {
    id: '4',
    ticker: 'KCB.NB',
    name: 'KCB Group Holdings',
    market: 'NSE',
    quantity: 200,
    avgPrice: 2.15,
    currentPrice: 2.35,
    totalValue: 470,
    totalCost: 430,
    gainLoss: 40,
    gainLossPercentage: 9.3,
    purchaseDate: '2024-05-20',
    lastUpdated: new Date(),
  },
]

const portfolioSummary = {
  totalValue: 16260.50,
  totalCost: 13679.50,
  totalGainLoss: 2581,
  totalGainLossPercentage: 18.87,
  cashBalance: 234.50,
  numberOfHoldings: holdings.length,
}

const allocationByMarket = [
  { market: 'US Stocks', value: 13915.50, percentage: 85.6 },
  { market: 'Kenya NSE', value: 2345, percentage: 14.4 },
]

const allocationByType = [
  { type: 'Growth Stocks', value: 13131, percentage: 80.8 },
  { type: 'Dividend ETFs', value: 784.50, percentage: 4.8 },
  { type: 'Value Stocks', value: 2345, percentage: 14.4 },
]

export default function PortfolioPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Briefcase className="h-8 w-8 text-emerald-600" />
            Portfolio
          </h1>
          <p className="text-gray-600 mt-1">
            Track your investments and performance
          </p>
        </div>
        <div className="flex gap-2">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Position
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Total Value</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{formatCurrency(portfolioSummary.totalValue)}</p>
            <p className="text-sm text-emerald-600 mt-1">
              +{formatPercentage(portfolioSummary.totalGainLossPercentage)} all time
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Total Profit</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-emerald-600">
              {formatCurrency(portfolioSummary.totalGainLoss)}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              From {formatCurrency(portfolioSummary.totalCost)} invested
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Holdings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{portfolioSummary.numberOfHoldings}</p>
            <p className="text-sm text-gray-600 mt-1">Active positions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Cash</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{formatCurrency(portfolioSummary.cashBalance)}</p>
            <p className="text-sm text-gray-600 mt-1">Available to invest</p>
          </CardContent>
        </Card>
      </div>

      {/* Allocation */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Allocation by Market</CardTitle>
            <CardDescription>Geographic distribution</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {allocationByMarket.map((item) => (
              <div key={item.market}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{item.market}</span>
                  <span className="text-sm text-gray-600">
                    {formatCurrency(item.value)} ({item.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-emerald-600 h-2 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Allocation by Type</CardTitle>
            <CardDescription>Investment style distribution</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {allocationByType.map((item) => (
              <div key={item.type}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{item.type}</span>
                  <span className="text-sm text-gray-600">
                    {formatCurrency(item.value)} ({item.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Holdings Table */}
      <Card>
        <CardHeader>
          <CardTitle>Your Holdings</CardTitle>
          <CardDescription>Current positions and performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {holdings.map((holding) => (
              <div
                key={holding.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-lg">{holding.ticker}</p>
                    <Badge variant="secondary">{holding.market}</Badge>
                  </div>
                  <p className="text-sm text-gray-600">{holding.name}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                    <span>{holding.quantity} shares @ {formatCurrency(holding.avgPrice)}</span>
                    <span>•</span>
                    <span>Bought {formatDate(holding.purchaseDate)}</span>
                  </div>
                </div>

                <div className="text-center px-6">
                  <p className="text-sm text-gray-600">Current Price</p>
                  <p className="text-lg font-semibold">{formatCurrency(holding.currentPrice)}</p>
                </div>

                <div className="text-center px-6">
                  <p className="text-sm text-gray-600">Total Value</p>
                  <p className="text-lg font-semibold">{formatCurrency(holding.totalValue)}</p>
                </div>

                <div className="text-right">
                  <p className="text-sm text-gray-600">Gain/Loss</p>
                  <p className={`text-lg font-semibold ${holding.gainLoss >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                    {formatCurrency(holding.gainLoss)}
                  </p>
                  <p className={`text-sm ${holding.gainLoss >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                    {formatPercentage(holding.gainLossPercentage)}
                  </p>
                </div>

                <div className="flex gap-2 ml-4">
                  <Button variant="outline" size="sm">Trade</Button>
                  <Button variant="ghost" size="sm">Details</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

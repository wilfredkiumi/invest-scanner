'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ListTodo, Plus, Search, TrendingUp, TrendingDown, Star } from 'lucide-react'
import { formatCurrency, formatPercentage } from '@/lib/utils'

const watchlist = [
  {
    id: '1',
    ticker: 'AAPL',
    name: 'Apple Inc',
    market: 'US',
    currentPrice: 178.50,
    change24h: 2.45,
    change24hPercentage: 1.39,
    lastSignalScore: 72,
    lastSignalType: 'HOLD',
    addedDate: '2024-06-01',
  },
  {
    id: '2',
    ticker: 'MSFT',
    name: 'Microsoft Corporation',
    market: 'US',
    currentPrice: 425.30,
    change24h: -3.20,
    change24hPercentage: -0.75,
    lastSignalScore: 85,
    lastSignalType: 'BUY',
    addedDate: '2024-05-15',
  },
  {
    id: '3',
    ticker: 'EQTY.NB',
    name: 'Equity Group Holdings',
    market: 'NSE',
    currentPrice: 3.25,
    change24h: 0.15,
    change24hPercentage: 4.84,
    lastSignalScore: 78,
    lastSignalType: 'BUY',
    addedDate: '2024-06-10',
  },
  {
    id: '4',
    ticker: 'EABL.NB',
    name: 'East African Breweries',
    market: 'NSE',
    currentPrice: 18.50,
    change24h: 0.50,
    change24hPercentage: 2.78,
    lastSignalScore: 68,
    lastSignalType: 'HOLD',
    addedDate: '2024-05-28',
  },
  {
    id: '5',
    ticker: 'VYM',
    name: 'Vanguard High Dividend Yield ETF',
    market: 'US',
    currentPrice: 112.80,
    change24h: 0.90,
    change24hPercentage: 0.80,
    lastSignalScore: 88,
    lastSignalType: 'BUY',
    addedDate: '2024-06-05',
  },
]

export default function WatchlistPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <ListTodo className="h-8 w-8 text-emerald-600" />
            Watchlist
          </h1>
          <p className="text-gray-600 mt-1">
            Track stocks you're interested in
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Stock
        </Button>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2">
            <Search className="h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by ticker or company name..."
              className="flex-1 outline-none text-lg"
            />
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Watching
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{watchlist.length}</p>
            <p className="text-sm text-gray-600 mt-1">stocks and ETFs</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              Buy Signals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-emerald-600">
              {watchlist.filter(s => s.lastSignalType === 'BUY').length}
            </p>
            <p className="text-sm text-gray-600 mt-1">opportunities detected</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              Avg AI Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {Math.round(watchlist.reduce((acc, s) => acc + s.lastSignalScore, 0) / watchlist.length)}
            </p>
            <p className="text-sm text-gray-600 mt-1">confidence level</p>
          </CardContent>
        </Card>
      </div>

      {/* Watchlist Items */}
      <Card>
        <CardHeader>
          <CardTitle>Your Watchlist</CardTitle>
          <CardDescription>Stocks you're tracking</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {watchlist.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-lg">{item.ticker}</p>
                      <Badge variant="secondary">{item.market}</Badge>
                      {item.lastSignalType === 'BUY' && (
                        <Badge variant="default">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          BUY Signal
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{item.name}</p>
                  </div>
                </div>

                <div className="text-center px-6">
                  <p className="text-lg font-semibold">{formatCurrency(item.currentPrice)}</p>
                  <p className={`text-sm ${item.change24h >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                    {formatPercentage(item.change24hPercentage)}
                  </p>
                </div>

                <div className="text-center px-6">
                  <p className="text-sm text-gray-600">AI Score</p>
                  <p className="text-lg font-semibold">{item.lastSignalScore}/100</p>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">View</Button>
                  <Button variant="ghost" size="sm">Remove</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle>Recommended to Watch</CardTitle>
          <CardDescription>Based on your portfolio and preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-3">
            {['GOOGL', 'BAMB.NB', 'DVY'].map((ticker) => (
              <div key={ticker} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                <p className="font-semibold">{ticker}</p>
                <Button size="sm" variant="outline">
                  <Plus className="h-3 w-3 mr-1" />
                  Add
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'
import { formatCurrency } from '@/lib/utils'

// Mock historical price data for different stocks
const priceData: Record<string, any[]> = {
  'NVDA': [
    { date: 'Jan 1', price: 495.22, volume: 42000000 },
    { date: 'Jan 15', price: 520.45, volume: 48000000 },
    { date: 'Feb 1', price: 615.30, volume: 52000000 },
    { date: 'Feb 15', price: 695.50, volume: 55000000 },
    { date: 'Mar 1', price: 730.15, volume: 51000000 },
    { date: 'Mar 15', price: 785.40, volume: 49000000 },
    { date: 'Apr 1', price: 820.55, volume: 46000000 },
    { date: 'Apr 15', price: 795.20, volume: 44000000 },
    { date: 'May 1', price: 845.75, volume: 47000000 },
    { date: 'May 15', price: 862.15, volume: 45000000 },
    { date: 'Jun 1', price: 870.30, volume: 43000000 },
    { date: 'Jun 15', price: 875.40, volume: 45000000 },
  ],
  'SCOM.NB': [
    { date: 'Jan 1', price: 10.20, volume: 6500000 },
    { date: 'Jan 15', price: 10.45, volume: 7200000 },
    { date: 'Feb 1', price: 10.80, volume: 7500000 },
    { date: 'Feb 15', price: 11.10, volume: 6800000 },
    { date: 'Mar 1', price: 10.95, volume: 7100000 },
    { date: 'Mar 15', price: 11.30, volume: 7400000 },
    { date: 'Apr 1', price: 11.65, volume: 7800000 },
    { date: 'Apr 15', price: 11.85, volume: 8200000 },
    { date: 'May 1', price: 12.10, volume: 7600000 },
    { date: 'May 15', price: 12.20, volume: 7200000 },
    { date: 'Jun 1', price: 12.35, volume: 7900000 },
    { date: 'Jun 15', price: 12.50, volume: 8500000 },
  ],
  'MSFT': [
    { date: 'Jan 1', price: 370.73, volume: 22000000 },
    { date: 'Jan 15', price: 385.50, volume: 24000000 },
    { date: 'Feb 1', price: 395.25, volume: 23500000 },
    { date: 'Feb 15', price: 402.80, volume: 25000000 },
    { date: 'Mar 1', price: 410.15, volume: 24500000 },
    { date: 'Mar 15', price: 415.90, volume: 23000000 },
    { date: 'Apr 1', price: 420.45, volume: 24200000 },
    { date: 'Apr 15', price: 408.30, volume: 26000000 },
    { date: 'May 1', price: 418.55, volume: 24800000 },
    { date: 'May 15', price: 421.80, volume: 23500000 },
    { date: 'Jun 1', price: 423.10, volume: 24000000 },
    { date: 'Jun 15', price: 425.30, volume: 22450000 },
  ],
}

export function StockPriceChart({ ticker }: { ticker: string }) {
  const data = priceData[ticker] || priceData['NVDA']

  return (
    <div className="space-y-4">
      {/* Price Chart */}
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="date"
            stroke="#6b7280"
            tick={{ fontSize: 12 }}
          />
          <YAxis
            stroke="#6b7280"
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `$${value.toFixed(0)}`}
            domain={['dataMin - 20', 'dataMax + 20']}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '12px'
            }}
            formatter={(value: number) => [formatCurrency(value), 'Price']}
            labelStyle={{ fontWeight: 'bold', marginBottom: '4px' }}
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke="#10b981"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorPrice)"
            activeDot={{ r: 6, fill: '#10b981' }}
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Volume Chart */}
      <ResponsiveContainer width="100%" height={120}>
        <AreaChart data={data} margin={{ top: 0, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.6}/>
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="date"
            stroke="#6b7280"
            tick={{ fontSize: 10 }}
          />
          <YAxis
            stroke="#6b7280"
            tick={{ fontSize: 10 }}
            tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '8px'
            }}
            formatter={(value: number) => [`${(value / 1000000).toFixed(1)}M`, 'Volume']}
            labelStyle={{ fontWeight: 'bold', fontSize: '11px' }}
          />
          <Area
            type="monotone"
            dataKey="volume"
            stroke="#6366f1"
            strokeWidth={1}
            fillOpacity={1}
            fill="url(#colorVolume)"
          />
        </AreaChart>
      </ResponsiveContainer>

      <div className="text-xs text-gray-500 text-center">
        Volume shown in millions of shares traded
      </div>
    </div>
  )
}

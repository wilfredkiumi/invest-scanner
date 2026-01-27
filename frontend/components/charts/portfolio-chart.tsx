'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import { formatCurrency } from '@/lib/utils'

// Enhanced data showing journey from £10k to current £15,234 with projection to £100k
const data = [
  { date: 'Jan 1', value: 10000, target: 100000 },
  { date: 'Jan 15', value: 10450, target: 100000 },
  { date: 'Feb 1', value: 11200, target: 100000 },
  { date: 'Feb 15', value: 10950, target: 100000 },
  { date: 'Mar 1', value: 10800, target: 100000 },
  { date: 'Mar 15', value: 11600, target: 100000 },
  { date: 'Apr 1', value: 12500, target: 100000 },
  { date: 'Apr 15', value: 12200, target: 100000 },
  { date: 'May 1', value: 13800, target: 100000 },
  { date: 'May 15', value: 14100, target: 100000 },
  { date: 'Jun 1', value: 14800, target: 100000 },
  { date: 'Jun 15', value: 15234, target: 100000 },
  // Projected future values (dotted line)
  { date: 'Jul 1', value: null, projected: 16800, target: 100000 },
  { date: 'Aug 1', value: null, projected: 19200, target: 100000 },
  { date: 'Sep 1', value: null, projected: 22500, target: 100000 },
  { date: 'Oct 1', value: null, projected: 26800, target: 100000 },
  { date: 'Nov 1', value: null, projected: 32400, target: 100000 },
  { date: 'Dec 1', value: null, projected: 40000, target: 100000 },
]

export function PortfolioChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis
          dataKey="date"
          stroke="#6b7280"
          tick={{ fontSize: 12 }}
        />
        <YAxis
          stroke="#6b7280"
          tick={{ fontSize: 12 }}
          tickFormatter={(value) => `£${(value / 1000).toFixed(0)}k`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            padding: '12px'
          }}
          formatter={(value: number | undefined) => [value ? formatCurrency(value) : '', 'Portfolio Value']}
          labelStyle={{ fontWeight: 'bold', marginBottom: '4px' }}
        />

        {/* Target line at £100k */}
        <ReferenceLine
          y={100000}
          stroke="#10b981"
          strokeDasharray="5 5"
          label={{ value: 'Target: £100k', fill: '#10b981', fontSize: 12, position: 'insideTopRight' }}
        />

        {/* Starting value line */}
        <ReferenceLine
          y={10000}
          stroke="#9ca3af"
          strokeDasharray="3 3"
          label={{ value: 'Start: £10k', fill: '#9ca3af', fontSize: 12, position: 'insideBottomLeft' }}
        />

        {/* Actual portfolio value (solid line) */}
        <Line
          type="monotone"
          dataKey="value"
          stroke="#10b981"
          strokeWidth={3}
          dot={false}
          activeDot={{ r: 6, fill: '#10b981' }}
        />

        {/* Projected path (dotted line) */}
        <Line
          type="monotone"
          dataKey="projected"
          stroke="#10b981"
          strokeWidth={2}
          strokeDasharray="5 5"
          dot={false}
          opacity={0.6}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

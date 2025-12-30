'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { date: 'Jan', value: 10000 },
  { date: 'Feb', value: 11200 },
  { date: 'Mar', value: 10800 },
  { date: 'Apr', value: 12500 },
  { date: 'May', value: 13800 },
  { date: 'Jun', value: 15234 },
]

export function PortfolioChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip formatter={(value) => `£${value.toLocaleString()}`} />
        <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  )
}

'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, TrendingDown, DollarSign, Target, Activity } from 'lucide-react'
import { formatCurrency, formatPercentage } from '@/lib/utils'
import { PortfolioChart } from '@/components/charts/portfolio-chart'
import { RecentSignals } from '@/components/recent-signals'

// Mock data - will be replaced with real API calls
const portfolioData = {
  totalValue: 15234,
  initialInvestment: 10000,
  totalGainLoss: 5234,
  gainLossPercentage: 52.34,
  dayChange: 234,
  dayChangePercentage: 1.56,
  targetValue: 100000,
  progressToTarget: 15.23,
  daysRemaining: 274,
}

const stats = [
  {
    name: 'Portfolio Value',
    value: formatCurrency(portfolioData.totalValue),
    change: formatPercentage(portfolioData.gainLossPercentage),
    icon: DollarSign,
    positive: portfolioData.gainLossPercentage > 0,
  },
  {
    name: '24h Change',
    value: formatCurrency(portfolioData.dayChange),
    change: formatPercentage(portfolioData.dayChangePercentage),
    icon: TrendingUp,
    positive: portfolioData.dayChangePercentage > 0,
  },
  {
    name: 'Target Progress',
    value: `${portfolioData.progressToTarget.toFixed(1)}%`,
    change: `${portfolioData.daysRemaining} days left`,
    icon: Target,
    positive: true,
  },
  {
    name: 'AI Signals Today',
    value: '3',
    change: '2 BUY, 1 SELL',
    icon: Activity,
    positive: true,
  },
]

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's your portfolio overview.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.name}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${stat.positive ? 'text-emerald-600' : 'text-red-600'}`}>
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Portfolio Performance Chart - Full Width */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Portfolio Performance: £10k → £100k Journey</CardTitle>
              <CardDescription>Your investment growth over time with AI projection</CardDescription>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Total Gain</p>
              <p className="text-2xl font-bold text-emerald-600">
                +{formatPercentage(portfolioData.gainLossPercentage)}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <PortfolioChart />
          <div className="mt-4 grid grid-cols-3 gap-4 text-center border-t pt-4">
            <div>
              <p className="text-sm text-gray-600">Starting Value</p>
              <p className="text-lg font-semibold">{formatCurrency(portfolioData.initialInvestment)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Current Value</p>
              <p className="text-lg font-semibold text-emerald-600">{formatCurrency(portfolioData.totalValue)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Target Value</p>
              <p className="text-lg font-semibold text-emerald-600">{formatCurrency(portfolioData.targetValue)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent AI Signals */}
      <Card>
        <CardHeader>
          <CardTitle>Recent AI Signals</CardTitle>
          <CardDescription>Latest buy/sell recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <RecentSignals />
        </CardContent>
      </Card>

      {/* Goal Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Goal: £10k → £100k in 12 Months</CardTitle>
          <CardDescription>Track your progress to 10x growth</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current Value</p>
                <p className="text-2xl font-bold">{formatCurrency(portfolioData.totalValue)}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Target Value</p>
                <p className="text-2xl font-bold">{formatCurrency(portfolioData.targetValue)}</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-emerald-600 h-4 rounded-full transition-all"
                style={{ width: `${portfolioData.progressToTarget}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {formatCurrency(portfolioData.totalGainLoss)} profit
              </span>
              <span className="font-medium text-emerald-600">
                {formatCurrency(portfolioData.targetValue - portfolioData.totalValue)} to go
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

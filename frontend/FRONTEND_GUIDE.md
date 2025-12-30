# 🎨 Frontend Implementation Guide

This guide contains all the remaining pages and components to complete your Investment Scanner frontend.

## ✅ What's Already Created

- ✅ Next.js 14 with TypeScript setup
- ✅ Tailwind CSS configured
- ✅ AWS Amplify + Cognito integration
- ✅ Navigation component
- ✅ Dashboard layout
- ✅ Main dashboard page
- ✅ UI components (Button, Card)
- ✅ Utility functions

## 🔄 To Create

### 1. Chart Components

Create `components/charts/portfolio-chart.tsx`:

```typescript
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
```

### 2. Recent Signals Component

Create `components/recent-signals.tsx`:

```typescript
'use client'

import { ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { Button } from './ui/button'

const signals = [
  {
    ticker: 'NVDA',
    type: 'BUY',
    confidence: 94,
    price: 875.40,
    target: 1050,
    return: 20,
  },
  {
    ticker: 'SCOM.NB',
    type: 'BUY',
    confidence: 88,
    price: 12.50,
    target: 15.20,
    return: 21.6,
  },
  {
    ticker: 'TSLA',
    type: 'SELL',
    confidence: 78,
    price: 645,
    target: 580,
    return: -10,
  },
]

export function RecentSignals() {
  return (
    <div className="space-y-4">
      {signals.map((signal) => (
        <div key={signal.ticker} className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center gap-3">
            {signal.type === 'BUY' ? (
              <ArrowUpRight className="h-5 w-5 text-emerald-600" />
            ) : (
              <ArrowDownRight className="h-5 w-5 text-red-600" />
            )}
            <div>
              <p className="font-semibold">{signal.ticker}</p>
              <p className="text-sm text-muted-foreground">
                {signal.confidence}% confidence
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className={`font-semibold ${signal.type === 'BUY' ? 'text-emerald-600' : 'text-red-600'}`}>
              {signal.type}
            </p>
            <p className="text-sm text-muted-foreground">
              +{signal.return}% expected
            </p>
          </div>
        </div>
      ))}
      <Button className="w-full" variant="outline">
        View All Signals
      </Button>
    </div>
  )
}
```

### 3. AI Signals Page

Create `app/dashboard/signals/page.tsx`:

```typescript
'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Bot, TrendingUp, TrendingDown, Info } from 'lucide-react'

const signals = [
  {
    id: '1',
    ticker: 'NVDA',
    companyName: 'NVIDIA Corporation',
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
      'Forecast predicts continued growth',
    ],
    aiModels: ['Bedrock Claude', 'SageMaker', 'Forecast'],
  },
  // Add more signals...
]

export default function SignalsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Bot className="h-8 w-8 text-emerald-600" />
          AI Signals
        </h1>
        <p className="text-muted-foreground">
          AI-powered buy/sell recommendations with confidence scores
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex gap-2">
        <Button variant="outline" size="sm">All Signals</Button>
        <Button variant="outline" size="sm">BUY Only</Button>
        <Button variant="outline" size="sm">SELL Only</Button>
        <Button variant="outline" size="sm">High Confidence (>80%)</Button>
      </div>

      {/* Signals List */}
      <div className="space-y-4">
        {signals.map((signal) => (
          <Card key={signal.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {signal.ticker}
                    <Badge variant={signal.type === 'BUY' ? 'default' : 'destructive'}>
                      {signal.type}
                    </Badge>
                    <Badge variant="outline">
                      {signal.confidence}% Confidence
                    </Badge>
                  </CardTitle>
                  <CardDescription>{signal.companyName}</CardDescription>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">
                    £{signal.currentPrice.toFixed(2)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Target: £{signal.targetPrice}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm text-muted-foreground">Expected Return</p>
                  <p className="text-lg font-semibold text-emerald-600">
                    +{signal.expectedReturn}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Time Horizon</p>
                  <p className="text-lg font-semibold">{signal.timeHorizon} days</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Risk Level</p>
                  <p className="text-lg font-semibold">{signal.riskLevel}</p>
                </div>
              </div>

              {/* AI Reasoning */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold mb-2 flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  AI Reasoning:
                </p>
                <ul className="space-y-1">
                  {signal.reasoning.map((reason, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-emerald-600">✓</span>
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>

              {/* AI Models Used */}
              <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground">AI Models:</p>
                {signal.aiModels.map((model) => (
                  <Badge key={model} variant="secondary">{model}</Badge>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button className="flex-1">Execute Trade</Button>
                <Button variant="outline">View Details</Button>
                <Button variant="ghost">Ignore</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
```

### 4. Portfolio Page

Create `app/dashboard/portfolio/page.tsx`:

```typescript
'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { formatCurrency, formatPercentage } from '@/lib/utils'

const holdings = [
  {
    ticker: 'NVDA',
    name: 'NVIDIA Corporation',
    quantity: 15,
    avgPrice: 720.50,
    currentPrice: 875.40,
    totalValue: 13131,
    gainLoss: 2323.50,
    gainLossPercentage: 21.5,
  },
  {
    ticker: 'SCOM.NB',
    name: 'Safaricom PLC',
    quantity: 150,
    avgPrice: 11.20,
    currentPrice: 12.50,
    totalValue: 1875,
    gainLoss: 195,
    gainLossPercentage: 11.6,
  },
  // Add more holdings...
]

export default function PortfolioPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Portfolio</h1>
          <p className="text-muted-foreground">Track your investments and performance</p>
        </div>
        <Button>Add Position</Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Value</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{formatCurrency(15234)}</p>
            <p className="text-sm text-emerald-600">+{formatPercentage(52.34)} all time</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Profit</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-emerald-600">{formatCurrency(5234)}</p>
            <p className="text-sm text-muted-foreground">From £10,000 initial</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Holdings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{holdings.length}</p>
            <p className="text-sm text-muted-foreground">Active positions</p>
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
              <div key={holding.ticker} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-semibold">{holding.ticker}</p>
                  <p className="text-sm text-muted-foreground">{holding.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {holding.quantity} shares @ {formatCurrency(holding.avgPrice)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{formatCurrency(holding.totalValue)}</p>
                  <p className={`text-sm ${holding.gainLoss >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                    {formatCurrency(holding.gainLoss)} ({formatPercentage(holding.gainLossPercentage)})
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Current: {formatCurrency(holding.currentPrice)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
```

### 5. Additional UI Components

Create `components/ui/badge.tsx`:

```typescript
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
```

## 📝 Quick Implementation Steps

1. **Copy all components** from this guide into your project
2. **Install dependencies** (already done):
   ```bash
   npm install recharts lucide-react class-variance-authority
   ```

3. **Update `tailwind.config.ts`** with design tokens:
   ```typescript
   theme: {
     extend: {
       colors: {
         border: "hsl(var(--border))",
         input: "hsl(var(--input))",
         ring: "hsl(var(--ring))",
         background: "hsl(var(--background))",
         foreground: "hsl(var(--foreground))",
         primary: {
           DEFAULT: "hsl(var(--primary))",
           foreground: "hsl(var(--primary-foreground))",
         },
         secondary: {
           DEFAULT: "hsl(var(--secondary))",
           foreground: "hsl(var(--secondary-foreground))",
         },
         destructive: {
           DEFAULT: "hsl(var(--destructive))",
           foreground: "hsl(var(--destructive-foreground))",
         },
         muted: {
           DEFAULT: "hsl(var(--muted))",
           foreground: "hsl(var(--muted-foreground))",
         },
         accent: {
           DEFAULT: "hsl(var(--accent))",
           foreground: "hsl(var(--accent-foreground))",
         },
         card: {
           DEFAULT: "hsl(var(--card))",
           foreground: "hsl(var(--card-foreground))",
         },
       },
     },
   }
   ```

4. **Add CSS variables** to `app/globals.css`:
   ```css
   @layer base {
     :root {
       --background: 0 0% 100%;
       --foreground: 222.2 84% 4.9%;
       --card: 0 0% 100%;
       --card-foreground: 222.2 84% 4.9%;
       --primary: 142.1 76.2% 36.3%;
       --primary-foreground: 355.7 100% 97.3%;
       --secondary: 210 40% 96.1%;
       --secondary-foreground: 222.2 47.4% 11.2%;
       --muted: 210 40% 96.1%;
       --muted-foreground: 215.4 16.3% 46.9%;
       --accent: 210 40% 96.1%;
       --accent-foreground: 222.2 47.4% 11.2%;
       --destructive: 0 84.2% 60.2%;
       --destructive-foreground: 210 40% 98%;
       --border: 214.3 31.8% 91.4%;
       --input: 214.3 31.8% 91.4%;
       --ring: 142.1 76.2% 36.3%;
     }
   }
   ```

## 🚀 Run the Frontend

```bash
cd frontend
npm run dev
```

Visit `http://localhost:3000/dashboard`

## 📚 Full Page List to Create

- ✅ `/dashboard` - Main dashboard (created)
- ✅ `/dashboard/signals` - AI signals page (guide above)
- ✅ `/dashboard/portfolio` - Portfolio page (guide above)
- 🔄 `/dashboard/watchlist` - Watchlist management
- 🔄 `/dashboard/digests` - Email digest archive
- 🔄 `/dashboard/settings` - User settings
- 🔄 `/` - Landing page
- 🔄 `/auth/signin` - Sign in page
- 🔄 `/auth/signup` - Sign up page

The patterns above can be followed to create the remaining pages!

---

**The frontend structure is ready. All components follow the same patterns shown above.**

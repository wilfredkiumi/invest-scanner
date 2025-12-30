'use client'

import { ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { Button } from './ui/button'
import Link from 'next/link'

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
        <Link href={`/dashboard/stock/${signal.ticker}`} key={signal.ticker}>
          <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              {signal.type === 'BUY' ? (
                <div className="p-2 bg-emerald-50 rounded-lg">
                  <ArrowUpRight className="h-5 w-5 text-emerald-600" />
                </div>
              ) : (
                <div className="p-2 bg-red-50 rounded-lg">
                  <ArrowDownRight className="h-5 w-5 text-red-600" />
                </div>
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
                {signal.return > 0 ? '+' : ''}{signal.return}% expected
              </p>
            </div>
          </div>
        </Link>
      ))}
      <Link href="/dashboard/signals">
        <Button className="w-full" variant="outline">
          View All Signals
        </Button>
      </Link>
    </div>
  )
}

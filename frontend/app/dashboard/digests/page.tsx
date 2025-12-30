'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Archive, Mail, Calendar, Download, Eye } from 'lucide-react'
import { formatDate, formatDateTime } from '@/lib/utils'

const digests = [
  {
    id: '1',
    date: '2024-06-15',
    subject: '📊 Your Daily Investment Digest - 3 Opportunities Found',
    opportunitiesCount: 3,
    opened: true,
    delivered: true,
    deliveryTime: '2024-06-15T06:00:00',
    summary: 'Strong buy signals for NVDA and SCOM.NB. Sell recommendation for TSLA.',
    topSignals: ['NVDA (BUY 94%)', 'SCOM.NB (BUY 88%)', 'TSLA (SELL 78%)'],
  },
  {
    id: '2',
    date: '2024-06-14',
    subject: '📊 Your Daily Investment Digest - 2 Opportunities Found',
    opportunitiesCount: 2,
    opened: true,
    delivered: true,
    deliveryTime: '2024-06-14T06:00:00',
    summary: 'Dividend ETF opportunities with strong fundamentals.',
    topSignals: ['SCHD (BUY 92%)', 'VYM (BUY 85%)'],
  },
  {
    id: '3',
    date: '2024-06-13',
    subject: '📊 Your Daily Investment Digest - 4 Opportunities Found',
    opportunitiesCount: 4,
    opened: false,
    delivered: true,
    deliveryTime: '2024-06-13T06:00:00',
    summary: 'Mixed signals across tech and banking sectors.',
    topSignals: ['MSFT (BUY 82%)', 'KCB.NB (BUY 76%)', 'AAPL (HOLD 71%)'],
  },
  {
    id: '4',
    date: '2024-06-12',
    subject: '📊 Your Daily Investment Digest - 5 Opportunities Found',
    opportunitiesCount: 5,
    opened: true,
    delivered: true,
    deliveryTime: '2024-06-12T06:00:00',
    summary: 'Kenya NSE showing strong momentum across multiple sectors.',
    topSignals: ['EQTY.NB (BUY 89%)', 'EABL.NB (BUY 84%)', 'BAT.NB (BUY 80%)'],
  },
  {
    id: '5',
    date: '2024-06-11',
    subject: '📊 Your Daily Investment Digest - 1 Opportunity Found',
    opportunitiesCount: 1,
    opened: true,
    delivered: true,
    deliveryTime: '2024-06-11T06:00:00',
    summary: 'Limited opportunities detected. Market consolidating.',
    topSignals: ['SCHD (BUY 75%)'],
  },
]

const stats = {
  total: digests.length,
  thisWeek: 5,
  opened: digests.filter(d => d.opened).length,
  avgOpportunities: Math.round(digests.reduce((acc, d) => acc + d.opportunitiesCount, 0) / digests.length),
}

export default function DigestsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Archive className="h-8 w-8 text-emerald-600" />
            Email Digests
          </h1>
          <p className="text-gray-600 mt-1">
            View your daily investment digest archive
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Filter by Date
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Digests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.total}</p>
            <p className="text-sm text-gray-600 mt-1">all time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              This Week
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.thisWeek}</p>
            <p className="text-sm text-gray-600 mt-1">emails sent</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              Open Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {Math.round((stats.opened / stats.total) * 100)}%
            </p>
            <p className="text-sm text-gray-600 mt-1">engagement</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              Avg Opportunities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.avgOpportunities}</p>
            <p className="text-sm text-gray-600 mt-1">per digest</p>
          </CardContent>
        </Card>
      </div>

      {/* Digest Archive */}
      <Card>
        <CardHeader>
          <CardTitle>Digest Archive</CardTitle>
          <CardDescription>Past 90 days of daily digests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {digests.map((digest) => (
              <div
                key={digest.id}
                className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Mail className={`h-5 w-5 ${digest.opened ? 'text-gray-400' : 'text-emerald-600'}`} />
                      <p className="font-semibold">{digest.subject}</p>
                      {!digest.opened && <Badge variant="default">New</Badge>}
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{digest.summary}</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      {digest.topSignals.map((signal, i) => (
                        <Badge key={i} variant="secondary">{signal}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="text-right ml-6">
                    <p className="text-sm font-medium">{formatDate(digest.date)}</p>
                    <p className="text-xs text-gray-600 mt-1">
                      Sent {new Date(digest.deliveryTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    <p className="text-xs text-emerald-600 mt-1">
                      ✓ Delivered
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 mt-4 pt-4 border-t">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View Full Digest
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Settings Reminder */}
      <Card className="bg-emerald-50 border-emerald-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Digest Preferences</h3>
              <p className="text-sm text-gray-600 mt-1">
                Delivered daily at 6:00 AM EAT • Email: your-email@example.com
              </p>
            </div>
            <Button variant="outline">Update Settings</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

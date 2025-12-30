'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertTriangle, X } from 'lucide-react'

export function DisclaimerBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has dismissed disclaimer
    const dismissed = localStorage.getItem('disclaimer_dismissed')
    if (!dismissed) {
      setIsVisible(true)
    }
  }, [])

  const handleDismiss = () => {
    localStorage.setItem('disclaimer_dismissed', 'true')
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <Card className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-2xl z-50 bg-yellow-50 border-yellow-300 shadow-lg">
      <div className="p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">Investment Risk Disclaimer</h3>
            <p className="text-sm text-gray-700 mb-3">
              <strong>This is NOT financial advice.</strong> All investment signals, analysis, and recommendations are for educational and informational purposes only.
              Investing in stocks, bonds, crowdfunding, and early-stage companies carries significant risk of loss.
              Past performance does not guarantee future results. You may lose some or all of your invested capital.
              AI predictions are probabilistic and not guaranteed. Always conduct your own research and consult with a qualified financial advisor before making investment decisions.
            </p>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={handleDismiss}>
                I Understand
              </Button>
              <a href="/legal/disclaimer">
                <Button size="sm" variant="ghost">
                  Read Full Disclaimer
                </Button>
              </a>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="text-gray-500 hover:text-gray-700 flex-shrink-0"
            aria-label="Dismiss"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </Card>
  )
}

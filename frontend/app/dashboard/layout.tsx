import { Navigation } from '@/components/navigation'
import { DisclaimerBanner } from '@/components/disclaimer-banner'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r">
        <Navigation />
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-8">
          {children}

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-gray-200">
            <div className="text-center text-sm text-gray-600 space-y-2">
              <p className="font-semibold">⚠️ Not Financial Advice - Educational Purposes Only</p>
              <p>
                AI predictions are probabilistic. Past performance does not guarantee future results.
                Consult a qualified financial advisor before investing.
              </p>
              <div className="flex justify-center gap-4 pt-2">
                <a href="/legal/disclaimer" className="text-emerald-600 hover:underline">
                  Full Disclaimer
                </a>
                <span>•</span>
                <a href="/legal/privacy" className="text-emerald-600 hover:underline">
                  Privacy Policy
                </a>
                <span>•</span>
                <a href="/legal/terms" className="text-emerald-600 hover:underline">
                  Terms of Service
                </a>
              </div>
              <p className="text-xs pt-2">
                © 2025 AI Investment Advisor. Not affiliated with any financial institution.
              </p>
            </div>
          </footer>
        </div>
      </main>

      {/* Disclaimer Banner */}
      <DisclaimerBanner />
    </div>
  )
}

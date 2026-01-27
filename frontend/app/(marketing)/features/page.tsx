import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Bot,
  BarChart3,
  Bell,
  Globe,
  TrendingUp,
  Shield,
  PieChart,
  Mail,
  Search,
  Target,
  Zap,
  LineChart,
  ArrowRight,
} from "lucide-react"

const mainFeatures = [
  {
    name: "AI-Powered Investment Signals",
    description:
      "Our advanced machine learning models analyze thousands of data points to generate actionable buy and sell signals. Each signal comes with a confidence score and detailed reasoning so you understand exactly why an opportunity is recommended.",
    icon: Bot,
    highlights: [
      "Daily signal generation",
      "Confidence scores (0-100%)",
      "Detailed AI reasoning",
      "Historical accuracy tracking",
    ],
  },
  {
    name: "Real-Time Market Scanning",
    description:
      "Continuously monitor US, UK, and African markets for opportunities that match your investment criteria. Our scanners run 24/7, analyzing price movements, volume changes, and market sentiment to surface the best opportunities.",
    icon: BarChart3,
    highlights: [
      "5,000+ stocks monitored",
      "US, UK & African markets",
      "Kenya NSE, Nigeria NSE",
      "Sector analysis",
    ],
  },
  {
    name: "Smart Portfolio Tracking",
    description:
      "Track all your holdings in one place with comprehensive portfolio analytics. See your performance, asset allocation, and progress toward your financial goals with intuitive visualizations.",
    icon: PieChart,
    highlights: [
      "Multi-account support",
      "Performance analytics",
      "Allocation breakdown",
      "Goal progress tracking",
    ],
  },
  {
    name: "Intelligent Alerts",
    description:
      "Never miss an opportunity with customizable alerts. Get notified when AI detects a high-confidence signal, when your watchlist stocks move, or when market conditions change significantly.",
    icon: Bell,
    highlights: [
      "Push notifications",
      "Email alerts",
      "Custom trigger rules",
      "Price movement alerts",
    ],
  },
]

const additionalFeatures = [
  {
    name: "Goal-Based Investing",
    description: "Set your financial targets and let AI help you track progress toward reaching them.",
    icon: Target,
  },
  {
    name: "Watchlist Management",
    description: "Track stocks you're interested in and get notified when AI generates signals for them.",
    icon: Search,
  },
  {
    name: "Email Digests",
    description: "Receive curated daily or weekly summaries of the best opportunities and your portfolio performance.",
    icon: Mail,
  },
  {
    name: "Multi-Currency Support",
    description: "Seamlessly track investments in GBP and USD with automatic currency conversion.",
    icon: Globe,
  },
  {
    name: "Risk Analysis",
    description: "Understand the risk profile of each signal with volatility metrics and downside analysis.",
    icon: Shield,
  },
  {
    name: "Performance Charts",
    description: "Visualize your portfolio growth and compare performance against market benchmarks.",
    icon: LineChart,
  },
  {
    name: "Quick Actions",
    description: "Streamlined interface for acting on signals quickly when timing matters.",
    icon: Zap,
  },
  {
    name: "Growth Projections",
    description: "See projected growth based on historical performance and AI predictions.",
    icon: TrendingUp,
  },
]

export default function FeaturesPage() {
  return (
    <div>
      {/* Header Section */}
      <section className="bg-gradient-to-b from-emerald-50 to-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Powerful Features for Smarter Investing
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Everything you need to analyze, track, and grow your investments with AI-powered insights.
            </p>
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="space-y-24">
            {mainFeatures.map((feature, index) => (
              <div
                key={feature.name}
                className={`flex flex-col gap-12 lg:flex-row ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className="flex-1">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-100">
                    <feature.icon className="h-7 w-7 text-emerald-600" />
                  </div>
                  <h2 className="mt-6 text-2xl font-bold text-gray-900">
                    {feature.name}
                  </h2>
                  <p className="mt-4 text-lg text-gray-600">{feature.description}</p>
                  <ul className="mt-8 space-y-3">
                    {feature.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-emerald-600" />
                        <span className="text-gray-700">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1">
                  <div className="aspect-video rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <feature.icon className="h-24 w-24 text-gray-400" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features Grid */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              And Much More
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              A complete toolkit for modern investors.
            </p>
          </div>

          <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {additionalFeatures.map((feature) => (
                <div
                  key={feature.name}
                  className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                    <feature.icon className="h-5 w-5 text-emerald-600" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-gray-900">
                    {feature.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How AI Signals Work */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              How AI Signals Work
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Our AI analyzes multiple factors to generate high-quality investment signals.
            </p>
          </div>

          <div className="mx-auto max-w-4xl">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                  <span className="text-2xl font-bold text-emerald-600">1</span>
                </div>
                <h3 className="mt-6 text-lg font-semibold text-gray-900">Data Collection</h3>
                <p className="mt-2 text-sm text-gray-600">
                  We aggregate real-time market data, news, financial reports, and sentiment indicators from multiple sources.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                  <span className="text-2xl font-bold text-emerald-600">2</span>
                </div>
                <h3 className="mt-6 text-lg font-semibold text-gray-900">AI Analysis</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Our machine learning models process this data to identify patterns and predict potential price movements.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                  <span className="text-2xl font-bold text-emerald-600">3</span>
                </div>
                <h3 className="mt-6 text-lg font-semibold text-gray-900">Signal Generation</h3>
                <p className="mt-2 text-sm text-gray-600">
                  High-confidence opportunities are surfaced as actionable signals with detailed reasoning you can understand.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="bg-gray-900 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Shield className="mx-auto h-12 w-12 text-emerald-500" />
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-white">
              Your Security is Our Priority
            </h2>
            <p className="mt-4 text-lg text-gray-300">
              We use industry-leading security practices to protect your data.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-4xl">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-white">Bank-Level Encryption</h3>
                <p className="mt-2 text-sm text-gray-400">
                  256-bit SSL encryption for all data in transit and at rest.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-white">No Credential Storage</h3>
                <p className="mt-2 text-sm text-gray-400">
                  We never store your brokerage login credentials.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-white">GDPR Compliant</h3>
                <p className="mt-2 text-sm text-gray-400">
                  Full compliance with data protection regulations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-emerald-600 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Ready to Invest Smarter?
            </h2>
            <p className="mt-4 text-lg text-emerald-100">
              Start using AI-powered insights to grow your portfolio today.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-4">
              <Link href="/dashboard">
                <Button size="lg" variant="secondary" className="gap-2">
                  Get Started Free
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button size="lg" variant="ghost" className="text-white hover:bg-emerald-700 hover:text-white">
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

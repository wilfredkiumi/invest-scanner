import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Globe,
  TrendingUp,
  DollarSign,
  Building2,
  Clock,
  Shield,
  BarChart3,
  ArrowRight,
  CheckCircle2
} from "lucide-react"

const markets = [
  {
    region: "United States",
    flag: "🇺🇸",
    exchanges: [
      {
        name: "NYSE",
        fullName: "New York Stock Exchange",
        description: "The world's largest stock exchange by market capitalization, home to blue-chip companies and established corporations.",
        stocks: "2,400+",
        highlights: ["Blue-chip stocks", "Dividend aristocrats", "Large-cap stability"]
      },
      {
        name: "NASDAQ",
        fullName: "NASDAQ Stock Market",
        description: "Technology-focused exchange known for innovation and growth companies, including the world's largest tech giants.",
        stocks: "3,300+",
        highlights: ["Tech giants", "Growth stocks", "Innovation leaders"]
      }
    ],
    benefits: [
      "High liquidity and tight spreads",
      "Extensive analyst coverage",
      "Strong regulatory protection",
      "Dollar-denominated investments"
    ],
    tradingHours: "9:30 AM - 4:00 PM EST",
    currency: "USD"
  },
  {
    region: "United Kingdom",
    flag: "🇬🇧",
    exchanges: [
      {
        name: "LSE",
        fullName: "London Stock Exchange",
        description: "One of the world's oldest and most international stock exchanges, offering access to European and global companies.",
        stocks: "2,000+",
        highlights: ["International exposure", "FTSE 100 leaders", "Dividend payers"]
      }
    ],
    benefits: [
      "Gateway to European markets",
      "Strong dividend culture",
      "ISA tax advantages for UK residents",
      "Pound sterling diversification"
    ],
    tradingHours: "8:00 AM - 4:30 PM GMT",
    currency: "GBP"
  },
  {
    region: "Kenya",
    flag: "🇰🇪",
    featured: true,
    exchanges: [
      {
        name: "NSE",
        fullName: "Nairobi Securities Exchange",
        description: "East Africa's leading stock exchange, offering exposure to one of Africa's fastest-growing economies.",
        stocks: "65+",
        highlights: ["High dividend yields", "Banking sector strength", "Telecom leaders"]
      }
    ],
    benefits: [
      "Average dividend yields of 6-8%",
      "Exposure to mobile money revolution",
      "Growing middle class consumption",
      "Regional economic hub"
    ],
    tradingHours: "9:00 AM - 3:00 PM EAT",
    currency: "KES"
  },
  {
    region: "Nigeria",
    flag: "🇳🇬",
    exchanges: [
      {
        name: "NGX",
        fullName: "Nigerian Exchange Group",
        description: "West Africa's largest stock exchange, providing access to Africa's biggest economy and population.",
        stocks: "150+",
        highlights: ["Consumer goods giants", "Banking leaders", "Industrial exposure"]
      }
    ],
    benefits: [
      "Africa's largest economy",
      "Young, growing population",
      "Natural resource wealth",
      "Diversified sectors"
    ],
    tradingHours: "10:00 AM - 2:30 PM WAT",
    currency: "NGN"
  },
  {
    region: "South Africa",
    flag: "🇿🇦",
    comingSoon: true,
    exchanges: [
      {
        name: "JSE",
        fullName: "Johannesburg Stock Exchange",
        description: "Africa's largest stock exchange and one of the top 20 globally, offering access to diversified African investments.",
        stocks: "350+",
        highlights: ["Mining giants", "Financial services", "Retail leaders"]
      }
    ],
    benefits: [
      "Most liquid African market",
      "Mining and resources exposure",
      "Gateway to Southern Africa",
      "Strong corporate governance"
    ],
    tradingHours: "9:00 AM - 5:00 PM SAST",
    currency: "ZAR"
  }
]

const whyMultiMarket = [
  {
    title: "Geographic Diversification",
    description: "Spread your investments across different economies and reduce country-specific risks.",
    icon: Globe
  },
  {
    title: "Higher Yield Opportunities",
    description: "African markets often offer dividend yields 3-4x higher than developed markets.",
    icon: TrendingUp
  },
  {
    title: "Currency Diversification",
    description: "Hold investments in multiple currencies to hedge against exchange rate fluctuations.",
    icon: DollarSign
  },
  {
    title: "Growth Market Access",
    description: "Tap into emerging market growth while maintaining developed market stability.",
    icon: BarChart3
  }
]

export default function MarketsPage() {
  return (
    <>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50 to-white">
          <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Global Markets,{" "}
                <span className="text-emerald-600">One Platform</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Access investment opportunities across the US, UK, and Africa's most promising
                stock exchanges. Diversify your portfolio with AI-powered insights for each market.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-4">
                <Link href="/login">
                  <Button size="lg" className="gap-2">
                    Start Exploring Markets
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Why Multi-Market Section */}
        <section className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Why Invest Across Multiple Markets?
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Smart investors know that diversification is key to building wealth and managing risk.
              </p>
            </div>

            <div className="mx-auto mt-12 max-w-5xl">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {whyMultiMarket.map((item) => (
                  <div key={item.title} className="text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
                      <item.icon className="h-6 w-6 text-emerald-600" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-gray-900">{item.title}</h3>
                    <p className="mt-2 text-sm text-gray-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Markets Detail Section */}
        <section className="bg-gray-50 py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Markets We Cover
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Deep analysis and AI signals for stocks across these major exchanges.
              </p>
            </div>

            <div className="space-y-12">
              {markets.map((market) => (
                <div
                  key={market.region}
                  className={`rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200 ${
                    market.featured ? 'ring-2 ring-emerald-500' : ''
                  } ${market.comingSoon ? 'opacity-75' : ''}`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
                    {/* Market Header */}
                    <div className="lg:w-1/3">
                      <div className="flex items-center gap-3">
                        <span className="text-4xl">{market.flag}</span>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            {market.region}
                            {market.featured && (
                              <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                                Featured
                              </span>
                            )}
                            {market.comingSoon && (
                              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                Coming Soon
                              </span>
                            )}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            {market.exchanges.map(e => e.name).join(", ")}
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 space-y-3">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="h-4 w-4" />
                          <span>{market.tradingHours}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <DollarSign className="h-4 w-4" />
                          <span>{market.currency}</span>
                        </div>
                      </div>

                      <div className="mt-6">
                        <p className="text-sm font-medium text-gray-700 mb-2">Key Benefits:</p>
                        <ul className="space-y-2">
                          {market.benefits.map((benefit) => (
                            <li key={benefit} className="flex items-start gap-2 text-sm text-gray-600">
                              <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Exchanges */}
                    <div className="lg:w-2/3">
                      <div className="grid gap-6 md:grid-cols-2">
                        {market.exchanges.map((exchange) => (
                          <div
                            key={exchange.name}
                            className="rounded-xl bg-gray-50 p-6"
                          >
                            <div className="flex items-center gap-2 mb-3">
                              <Building2 className="h-5 w-5 text-emerald-600" />
                              <div>
                                <h4 className="font-semibold text-gray-900">{exchange.name}</h4>
                                <p className="text-xs text-gray-500">{exchange.fullName}</p>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 mb-4">{exchange.description}</p>
                            <div className="flex items-center gap-2 mb-3">
                              <BarChart3 className="h-4 w-4 text-gray-400" />
                              <span className="text-sm font-medium text-gray-700">
                                {exchange.stocks} listed stocks
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {exchange.highlights.map((highlight) => (
                                <span
                                  key={highlight}
                                  className="text-xs bg-white px-2 py-1 rounded-full text-gray-600 border"
                                >
                                  {highlight}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* African Markets Highlight */}
        <section className="bg-gradient-to-r from-emerald-600 to-teal-600 py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center text-white">
              <span className="text-4xl mb-4 block">🌍</span>
              <h2 className="text-3xl font-bold tracking-tight">
                African Markets: The Opportunity
              </h2>
              <p className="mt-4 text-lg text-emerald-100">
                While developed markets offer stability, African exchanges offer something
                rare: high dividend yields combined with growth potential.
              </p>

              <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-white/10 backdrop-blur rounded-xl p-6">
                  <p className="text-3xl font-bold">6-8%</p>
                  <p className="text-emerald-100 text-sm mt-1">Average Dividend Yield</p>
                  <p className="text-emerald-200 text-xs mt-2">vs 2% in US markets</p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl p-6">
                  <p className="text-3xl font-bold">1.3B</p>
                  <p className="text-emerald-100 text-sm mt-1">Growing Population</p>
                  <p className="text-emerald-200 text-xs mt-2">Rising consumer class</p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl p-6">
                  <p className="text-3xl font-bold">5-7%</p>
                  <p className="text-emerald-100 text-sm mt-1">GDP Growth Rate</p>
                  <p className="text-emerald-200 text-xs mt-2">Outpacing developed markets</p>
                </div>
              </div>

              <div className="mt-10">
                <Link href="/login">
                  <Button size="lg" variant="secondary" className="gap-2">
                    Explore African Market Signals
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* How We Analyze Section */}
        <section className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                AI-Powered Analysis for Every Market
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Our algorithms adapt to each market's unique characteristics and regulations.
              </p>
            </div>

            <div className="mx-auto max-w-4xl">
              <div className="grid gap-8 md:grid-cols-2">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100">
                    <BarChart3 className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Fundamental Analysis</h3>
                    <p className="mt-2 text-sm text-gray-600">
                      We analyze financial statements, earnings reports, and key metrics
                      customized for each market's reporting standards.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100">
                    <TrendingUp className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Technical Patterns</h3>
                    <p className="mt-2 text-sm text-gray-600">
                      Our AI identifies chart patterns and trends, accounting for
                      market-specific liquidity and trading patterns.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100">
                    <Globe className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Local News & Sentiment</h3>
                    <p className="mt-2 text-sm text-gray-600">
                      We monitor local news sources and social sentiment in each
                      market's native language and context.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100">
                    <Shield className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Risk Assessment</h3>
                    <p className="mt-2 text-sm text-gray-600">
                      Every signal includes market-specific risk factors like
                      currency volatility, political stability, and liquidity.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gray-50 py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Ready to Go Global?
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Start receiving AI-powered investment signals across all our supported markets.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-4">
                <Link href="/login">
                  <Button size="lg" className="gap-2">
                    Get Started Free
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button size="lg" variant="outline">
                    View Pricing
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
    </>
  )
}

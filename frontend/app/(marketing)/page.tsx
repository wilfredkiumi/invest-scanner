import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  TrendingUp,
  Bot,
  Shield,
  BarChart3,
  Bell,
  Globe,
  CheckCircle,
  ArrowRight
} from "lucide-react"

const features = [
  {
    name: "AI-Powered Signals",
    description: "Get intelligent buy/sell recommendations based on advanced market analysis and machine learning.",
    icon: Bot,
  },
  {
    name: "Real-Time Scanning",
    description: "Continuously monitor markets across the US and UK for opportunities that match your goals.",
    icon: BarChart3,
  },
  {
    name: "Smart Alerts",
    description: "Receive personalized notifications when opportunities arise or market conditions change.",
    icon: Bell,
  },
  {
    name: "Multi-Market Support",
    description: "Track investments across US and UK markets with full currency conversion support.",
    icon: Globe,
  },
  {
    name: "Portfolio Tracking",
    description: "Monitor your holdings, track performance, and visualize your path to financial goals.",
    icon: TrendingUp,
  },
  {
    name: "Risk Management",
    description: "Understand the risks with confidence scores and detailed AI reasoning for every signal.",
    icon: Shield,
  },
]

const testimonials = [
  {
    content: "Investment Scanner helped me identify opportunities I would have never found on my own. The AI signals are incredibly insightful.",
    author: "Sarah M.",
    role: "Individual Investor",
  },
  {
    content: "The portfolio tracking and goal visualization features keep me motivated and on track for my £100k target.",
    author: "James T.",
    role: "Software Engineer",
  },
  {
    content: "Finally, a tool that explains its reasoning. I actually learn something from every signal it generates.",
    author: "Emma L.",
    role: "Financial Analyst",
  },
]

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50 to-white">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Grow Your Wealth with{" "}
              <span className="text-emerald-600">AI-Powered</span> Insights
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Transform your £10k into £100k with intelligent investment signals,
              real-time market scanning, and personalized portfolio management.
              Let AI guide your investment journey.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-4">
              <Link href="/dashboard">
                <Button size="lg" className="gap-2">
                  Start Investing Smarter
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/features">
                <Button variant="outline" size="lg">
                  See How It Works
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative gradient */}
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-emerald-200 to-emerald-400 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="grid grid-cols-1 gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col gap-2">
                <dt className="text-sm font-medium text-gray-600">Markets Monitored</dt>
                <dd className="text-4xl font-bold text-gray-900">2</dd>
                <p className="text-sm text-gray-500">US & UK Exchanges</p>
              </div>
              <div className="flex flex-col gap-2">
                <dt className="text-sm font-medium text-gray-600">Stocks Analyzed</dt>
                <dd className="text-4xl font-bold text-gray-900">5,000+</dd>
                <p className="text-sm text-gray-500">Daily scans</p>
              </div>
              <div className="flex flex-col gap-2">
                <dt className="text-sm font-medium text-gray-600">Signal Accuracy</dt>
                <dd className="text-4xl font-bold text-emerald-600">85%</dd>
                <p className="text-sm text-gray-500">Historical average</p>
              </div>
              <div className="flex flex-col gap-2">
                <dt className="text-sm font-medium text-gray-600">Active Users</dt>
                <dd className="text-4xl font-bold text-gray-900">10,000+</dd>
                <p className="text-sm text-gray-500">Growing community</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything You Need to Invest Smarter
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Powerful tools designed to help you make informed investment decisions and reach your financial goals.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-5xl">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature.name}
                  className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
                    <feature.icon className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-gray-900">
                    {feature.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link href="/features">
              <Button variant="outline" className="gap-2">
                Explore All Features
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Your Path from £10k to £100k
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              A simple, powerful approach to growing your wealth with AI assistance.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-4xl">
            <div className="space-y-12">
              <div className="flex items-start gap-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Set Your Goals</h3>
                  <p className="mt-2 text-gray-600">
                    Define your starting investment, target amount, and timeframe.
                    Our AI tailors its recommendations to your specific journey.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Receive AI Signals</h3>
                  <p className="mt-2 text-gray-600">
                    Get daily buy/sell recommendations with confidence scores and detailed reasoning.
                    Understand exactly why each opportunity is suggested.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Track Your Progress</h3>
                  <p className="mt-2 text-gray-600">
                    Monitor your portfolio performance, visualize your progress toward goals,
                    and adjust your strategy as needed.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white font-bold">
                  4
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Reach Your Goals</h3>
                  <p className="mt-2 text-gray-600">
                    Watch your wealth grow as you follow AI-guided investment decisions
                    and build toward your financial independence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Trusted by Investors
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              See what our community has to say about their experience.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-5xl">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200"
                >
                  <p className="text-gray-600 italic">&ldquo;{testimonial.content}&rdquo;</p>
                  <div className="mt-6">
                    <p className="font-semibold text-gray-900">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-emerald-600 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Start Your Investment Journey?
            </h2>
            <p className="mt-4 text-lg text-emerald-100">
              Join thousands of investors using AI to make smarter decisions.
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

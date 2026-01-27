import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

const tiers = [
  {
    name: "Free",
    id: "tier-free",
    price: "£0",
    description: "Get started with basic features to test the waters.",
    features: [
      "3 AI signals per week",
      "Basic portfolio tracking",
      "1 market (UK or Kenya)",
      "Email digests (weekly)",
      "Community support",
    ],
    cta: "Get Started",
    href: "/dashboard",
    featured: false,
  },
  {
    name: "Pro",
    id: "tier-pro",
    price: "£19",
    period: "/month",
    description: "Everything you need to seriously grow your investments.",
    features: [
      "Unlimited AI signals",
      "Advanced portfolio analytics",
      "US, UK & Kenya markets",
      "Real-time alerts",
      "Daily email digests",
      "Detailed AI reasoning",
      "Watchlist (50 stocks)",
      "Priority support",
    ],
    cta: "Start Pro Trial",
    href: "/dashboard",
    featured: true,
  },
  {
    name: "Premium",
    id: "tier-premium",
    price: "£49",
    period: "/month",
    description: "For serious investors who want every advantage.",
    features: [
      "Everything in Pro",
      "Crowdfunding opportunities",
      "API access",
      "Custom signal criteria",
      "Unlimited watchlist",
      "Tax reporting tools",
      "1-on-1 onboarding call",
      "Dedicated account manager",
    ],
    cta: "Contact Sales",
    href: "/contact",
    featured: false,
  },
]

const faqs = [
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Yes, you can cancel your subscription at any time. Your access will continue until the end of your billing period.",
  },
  {
    question: "Is there a free trial for paid plans?",
    answer: "Yes, Pro and Premium plans include a 14-day free trial. No credit card required to start.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, debit cards, and PayPal. Enterprise customers can pay via invoice.",
  },
  {
    question: "Can I upgrade or downgrade my plan?",
    answer: "Absolutely. You can change your plan at any time. Changes take effect immediately, and we'll prorate any payments.",
  },
  {
    question: "Do you offer refunds?",
    answer: "We offer a 30-day money-back guarantee on all paid plans. If you're not satisfied, contact us for a full refund.",
  },
  {
    question: "Is my investment data secure?",
    answer: "Yes, we use bank-level encryption and never store your brokerage credentials. Your data is always protected.",
  },
]

export default function PricingPage() {
  return (
    <div>
      {/* Header Section */}
      <section className="bg-gradient-to-b from-emerald-50 to-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Simple, Transparent Pricing
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Choose the plan that fits your investment journey. Start free and upgrade as you grow.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-3">
            {tiers.map((tier) => (
              <div
                key={tier.id}
                className={`rounded-2xl p-8 ring-1 ${
                  tier.featured
                    ? "bg-emerald-600 ring-emerald-600 text-white scale-105 shadow-xl"
                    : "bg-white ring-gray-200"
                }`}
              >
                {tier.featured && (
                  <p className="text-sm font-semibold text-emerald-100 mb-4">Most Popular</p>
                )}
                <h3
                  className={`text-xl font-semibold ${
                    tier.featured ? "text-white" : "text-gray-900"
                  }`}
                >
                  {tier.name}
                </h3>
                <p
                  className={`mt-2 text-sm ${
                    tier.featured ? "text-emerald-100" : "text-gray-600"
                  }`}
                >
                  {tier.description}
                </p>
                <p className="mt-6">
                  <span
                    className={`text-4xl font-bold ${
                      tier.featured ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {tier.price}
                  </span>
                  {tier.period && (
                    <span
                      className={`text-sm ${
                        tier.featured ? "text-emerald-100" : "text-gray-600"
                      }`}
                    >
                      {tier.period}
                    </span>
                  )}
                </p>
                <ul className="mt-8 space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckCircle
                        className={`h-5 w-5 shrink-0 ${
                          tier.featured ? "text-emerald-200" : "text-emerald-600"
                        }`}
                      />
                      <span
                        className={`text-sm ${
                          tier.featured ? "text-emerald-50" : "text-gray-600"
                        }`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link href={tier.href} className="block mt-8">
                  <Button
                    className="w-full"
                    variant={tier.featured ? "secondary" : "default"}
                  >
                    {tier.cta}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Compare Plans
            </h2>
          </div>

          <div className="mx-auto max-w-4xl overflow-hidden rounded-xl bg-white shadow ring-1 ring-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900">
                    Feature
                  </th>
                  <th className="py-4 px-4 text-center text-sm font-semibold text-gray-900">
                    Free
                  </th>
                  <th className="py-4 px-4 text-center text-sm font-semibold text-emerald-600">
                    Pro
                  </th>
                  <th className="py-4 px-4 text-center text-sm font-semibold text-gray-900">
                    Premium
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-4 px-6 text-sm text-gray-900">AI Signals</td>
                  <td className="py-4 px-4 text-center text-sm text-gray-600">3/week</td>
                  <td className="py-4 px-4 text-center text-sm text-gray-600">Unlimited</td>
                  <td className="py-4 px-4 text-center text-sm text-gray-600">Unlimited</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-sm text-gray-900">Markets</td>
                  <td className="py-4 px-4 text-center text-sm text-gray-600">1 market</td>
                  <td className="py-4 px-4 text-center text-sm text-gray-600">US, UK, Kenya</td>
                  <td className="py-4 px-4 text-center text-sm text-gray-600">All markets</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-sm text-gray-900">Watchlist</td>
                  <td className="py-4 px-4 text-center text-sm text-gray-600">10 stocks</td>
                  <td className="py-4 px-4 text-center text-sm text-gray-600">50 stocks</td>
                  <td className="py-4 px-4 text-center text-sm text-gray-600">Unlimited</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-sm text-gray-900">Email Digests</td>
                  <td className="py-4 px-4 text-center text-sm text-gray-600">Weekly</td>
                  <td className="py-4 px-4 text-center text-sm text-gray-600">Daily</td>
                  <td className="py-4 px-4 text-center text-sm text-gray-600">Daily</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-sm text-gray-900">Real-time Alerts</td>
                  <td className="py-4 px-4 text-center text-sm text-gray-400">—</td>
                  <td className="py-4 px-4 text-center"><CheckCircle className="h-5 w-5 text-emerald-600 mx-auto" /></td>
                  <td className="py-4 px-4 text-center"><CheckCircle className="h-5 w-5 text-emerald-600 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-sm text-gray-900">API Access</td>
                  <td className="py-4 px-4 text-center text-sm text-gray-400">—</td>
                  <td className="py-4 px-4 text-center text-sm text-gray-400">—</td>
                  <td className="py-4 px-4 text-center"><CheckCircle className="h-5 w-5 text-emerald-600 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-sm text-gray-900">Support</td>
                  <td className="py-4 px-4 text-center text-sm text-gray-600">Community</td>
                  <td className="py-4 px-4 text-center text-sm text-gray-600">Priority</td>
                  <td className="py-4 px-4 text-center text-sm text-gray-600">Dedicated</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="mx-auto max-w-3xl">
            <dl className="space-y-8">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-8">
                  <dt className="text-lg font-semibold text-gray-900">{faq.question}</dt>
                  <dd className="mt-2 text-gray-600">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-emerald-600 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Still Have Questions?
            </h2>
            <p className="mt-4 text-lg text-emerald-100">
              Our team is here to help you find the right plan for your needs.
            </p>
            <div className="mt-8">
              <Link href="/contact">
                <Button size="lg" variant="secondary">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

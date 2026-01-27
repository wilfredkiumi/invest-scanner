"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Mail, MapPin, Phone, Send, CheckCircle } from "lucide-react"

const contactMethods = [
  {
    icon: Mail,
    name: "Email",
    value: "support@investmentscanner.com",
    href: "mailto:support@investmentscanner.com",
  },
  {
    icon: Phone,
    name: "Phone",
    value: "+44 20 1234 5678",
    href: "tel:+442012345678",
  },
  {
    icon: MapPin,
    name: "Office",
    value: "London, United Kingdom",
    href: null,
  },
]

const topics = [
  { value: "general", label: "General Inquiry" },
  { value: "sales", label: "Sales & Pricing" },
  { value: "support", label: "Technical Support" },
  { value: "partnership", label: "Partnership Opportunities" },
  { value: "feedback", label: "Product Feedback" },
]

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "general",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send the form data to an API
    console.log("Form submitted:", formData)
    setSubmitted(true)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div>
      {/* Header Section */}
      <section className="bg-gradient-to-b from-emerald-50 to-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Get in Touch
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Have questions about Investment Scanner? We&apos;re here to help. Reach out and
              our team will get back to you within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              {contactMethods.map((method) => (
                <div key={method.name} className="text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                    <method.icon className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-gray-900">
                    {method.name}
                  </h3>
                  {method.href ? (
                    <a
                      href={method.href}
                      className="mt-1 text-sm text-emerald-600 hover:text-emerald-700"
                    >
                      {method.value}
                    </a>
                  ) : (
                    <p className="mt-1 text-sm text-gray-600">{method.value}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            {submitted ? (
              <div className="rounded-2xl bg-white p-12 text-center shadow-sm ring-1 ring-gray-200">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                  <CheckCircle className="h-8 w-8 text-emerald-600" />
                </div>
                <h2 className="mt-6 text-2xl font-bold text-gray-900">
                  Message Sent!
                </h2>
                <p className="mt-4 text-gray-600">
                  Thank you for reaching out. Our team will review your message and get
                  back to you within 24 hours.
                </p>
                <Button
                  className="mt-8"
                  variant="outline"
                  onClick={() => {
                    setSubmitted(false)
                    setFormData({ name: "", email: "", topic: "general", message: "" })
                  }}
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200 sm:p-12"
              >
                <h2 className="text-2xl font-bold text-gray-900">Send Us a Message</h2>
                <p className="mt-2 text-sm text-gray-600">
                  Fill out the form below and we&apos;ll get back to you as soon as possible.
                </p>

                <div className="mt-8 space-y-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="topic"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Topic
                    </label>
                    <select
                      id="topic"
                      name="topic"
                      value={formData.topic}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    >
                      {topics.map((topic) => (
                        <option key={topic.value} value={topic.value}>
                          {topic.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <div>
                    <Button type="submit" size="lg" className="w-full gap-2">
                      <Send className="h-4 w-4" />
                      Send Message
                    </Button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Callout */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-gray-900">
              Looking for Quick Answers?
            </h2>
            <p className="mt-4 text-gray-600">
              Check out our pricing page for frequently asked questions about plans,
              billing, and features.
            </p>
            <div className="mt-8">
              <a href="/pricing#faq">
                <Button variant="outline">View FAQ</Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

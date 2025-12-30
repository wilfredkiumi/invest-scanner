'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Settings as SettingsIcon, User, Bell, Shield, DollarSign, Globe } from 'lucide-react'

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <SettingsIcon className="h-8 w-8 text-emerald-600" />
          Settings
        </h1>
        <p className="text-gray-600 mt-1">
          Manage your account and preferences
        </p>
      </div>

      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5" />
            <CardTitle>Profile Settings</CardTitle>
          </div>
          <CardDescription>Your personal information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              defaultValue="Wilfred"
              className="mt-1 w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              defaultValue="wilfred@example.com"
              className="mt-1 w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Country</label>
            <select className="mt-1 w-full p-2 border rounded-md">
              <option>Kenya</option>
              <option>United Kingdom</option>
              <option>United States</option>
              <option>Nigeria</option>
              <option>South Africa</option>
            </select>
          </div>
          <Button>Save Profile</Button>
        </CardContent>
      </Card>

      {/* Investment Preferences */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            <CardTitle>Investment Preferences</CardTitle>
          </div>
          <CardDescription>Customize your investment criteria</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Preferred Currency</label>
            <select className="mt-1 w-full p-2 border rounded-md">
              <option>GBP (£)</option>
              <option>USD ($)</option>
              <option>KES (KSh)</option>
              <option>EUR (€)</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Risk Tolerance</label>
            <select className="mt-1 w-full p-2 border rounded-md">
              <option>Moderate-High (10x growth target)</option>
              <option>Conservative</option>
              <option>Moderate</option>
              <option>Aggressive</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Market Preference</label>
            <div className="mt-2 space-y-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-sm">US Markets</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-sm">Kenya NSE</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">Other African Markets</span>
              </label>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Minimum Dividend Yield (%)</label>
            <input
              type="number"
              defaultValue="2.5"
              step="0.1"
              className="mt-1 w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Maximum P/E Ratio</label>
            <input
              type="number"
              defaultValue="20"
              className="mt-1 w-full p-2 border rounded-md"
            />
          </div>
          <Button>Save Preferences</Button>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            <CardTitle>Notifications</CardTitle>
          </div>
          <CardDescription>Manage how you receive alerts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Daily Digest Time</label>
            <select className="mt-1 w-full p-2 border rounded-md">
              <option>06:00 AM EAT</option>
              <option>07:00 AM EAT</option>
              <option>08:00 AM EAT</option>
              <option>09:00 AM EAT</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Timezone</label>
            <select className="mt-1 w-full p-2 border rounded-md">
              <option>East Africa Time (EAT)</option>
              <option>Greenwich Mean Time (GMT)</option>
              <option>Central European Time (CET)</option>
              <option>Eastern Standard Time (EST)</option>
            </select>
          </div>
          <div className="space-y-3 pt-2">
            <label className="flex items-center justify-between">
              <span className="text-sm font-medium">Daily Email Digest</span>
              <input type="checkbox" defaultChecked className="toggle" />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-sm font-medium">High-Confidence Signals (SMS)</span>
              <input type="checkbox" className="toggle" />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-sm font-medium">Weekly Summary Report</span>
              <input type="checkbox" defaultChecked className="toggle" />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-sm font-medium">Portfolio Alerts</span>
              <input type="checkbox" defaultChecked className="toggle" />
            </label>
          </div>
          <Button>Save Notifications</Button>
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            <CardTitle>Security</CardTitle>
          </div>
          <CardDescription>Password and authentication</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Current Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="mt-1 w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">New Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="mt-1 w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Confirm New Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="mt-1 w-full p-2 border rounded-md"
            />
          </div>
          <Button>Update Password</Button>
        </CardContent>
      </Card>

      {/* Data & Privacy */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            <CardTitle>Data & Privacy</CardTitle>
          </div>
          <CardDescription>Manage your data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium">Export Your Data</p>
              <p className="text-sm text-gray-600">Download all your portfolio and signal data</p>
            </div>
            <Button variant="outline">Export</Button>
          </div>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium">Delete Account</p>
              <p className="text-sm text-gray-600">Permanently delete your account and data</p>
            </div>
            <Button variant="destructive">Delete</Button>
          </div>
        </CardContent>
      </Card>

      {/* Goal Settings */}
      <Card className="bg-emerald-50 border-emerald-200">
        <CardHeader>
          <CardTitle>Your Investment Goal</CardTitle>
          <CardDescription>Track your progress to financial success</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Initial Investment</label>
            <input
              type="number"
              defaultValue="10000"
              className="mt-1 w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Target Amount</label>
            <input
              type="number"
              defaultValue="100000"
              className="mt-1 w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Target Timeframe (months)</label>
            <input
              type="number"
              defaultValue="12"
              className="mt-1 w-full p-2 border rounded-md"
            />
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <p className="text-sm text-gray-600">Required monthly return:</p>
            <p className="text-2xl font-bold text-emerald-600">21.5%</p>
            <p className="text-xs text-gray-500 mt-1">Based on your current settings</p>
          </div>
          <Button>Update Goal</Button>
        </CardContent>
      </Card>
    </div>
  )
}

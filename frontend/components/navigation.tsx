'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, TrendingUp, Briefcase, ListTodo, Archive, Settings, LogOut, Bot } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'AI Signals', href: '/dashboard/signals', icon: Bot },
  { name: 'Portfolio', href: '/dashboard/portfolio', icon: Briefcase },
  { name: 'Watchlist', href: '/dashboard/watchlist', icon: ListTodo },
  { name: 'Digests', href: '/dashboard/digests', icon: Archive },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col h-full">
      <div className="px-4 py-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <TrendingUp className="h-8 w-8 text-emerald-600" />
          <span className="text-xl font-bold">InvestScanner</span>
        </Link>
      </div>

      <div className="flex-1 px-3 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-emerald-50 text-emerald-900'
                  : 'text-gray-700 hover:bg-gray-100'
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </div>

      <div className="p-4 border-t">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <LogOut className="h-5 w-5" />
          Sign Out
        </Button>
      </div>
    </nav>
  )
}

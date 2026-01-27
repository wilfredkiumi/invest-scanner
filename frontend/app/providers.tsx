'use client'

import { Amplify } from 'aws-amplify'
import { amplifyConfig } from '@/lib/amplify-config'
import { AuthProvider } from '@/lib/auth-context'
import { useEffect } from 'react'

// Only configure Amplify if credentials are set
if (process.env.NEXT_PUBLIC_USER_POOL_ID) {
  Amplify.configure(amplifyConfig as Parameters<typeof Amplify.configure>[0], { ssr: true })
}

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Configure Amplify on client side if credentials are set
    if (process.env.NEXT_PUBLIC_USER_POOL_ID) {
      Amplify.configure(amplifyConfig as Parameters<typeof Amplify.configure>[0])
    }
  }, [])

  return <AuthProvider>{children}</AuthProvider>
}

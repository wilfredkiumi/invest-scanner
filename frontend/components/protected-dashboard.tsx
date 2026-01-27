"use client"

import { ProtectedRoute } from "@/lib/auth-context"

export function ProtectedDashboard({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute>{children}</ProtectedRoute>
}

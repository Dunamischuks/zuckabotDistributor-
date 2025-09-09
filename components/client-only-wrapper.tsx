"use client"

import type React from "react"

import { useEffect, useState } from "react"

interface ClientOnlyWrapperProps {
  children: React.ReactNode
}

export function ClientOnlyWrapper({ children }: ClientOnlyWrapperProps) {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Loading ZuckaBot dApp...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

"use client"

import dynamic from "next/dynamic"
import { Suspense } from "react"

const ZuckaBotDAppClient = dynamic(() => import("./zuckabot-dapp-client"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
      <div className="text-white text-xl">Loading ZuckaBot DApp...</div>
    </div>
  ),
})

export default function DAppClientWrapper() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
          <div className="text-white text-xl">Loading...</div>
        </div>
      }
    >
      <ZuckaBotDAppClient />
    </Suspense>
  )
}

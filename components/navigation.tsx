"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { FileText, Home, Gift, Sparkles } from "lucide-react"

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="relative w-full flex justify-center py-4 z-40">
      <div className="bg-white/95 backdrop-blur-md rounded-full px-3 sm:px-6 py-2 sm:py-3 shadow-2xl border-2 border-gray-200/50 max-w-[95vw] overflow-hidden">
        <div className="flex items-center gap-2 sm:gap-6">
          <Link href="/" className="flex items-center gap-1 sm:gap-2 mr-1 sm:mr-2">
            <div className="w-6 sm:w-8 h-6 sm:h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg crypto-glow">
              <img src="/images/zuckabot-logo.png" alt="ZuckaBot" className="w-4 sm:w-6 h-4 sm:h-6 object-contain" />
            </div>
            <span className="font-bold text-primary text-xs sm:text-sm hidden sm:block neon-glow font-serif">
              ZuckaBot
            </span>
          </Link>

          <div className="flex items-center gap-1 sm:gap-4">
            <Link href="/">
              <Button
                variant="ghost"
                size="sm"
                className={`text-gray-800 hover:text-white hover:bg-cyan-500/90 transition-all duration-200 border-2 border-cyan-400/80 hover:border-cyan-300 shadow-lg hover:shadow-cyan-400/50 font-bold px-2 sm:px-6 py-2 sm:py-3 bg-cyan-100/80 text-xs sm:text-sm ${
                  pathname === "/"
                    ? "text-white bg-cyan-500/90 shadow-lg border-cyan-300 shadow-cyan-400/60 scale-105"
                    : ""
                }`}
              >
                <Home className="w-3 sm:w-4 h-3 sm:h-4 mr-1 sm:mr-2" />
                <span className="font-bold">Home</span>
              </Button>
            </Link>
            <Link href="/whitepaper">
              <Button
                variant="ghost"
                size="sm"
                className={`text-gray-800 hover:text-white hover:bg-blue-500/90 transition-all duration-200 border-2 border-blue-400/80 hover:border-blue-300 bg-blue-100/80 shadow-lg hover:shadow-blue-400/50 font-bold px-2 sm:px-8 py-2 sm:py-4 crypto-glow neon-border text-xs sm:text-lg ${
                  pathname === "/whitepaper"
                    ? "text-white bg-blue-500/90 shadow-lg border-blue-300 shadow-blue-400/60 scale-105"
                    : ""
                }`}
              >
                <FileText className="w-3 sm:w-6 h-3 sm:h-6 mr-1 sm:mr-3" />
                <span className="font-bold text-xs sm:text-lg">Whitepaper</span>
              </Button>
            </Link>
            <Link href="/giveaway">
              <Button
                variant="ghost"
                size="sm"
                className={`text-gray-800 hover:text-white hover:bg-emerald-500/90 transition-all duration-200 relative border-2 border-emerald-400/80 hover:border-emerald-300 bg-emerald-100/80 shadow-lg hover:shadow-emerald-400/50 font-bold px-2 sm:px-8 py-2 sm:py-4 crypto-glow neon-border animate-pulse text-xs sm:text-lg ${
                  pathname === "/giveaway"
                    ? "text-white bg-emerald-500/90 shadow-lg border-emerald-300 shadow-emerald-400/60 scale-105"
                    : ""
                }`}
              >
                <Gift className="w-3 sm:w-6 h-3 sm:h-6 mr-1 sm:mr-3" />
                <span className="font-bold text-xs sm:text-lg">Giveaway</span>
                <Sparkles className="w-3 sm:w-5 h-3 sm:h-5 ml-1 sm:ml-2 text-yellow-500 animate-bounce" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

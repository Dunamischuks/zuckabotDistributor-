"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Zap } from "lucide-react"

export function LaunchCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const targetDate = new Date("2025-10-15T00:00:00Z").getTime()

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <Card className="glass border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
      <CardContent className="pt-6">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            <Badge variant="outline" className="px-3 py-1">
              PancakeSwap Launch
            </Badge>
          </div>

          <h3 className="text-2xl font-bold gradient-text">Official Launch Countdown</h3>

          <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
            {[
              { label: "Days", value: timeLeft.days },
              { label: "Hours", value: timeLeft.hours },
              { label: "Minutes", value: timeLeft.minutes },
              { label: "Seconds", value: timeLeft.seconds },
            ].map((item) => (
              <div key={item.label} className="bg-card/50 rounded-lg p-3 border">
                <div className="text-2xl font-bold gradient-text">{item.value.toString().padStart(2, "0")}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="bg-secondary/10 rounded-lg p-3 border border-secondary/20">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Zap className="h-4 w-4 text-secondary" />
              <span className="text-sm font-medium text-secondary">Early Launch Possible</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Launch may happen earlier if the 200M pre-launch giveaway pool is exhausted before October 15th, 2025
            </p>
          </div>

          <p className="text-sm text-muted-foreground">
            <strong>Target Date:</strong> October 15th, 2025 | <strong>Estimated Launch Price:</strong> $0.05 on
            PancakeSwap
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, Wallet, Share2, Gift, DollarSign } from "lucide-react"

export function LearnMoreSection() {
  const steps = [
    {
      icon: Share2,
      title: "Complete Social Tasks",
      description: "Join our Telegram, follow on Twitter, like on Facebook, and share our content to 5+ people/groups",
      badge: "Required",
      badgeVariant: "destructive" as const,
    },
    {
      icon: CheckCircle,
      title: "Submit Proof Links",
      description: "Copy and paste the links to your completed social tasks in our verification form",
      badge: "Verification",
      badgeVariant: "secondary" as const,
    },
    {
      icon: Gift,
      title: "Receive Reward",
      description: "After verification, you'll see 1,500 ZUCKA tokens ($75 value) in your website balance",
      badge: "$75 Value",
      badgeVariant: "default" as const,
    },
    {
      icon: Clock,
      title: "Initiate Claim",
      description: "Click 'Initiate Claim' and wait 10 minutes for the security verification period",
      badge: "10 Minutes",
      badgeVariant: "outline" as const,
    },
    {
      icon: DollarSign,
      title: "Pay Gas Fee",
      description: "Finalize your claim by paying a small $0.25 gas fee to complete the blockchain transaction",
      badge: "$0.25 Fee",
      badgeVariant: "outline" as const,
    },
    {
      icon: Wallet,
      title: "Receive Tokens",
      description: "Your 1,500 ZUCKA tokens will be transferred directly to your connected wallet",
      badge: "Complete",
      badgeVariant: "default" as const,
    },
  ]

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="text-2xl gradient-text text-center">How to Claim Your Pre-Launch Giveaway</CardTitle>
        <p className="text-center text-muted-foreground">
          Follow these simple steps to claim your 1,500 ZUCKA tokens from our pre-launch giveaway worth $75
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {steps.map((step, index) => (
            <div key={index} className="flex gap-4 p-4 rounded-lg bg-card/50 border border-border/50">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-lg">{step.title}</h3>
                  <Badge variant={step.badgeVariant} className="text-xs">
                    {step.badge}
                  </Badge>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
              </div>
              <div className="flex-shrink-0 text-2xl font-bold text-muted-foreground/30">
                {String(index + 1).padStart(2, "0")}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-primary/5 rounded-lg border border-primary/20">
          <h4 className="font-semibold text-primary mb-2">💡 Pro Tips:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Use Trust Wallet or MetaMask mobile app browser for best experience</li>
            <li>• Make sure you're on Binance Smart Chain (BSC) network</li>
            <li>• Keep some BNB in your wallet for gas fees</li>
            <li>• The 10-minute wait period is for security and cannot be skipped</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

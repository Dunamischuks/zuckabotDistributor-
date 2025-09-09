"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { formatCountdownTime } from "@/lib/web3"
import { Wallet, Clock, CheckCircle, Coins, Zap, Timer, AlertCircle, Gift, ExternalLink } from "lucide-react"
import Link from "next/link"

interface EnhancedClaimSectionProps {
  userAddress: string | null
  hasClaimed: boolean
  pendingClaimTimestamp: number
  claimAmount: string
  claimFeeWei: string
  onInitiateClaim: () => Promise<void>
  onFinalizeClaim: () => Promise<void>
  secondsUntilFinalize: number
  isLoading: boolean
  isVerified?: boolean
  onVerificationComplete?: () => void
}

export function EnhancedClaimSection({
  userAddress,
  hasClaimed,
  pendingClaimTimestamp,
  claimAmount,
  claimFeeWei,
  onInitiateClaim,
  onFinalizeClaim,
  secondsUntilFinalize,
  isLoading,
  isVerified = false,
  onVerificationComplete,
}: EnhancedClaimSectionProps) {
  const { toast } = useToast()
  const [showGasFeeInfo, setShowGasFeeInfo] = useState(false)
  const [localVerified, setLocalVerified] = useState(false)
  const [localCountdown, setLocalCountdown] = useState(secondsUntilFinalize)

  useEffect(() => {
    if (userAddress) {
      const verified = localStorage.getItem("zuckabot-verified")
      if (verified === "true") {
        setLocalVerified(true)
        if (onVerificationComplete) {
          onVerificationComplete()
        }
      }

      const storedCountdown = localStorage.getItem(`zuckabot-countdown-${userAddress}`)
      const storedTimestamp = localStorage.getItem(`zuckabot-claim-timestamp-${userAddress}`)

      if (storedCountdown && storedTimestamp && pendingClaimTimestamp > 0) {
        const savedTime = Number.parseInt(storedTimestamp)
        const currentTime = Math.floor(Date.now() / 1000)
        const elapsed = currentTime - savedTime
        const remainingTime = Math.max(0, Number.parseInt(storedCountdown) - elapsed)

        console.log("[v0] Restored countdown:", remainingTime, "seconds remaining")
        setLocalCountdown(remainingTime)
      } else if (secondsUntilFinalize > 0) {
        setLocalCountdown(secondsUntilFinalize)
      }
    }
  }, [userAddress, onVerificationComplete, pendingClaimTimestamp, secondsUntilFinalize])

  useEffect(() => {
    if (secondsUntilFinalize > 0 && secondsUntilFinalize !== localCountdown) {
      setLocalCountdown(secondsUntilFinalize)
    }

    if (userAddress && secondsUntilFinalize > 0) {
      localStorage.setItem(`zuckabot-countdown-${userAddress}`, secondsUntilFinalize.toString())
      localStorage.setItem(`zuckabot-claim-timestamp-${userAddress}`, Math.floor(Date.now() / 1000).toString())
    }
  }, [secondsUntilFinalize, userAddress])

  useEffect(() => {
    if (localCountdown > 0 && userAddress && pendingClaimTimestamp > 0) {
      const timer = setInterval(() => {
        setLocalCountdown((prev) => {
          const newValue = Math.max(0, prev - 1)
          console.log("[v0] Local countdown updated:", newValue)

          if (newValue > 0) {
            localStorage.setItem(`zuckabot-countdown-${userAddress}`, newValue.toString())
            localStorage.setItem(`zuckabot-claim-timestamp-${userAddress}`, Math.floor(Date.now() / 1000).toString())
          } else {
            localStorage.removeItem(`zuckabot-countdown-${userAddress}`)
            localStorage.removeItem(`zuckabot-claim-timestamp-${userAddress}`)
          }

          return newValue
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [localCountdown, userAddress, pendingClaimTimestamp])

  const handleVerificationComplete = () => {
    setLocalVerified(true)
    if (onVerificationComplete) {
      onVerificationComplete()
    }
  }

  const handleInitiateClaim = async () => {
    try {
      await onInitiateClaim()

      if (userAddress) {
        const initialCountdown = 10 * 60 + 30 // 10 minutes + 30 seconds
        localStorage.setItem(`zuckabot-countdown-${userAddress}`, initialCountdown.toString())
        localStorage.setItem(`zuckabot-claim-timestamp-${userAddress}`, Math.floor(Date.now() / 1000).toString())
      }

      toast({
        title: "Claim Initiated! ⏰",
        description: "10-minute security countdown has started. Tokens will transfer automatically after finalization.",
      })
    } catch (error) {
      console.error("Failed to initiate claim:", error)
    }
  }

  const handleFinalizeClaim = async () => {
    const confirmed = confirm(
      "Finalize your claim and receive 1,500 ZUCKA tokens? This will transfer tokens instantly to your wallet.",
    )
    if (!confirmed) return

    try {
      console.log("[v0] Finalize claim button clicked")
      await onFinalizeClaim()

      if (userAddress) {
        localStorage.removeItem(`zuckabot-countdown-${userAddress}`)
        localStorage.removeItem(`zuckabot-claim-timestamp-${userAddress}`)
        setLocalCountdown(0)
      }
    } catch (error) {
      console.error("[v0] Failed to finalize claim:", error)
    }
  }

  if (!userAddress) {
    return (
      <Card className="glass crypto-glow">
        <CardContent className="pt-6 px-4 sm:px-6">
          <div className="text-center space-y-4">
            <Wallet className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mx-auto" />
            <h3 className="text-lg sm:text-xl font-semibold">Connect Your Wallet</h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              Connect your wallet to start the verification process and claim your tokens
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (hasClaimed) {
    return (
      <Card className="glass border-green-500/20 bg-green-500/5 crypto-glow">
        <CardContent className="pt-6 px-4 sm:px-6">
          <div className="text-center space-y-4">
            <CheckCircle className="h-12 w-12 sm:h-16 sm:w-16 text-green-500 mx-auto animate-pulse" />
            <h3 className="text-xl sm:text-2xl font-bold text-green-500">🎉 Congratulations! 🎉</h3>
            <div className="space-y-3">
              <p className="text-base sm:text-lg font-semibold text-green-600">
                Your 1,500 ZUCKA tokens have been successfully transferred!
              </p>
              <div className="glass rounded-xl p-4 border border-green-500/30 bg-green-500/10">
                <p className="text-sm sm:text-base text-foreground leading-relaxed">
                  🚀 <strong>Stay connected to our social platforms</strong> for the latest updates on our official
                  PancakeSwap launch and LP injection!
                </p>
              </div>
              <Badge variant="outline" className="px-4 py-2 border-green-500/50 text-green-600">
                <Coins className="h-4 w-4 mr-2" />
                1,500 ZUCKA Claimed ($75.00 Value)
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (pendingClaimTimestamp > 0 && localCountdown <= 0) {
    return (
      <Card className="glass border-green-500/20 bg-green-500/5 crypto-glow">
        <CardHeader className="px-4 sm:px-6">
          <CardTitle className="flex items-center gap-2 text-green-500 text-lg sm:text-xl">
            <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" />
            Ready to Finalize!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 px-4 sm:px-6">
          <div className="text-center space-y-2">
            <div className="text-2xl sm:text-3xl lg:text-6xl font-bold text-green-500 font-mono tracking-wider">
              00:00
            </div>
            <div className="text-xs sm:text-sm text-green-600 mt-2 font-semibold">
              ✅ Security countdown complete - Ready to finalize!
            </div>
          </div>

          <div className="glass rounded-xl p-3 sm:p-4 border border-green-500/20 bg-green-500/5 crypto-glow">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
              <span className="text-xs sm:text-sm font-semibold text-green-600">Instant Smart Contract Transfer</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Tokens will be transferred instantly and automatically from the ZuckaDistributor smart contract to your
              wallet upon finalization. The contract handles everything automatically.
            </p>
          </div>

          <Button
            onClick={handleFinalizeClaim}
            disabled={isLoading}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 h-12 sm:h-11 crypto-glow neon-border animate-pulse"
            size="lg"
          >
            <Zap className="h-4 w-4 mr-2" />
            {isLoading ? "Processing..." : "Finalize Claim"}
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (pendingClaimTimestamp > 0 && localCountdown > 0) {
    const totalSeconds = 10 * 60 + 30 // 10 minutes + 30 seconds buffer to ensure dApp doesn't end before smart contract
    const progress = ((totalSeconds - localCountdown) / totalSeconds) * 100

    return (
      <Card className="glass border-blue-500/20 bg-blue-500/5 crypto-glow">
        <CardHeader className="px-4 sm:px-6">
          <CardTitle className="flex items-center gap-2 text-blue-500 text-lg sm:text-xl">
            <Timer className="h-4 w-4 sm:h-5 sm:w-5" />
            Smart Contract Security Countdown
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6">
          <div className="text-center space-y-4">
            <div className="relative">
              <div className="text-3xl sm:text-4xl lg:text-6xl font-bold text-blue-500 font-mono tracking-wider">
                {formatCountdownTime(localCountdown)}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground mt-2">
                Time remaining until finalize button appears
              </div>
            </div>

            <div className="w-full bg-muted rounded-full h-2 sm:h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-primary transition-all duration-1000 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-xs text-muted-foreground">{Math.round(progress)}% Complete</div>

            <div className="glass rounded-xl p-3 sm:p-4 border border-primary/20 crypto-glow">
              <div className="flex items-start gap-2 mb-3">
                <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <div className="text-left">
                  <p className="text-xs sm:text-sm font-semibold text-blue-500 mb-1">
                    ZuckaDistributor Contract Security
                  </p>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>• 10-minute + 30-second countdown synchronized with smart contract timing</p>
                    <p>• Finalize button will appear automatically when timer reaches 00:00</p>
                    <p>• Tokens transfer instantly from ZuckaDistributor contract upon finalization</p>
                    <p>• No manual intervention required - fully automated blockchain process</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if ((isVerified || localVerified) && !pendingClaimTimestamp) {
    return (
      <Card className="glass crypto-glow">
        <CardHeader className="px-4 sm:px-6">
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <Coins className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            Ready to Claim from Smart Contract
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 px-4 sm:px-6">
          <div className="glass rounded-xl p-3 sm:p-4 text-center space-y-2 crypto-glow">
            <p className="text-base sm:text-lg font-semibold">Your Verified Reward: 1,500 ZUCKA</p>
            <p className="text-xl sm:text-2xl font-bold gradient-text">$0.05 × 1,500 = $75.00</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Projected Value at PancakeSwap Launch</p>
          </div>

          <Button
            onClick={handleInitiateClaim}
            disabled={isLoading}
            className="w-full gradient-bg text-white font-semibold py-3 h-12 sm:h-11"
            size="lg"
          >
            {isLoading ? "Initiating..." : "Initiate Claim"}
          </Button>

          <div className="glass rounded-xl p-3 sm:p-4 border border-primary/20 crypto-glow">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
              <span className="text-xs sm:text-sm font-semibold gradient-text">Smart Contract Process</span>
            </div>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>1. Click "Initiate Claim" to start the ZuckaDistributor contract process</p>
              <p>2. Wait for 10-minute + 30-second security countdown (synchronized with smart contract)</p>
              <p>3. "Finalize" button appears automatically when timer reaches 00:00</p>
              <p>4. Confirm to execute the smart contract function</p>
              <p>5. 1,500 ZUCKA tokens transfer instantly to your wallet</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!isVerified && !localVerified) {
    return (
      <Card className="glass crypto-glow">
        <CardHeader className="px-4 sm:px-6">
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <Gift className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            Complete Social Media Verification
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 px-4 sm:px-6">
          <div className="text-center space-y-4">
            <div className="glass rounded-xl p-4 border border-primary/20 crypto-glow">
              <div className="text-2xl font-bold gradient-text mb-2">1,500 ZUCKA Tokens</div>
              <div className="text-lg font-semibold text-primary mb-2">Worth $75.00</div>
              <p className="text-sm text-muted-foreground">
                Complete social media tasks to verify your eligibility for the pre-launch giveaway
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                <span>Join Telegram channel and share to 5+ people</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                <span>Follow X (Twitter) account and retweet</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                <span>Like Facebook page and share post</span>
              </div>
            </div>

            <Link href="/giveaway">
              <Button className="w-full gradient-bg text-white font-semibold py-3 h-12 sm:h-11" size="lg">
                <Gift className="h-4 w-4 mr-2" />
                Start Verification Process
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </Link>

            <div className="bg-primary/5 rounded-lg p-3 border border-primary/20">
              <p className="text-xs text-muted-foreground text-center">
                💡 Complete all social media tasks to unlock your 1,500 ZUCKA token claim
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return null
}

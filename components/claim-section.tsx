"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Clock, Gift, CheckCircle, AlertCircle } from "lucide-react"
import { formatEther } from "ethers"

interface ClaimSectionProps {
  userAddress: string | null
  hasClaimed: boolean
  pendingClaimTimestamp: number
  claimAmount: string
  claimFeeWei: string
  onInitiateClaim: () => void
  onFinalizeClaim: () => void
  secondsUntilFinalize: number
  isLoading?: boolean
}

export function ClaimSection({
  userAddress,
  hasClaimed,
  pendingClaimTimestamp,
  claimAmount,
  claimFeeWei,
  onInitiateClaim,
  onFinalizeClaim,
  secondsUntilFinalize,
  isLoading = false,
}: ClaimSectionProps) {
  const [timeLeft, setTimeLeft] = useState(secondsUntilFinalize)

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const getClaimStatus = () => {
    if (!userAddress) return { status: "Connect Wallet", color: "secondary", icon: AlertCircle }
    if (hasClaimed) return { status: "Already Claimed", color: "default", icon: CheckCircle }
    if (pendingClaimTimestamp > 0) {
      if (secondsUntilFinalize > 0) {
        return { status: `Waiting ${formatTime(secondsUntilFinalize)}`, color: "destructive", icon: Clock }
      }
      return { status: "Ready to Finalize", color: "default", icon: Gift }
    }
    return { status: "Ready to Claim", color: "default", icon: Gift }
  }

  const claimStatus = getClaimStatus()
  const canInitiate = userAddress && !hasClaimed && pendingClaimTimestamp === 0
  const canFinalize = userAddress && !hasClaimed && pendingClaimTimestamp > 0 && secondsUntilFinalize <= 0

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gift className="h-5 w-5 text-primary" />
          Claim Your ZUCKA Tokens
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center space-y-2">
          <div className="text-3xl font-bold text-primary">{formatEther(claimAmount)} ZUCKA</div>
          <Badge variant={claimStatus.color as any} className="flex items-center gap-1 w-fit mx-auto">
            <claimStatus.icon className="h-3 w-3" />
            {claimStatus.status}
          </Badge>
        </div>

        {pendingClaimTimestamp > 0 && secondsUntilFinalize > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Verification Progress</span>
              <span>{formatTime(timeLeft)}</span>
            </div>
            <Progress value={((600 - secondsUntilFinalize) / 600) * 100} className="h-2" />
          </div>
        )}

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span>Claim Fee:</span>
            <span className="font-medium">{formatEther(claimFeeWei)} BNB</span>
          </div>

          <div className="space-y-2">
            {canInitiate && (
              <Button onClick={onInitiateClaim} disabled={isLoading} className="w-full" size="lg">
                {isLoading ? "Processing..." : "Initiate Claim"}
              </Button>
            )}

            {canFinalize && (
              <Button onClick={onFinalizeClaim} disabled={isLoading} className="w-full" size="lg">
                {isLoading ? "Processing..." : "Finalize Claim"}
              </Button>
            )}

            {!userAddress && (
              <Button disabled className="w-full" size="lg">
                Connect Wallet to Claim
              </Button>
            )}

            {hasClaimed && (
              <Button disabled className="w-full" size="lg">
                <CheckCircle className="h-4 w-4 mr-2" />
                Tokens Already Claimed
              </Button>
            )}
          </div>
        </div>

        <div className="text-xs text-muted-foreground text-center">
          Claims require a 10-minute verification period for security
        </div>
      </CardContent>
    </Card>
  )
}

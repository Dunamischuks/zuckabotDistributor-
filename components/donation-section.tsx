"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Heart, DollarSign } from "lucide-react"

interface DonationSectionProps {
  userAddress: string | null
  onDonate: (amount: string) => void
  isLoading?: boolean
  bnbPrice: string
}

export function DonationSection({ userAddress, onDonate, isLoading = false, bnbPrice }: DonationSectionProps) {
  const [donationAmount, setDonationAmount] = useState("")
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null)

  const presetAmounts = ["0.01", "0.05", "0.1", "0.5"]

  const handlePresetClick = (amount: string) => {
    setDonationAmount(amount)
    setSelectedPreset(amount)
  }

  const handleDonate = () => {
    if (donationAmount && Number.parseFloat(donationAmount) > 0) {
      onDonate(donationAmount)
      setDonationAmount("")
      setSelectedPreset(null)
    }
  }

  const getUsdValue = (bnbAmount: string) => {
    if (!bnbAmount || !bnbPrice) return "0.00"
    return (Number.parseFloat(bnbAmount) * Number.parseFloat(bnbPrice)).toFixed(2)
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-accent" />
          Support the Project
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">Help fund development and community initiatives</p>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-2">
            {presetAmounts.map((amount) => (
              <Button
                key={amount}
                variant={selectedPreset === amount ? "default" : "outline"}
                size="sm"
                onClick={() => handlePresetClick(amount)}
                className="flex flex-col gap-1 h-auto py-2"
              >
                <span className="font-medium">{amount} BNB</span>
                <span className="text-xs opacity-70">${getUsdValue(amount)}</span>
              </Button>
            ))}
          </div>

          <div className="space-y-2">
            <div className="relative">
              <Input
                type="number"
                placeholder="Enter BNB amount"
                value={donationAmount}
                onChange={(e) => {
                  setDonationAmount(e.target.value)
                  setSelectedPreset(null)
                }}
                className="pr-16"
                step="0.001"
                min="0"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">BNB</div>
            </div>

            {donationAmount && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">USD Value:</span>
                <Badge variant="outline" className="flex items-center gap-1">
                  <DollarSign className="h-3 w-3" />${getUsdValue(donationAmount)}
                </Badge>
              </div>
            )}
          </div>

          <Button
            onClick={handleDonate}
            disabled={!userAddress || !donationAmount || Number.parseFloat(donationAmount) <= 0 || isLoading}
            className="w-full"
            size="lg"
          >
            {isLoading ? "Processing..." : !userAddress ? "Connect Wallet to Donate" : "Donate"}
          </Button>
        </div>

        <div className="text-xs text-muted-foreground text-center">
          Donations help fund development, marketing, and community rewards
        </div>
      </CardContent>
    </Card>
  )
}

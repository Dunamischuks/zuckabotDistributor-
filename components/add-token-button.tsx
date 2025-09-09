"use client"

import { Button } from "@/components/ui/button"
import { Wallet, Zap } from "lucide-react"
import { addTokenToWallet } from "@/lib/web3"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"

interface AddTokenButtonProps {
  userAddress: string | null
}

export function AddTokenButton({ userAddress }: AddTokenButtonProps) {
  const { toast } = useToast()
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToken = async () => {
    if (!userAddress) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet first",
        variant: "destructive",
      })
      return
    }

    setIsAdding(true)
    try {
      await addTokenToWallet()
      toast({
        title: "Token Added Successfully! 🎉",
        description: "ZUCKA token has been instantly added to your wallet",
      })
    } catch (error: any) {
      toast({
        title: "Failed to Add Token",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <div className="space-y-4">
      <Button
        onClick={handleAddToken}
        disabled={!userAddress || isAdding}
        size="lg"
        className="w-full gradient-bg shadow-lg crypto-glow transition-colors duration-200 h-12 sm:h-11"
      >
        <Zap className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
        <span className="text-sm sm:text-base">{isAdding ? "Adding Token..." : "Add ZuckaBot Instantly"}</span>
        <Wallet className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
      </Button>

      <div className="glass rounded-xl p-3 sm:p-4 border border-primary/20 crypto-glow">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
          <span className="text-xs sm:text-sm font-semibold gradient-text">Instant Import</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Click above to instantly add ZUCKA token to your wallet. No manual contract address needed!
        </p>
      </div>
    </div>
  )
}

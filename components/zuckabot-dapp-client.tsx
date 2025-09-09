"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { WalletConnectModal } from "@/components/wallet-connect-modal"
import { Navigation } from "@/components/navigation"
import { ClientOnlyWrapper } from "@/components/client-only-wrapper"
import { ContractStats } from "@/components/contract-stats"
import { EnhancedClaimSection } from "@/components/enhanced-claim-section"
import { AddTokenButton } from "@/components/add-token-button"
import { LearnMoreSection } from "@/components/learn-more-section"
import {
  connectWallet,
  getDistributorContractReadOnly,
  getDistributorContract,
  formatTokenAmount,
  getUserClaimState,
  saveClaimStateToStorage,
  loadClaimStateFromStorage,
  clearClaimStateFromStorage,
  DISTRIBUTOR_ADDRESS,
  ZUCKA_TOKEN_ADDRESS,
  TREASURY_ADDRESS,
} from "@/lib/web3"

function ZuckabotDAppContent() {
  const { toast } = useToast()

  // Wallet state
  const [userAddress, setUserAddress] = useState<string | null>(null)
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [walletError, setWalletError] = useState<string | null>(null)

  // FAQ state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

  // Contract state
  const [contractStats, setContractStats] = useState({
    totalDistributed: "0",
    totalClaimants: 0,
    bnbPrice: "0",
  })

  // User state
  const [userState, setUserState] = useState({
    hasClaimed: false,
    pendingClaimTimestamp: 0,
    secondsUntilFinalize: 0,
    claimAmount: "0",
    claimFeeWei: "0",
  })

  const [isVerified, setIsVerified] = useState(false)
  const [syncInterval, setSyncInterval] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const autoReconnectWallet = async () => {
      try {
        if (typeof window === "undefined") return

        // Check if wallet was previously connected
        const wasConnected = localStorage.getItem("zuckabot-wallet-connected")
        if (wasConnected === "true" && window.ethereum) {
          const accounts = await window.ethereum.request({ method: "eth_accounts" })
          if (accounts.length > 0) {
            setUserAddress(accounts[0])
            console.log("[v0] Auto-reconnected wallet:", accounts[0])
          } else {
            // Clear the connection flag if no accounts found
            localStorage.removeItem("zuckabot-wallet-connected")
          }
        }
      } catch (error) {
        console.error("[v0] Auto-reconnect failed:", error)
        if (typeof window !== "undefined") {
          localStorage.removeItem("zuckabot-wallet-connected")
        }
      }
    }

    autoReconnectWallet()
  }, [])

  useEffect(() => {
    if (userAddress) {
      console.log("[v0] User address changed, syncing state:", userAddress)

      // Load verification status
      if (typeof window !== "undefined") {
        const verified = localStorage.getItem("zuckabot-verified")
        if (verified === "true") {
          setIsVerified(true)
        }
      }

      // Sync claim state with contract
      syncUserStateWithContract(userAddress)
    } else {
      // Clear sync interval when wallet disconnected
      if (syncInterval) {
        clearInterval(syncInterval)
        setSyncInterval(null)
      }
    }
  }, [userAddress])

  useEffect(() => {
    if (userAddress && userState.pendingClaimTimestamp > 0 && userState.secondsUntilFinalize > 0) {
      console.log("[v0] Starting periodic contract sync during countdown")

      // Sync every 30 seconds during countdown
      const interval = setInterval(async () => {
        try {
          await syncUserStateWithContract(userAddress)
        } catch (error) {
          console.error("[v0] Periodic sync failed:", error)
        }
      }, 30000)

      setSyncInterval(interval)

      return () => {
        clearInterval(interval)
        setSyncInterval(null)
      }
    } else if (syncInterval) {
      clearInterval(syncInterval)
      setSyncInterval(null)
    }
  }, [userAddress, userState.pendingClaimTimestamp, userState.secondsUntilFinalize])

  useEffect(() => {
    console.log("[v0] Component mounted, loading contract data...")
    loadContractData()
  }, [])

  // Contract addresses for display
  const contractAddresses = [
    {
      name: "Zuckabot Token",
      address: ZUCKA_TOKEN_ADDRESS,
      icon: "💰",
      url: "https://bscscan.com/token/" + ZUCKA_TOKEN_ADDRESS,
    },
    {
      name: "Distributor",
      address: DISTRIBUTOR_ADDRESS,
      icon: "🔗",
      url: "https://bscscan.com/address/" + DISTRIBUTOR_ADDRESS,
    },
    { name: "Treasury", address: TREASURY_ADDRESS, icon: "🏦", url: "https://bscscan.com/address/" + TREASURY_ADDRESS },
  ]

  const faqData = [
    {
      question: "What is the Zuckabot Pre-Launch Giveaway?",
      answer:
        "We're conducting a massive 200,000,000 ZUCKA token pre-launch giveaway to build a strong community and create viral adoption. This strategic giveaway helps establish our ecosystem before the official PancakeSwap launch on October 1st, 2025.",
    },
    {
      question: "Why are you giving away 200M tokens?",
      answer:
        "The pre-launch giveaway is part of our community-building and viral marketing strategy. By distributing tokens to early adopters, we're creating a strong foundation for the Zuckabot ecosystem and ensuring widespread adoption from day one.",
    },
    {
      question: "How do I claim my tokens?",
      answer:
        "Complete the social media verification tasks (join/follow/share on Telegram, Twitter, and Facebook), submit your proof links, wait for verification, then initiate your claim and wait 10 minutes before finalizing.",
    },
    {
      question: "How much can I claim?",
      answer:
        "Each wallet can claim 1,500 ZUCKA tokens through our distributor contract. At the projected launch price of $0.05, this equals $75 worth of tokens.",
    },
    {
      question: "Are there any fees to claim tokens?",
      answer:
        "Yes, there's a small gas fee (approximately $0.25 worth of BNB) required to finalize your claim. This covers the blockchain transaction costs and helps prevent spam claims. The fee is only charged when you finalize your claim.",
    },
    {
      question: "What are the social media requirements?",
      answer:
        "You must join our Telegram group, follow our Twitter account, like our Facebook page, and share/retweet/repost our promotional content to at least 5 people or groups. Then provide the proof links in our verification form.",
    },
    {
      question: "When will the token launch officially?",
      answer:
        "The official PancakeSwap launch is scheduled for October 1st, 2025. However, the launch may happen earlier if the 200M token giveaway pool is depleted before that date.",
    },
    {
      question: "Is the token contract verified?",
      answer:
        "Yes! The Zuckabot token contract has been deployed, verified on BSCScan, and is fully transparent. You can view all contract details and transactions on the Binance Smart Chain explorer.",
    },
  ]

  // Load contract data
  const loadContractData = async () => {
    try {
      console.log("[v0] Starting contract data load...")

      setContractStats({
        totalDistributed: "Loading...",
        totalClaimants: 0,
        bnbPrice: "Loading...",
      })

      const contract = await getDistributorContractReadOnly()
      if (!contract) {
        console.error("[v0] Failed to get read-only contract")
        throw new Error("Contract not available")
      }

      console.log("[v0] Read-only contract connected successfully")
      console.log("[v0] Contract address:", contract.target || contract.address)

      console.log("[v0] Fetching CLAIM_AMOUNT from contract...")
      const claimAmount = await contract.CLAIM_AMOUNT()
      console.log("[v0] CLAIM_AMOUNT fetched:", claimAmount.toString())

      console.log("[v0] Fetching CLAIM_FEE_USD18 from contract...")
      const claimFeeUsd18 = await contract.CLAIM_FEE_USD18()
      console.log("[v0] CLAIM_FEE_USD18 fetched:", claimFeeUsd18.toString())

      console.log("[v0] Fetching getTotals from contract...")
      const totals = await contract.getTotals()
      console.log("[v0] getTotals fetched - tokens:", totals[0].toString(), "bnb:", totals[1].toString())

      console.log("[v0] Fetching requiredClaimWei from contract...")
      const claimFeeWei = await contract.requiredClaimWei()
      console.log("[v0] requiredClaimWei fetched:", claimFeeWei.toString())

      console.log("[v0] Fetching BNB price from contract...")
      const bnbPriceWei = await contract.getLatestBNBPrice18()
      console.log("[v0] BNB price fetched:", bnbPriceWei.toString())

      const tokensDistributed = totals[0].toString() // totalClaimedTokens
      const bnbCollected = totals[1].toString() // totalDonatedBNB
      const totalClaimants = Math.floor(Number(tokensDistributed) / Number(claimAmount))
      const bnbPrice = (Number(bnbPriceWei) / 1e18).toFixed(2)

      console.log("[v0] Processed real contract values:")
      console.log("[v0] - Claim amount:", claimAmount.toString())
      console.log("[v0] - Claim fee USD18:", claimFeeUsd18.toString())
      console.log("[v0] - Tokens distributed:", tokensDistributed)
      console.log("[v0] - BNB collected:", bnbCollected)
      console.log("[v0] - Total claimants:", totalClaimants)
      console.log("[v0] - BNB price:", bnbPrice)
      console.log("[v0] - Claim fee (Wei):", claimFeeWei.toString())

      setContractStats({
        totalDistributed: formatTokenAmount(tokensDistributed),
        totalClaimants: totalClaimants,
        bnbPrice: bnbPrice,
      })

      setUserState((prev) => ({
        ...prev,
        claimAmount: claimAmount.toString(),
        claimFeeWei: claimFeeWei.toString(),
      }))

      console.log("[v0] Contract data loaded successfully with REAL blockchain data")
    } catch (error: any) {
      console.error("[v0] CRITICAL ERROR loading contract data:", error.message || error)
      console.error("[v0] Full error object:", error)

      toast({
        title: "Contract Connection Failed",
        description: `Unable to fetch data from smart contract: ${error.message}`,
        variant: "destructive",
      })

      setContractStats({
        totalDistributed: "Loading...",
        totalClaimants: 0,
        bnbPrice: "Loading...",
      })

      setUserState((prev) => ({
        ...prev,
        claimAmount: "0",
        claimFeeWei: "0",
      }))
    }
  }

  // Copy to clipboard
  const copyToClipboard = (text: string) => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text)
      toast({
        title: "Copied",
        description: "Address copied to clipboard",
      })
    }
  }

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index)
  }

  const syncUserStateWithContract = async (address: string) => {
    try {
      console.log("[v0] Syncing user state with contract for:", address)

      const contractState = await getUserClaimState(address)
      console.log("[v0] Contract state received:", contractState)

      if (contractState) {
        setUserState((prev) => ({
          ...prev,
          hasClaimed: contractState.hasClaimed,
          pendingClaimTimestamp: contractState.pendingClaimTimestamp,
          secondsUntilFinalize: contractState.secondsUntilFinalize,
        }))

        // Save to localStorage for persistence
        saveClaimStateToStorage(address, contractState)

        console.log("[v0] User state synced successfully with contract:", {
          hasClaimed: contractState.hasClaimed,
          pendingClaimTimestamp: contractState.pendingClaimTimestamp,
          secondsUntilFinalize: contractState.secondsUntilFinalize,
        })

        return contractState
      } else {
        throw new Error("No contract state received")
      }
    } catch (error) {
      console.error("[v0] Failed to sync user state with contract:", error)

      // Try to load from localStorage as fallback
      const storedState = loadClaimStateFromStorage(address)
      if (storedState) {
        console.log("[v0] Using stored state as fallback:", storedState)
        setUserState((prev) => ({
          ...prev,
          hasClaimed: storedState.hasClaimed || false,
          pendingClaimTimestamp: storedState.pendingClaimTimestamp || 0,
          secondsUntilFinalize: storedState.secondsUntilFinalize || 0,
        }))
        return storedState
      }

      // Re-throw error if no fallback available
      throw error
    }
  }

  const handleInitiateClaim = async () => {
    if (!userAddress) {
      toast({
        title: "Wallet Required",
        description: "Please connect your wallet first",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      console.log("[v0] Initiating claim for address:", userAddress)

      const contract = await getDistributorContract()
      if (!contract) {
        throw new Error("Unable to connect to distributor contract")
      }

      console.log("[v0] Calling initiateClaim on smart contract...")
      const tx = await contract.initiateClaim()
      console.log("[v0] Transaction sent:", tx.hash)

      toast({
        title: "Claim Initiated! ⏰",
        description: "Transaction sent. Waiting for confirmation...",
      })

      const receipt = await tx.wait()
      console.log("[v0] Transaction confirmed:", receipt.hash)

      const currentTime = Math.floor(Date.now() / 1000)
      const pendingTimestamp = currentTime
      const secondsUntilFinalize = 600 // 10 minutes

      setUserState((prev) => ({
        ...prev,
        pendingClaimTimestamp: pendingTimestamp,
        secondsUntilFinalize: secondsUntilFinalize,
      }))

      // Save state to localStorage immediately
      const newState = {
        hasClaimed: false,
        pendingClaimTimestamp: pendingTimestamp,
        secondsUntilFinalize: secondsUntilFinalize,
      }
      saveClaimStateToStorage(userAddress, newState)

      toast({
        title: "Claim Initiated Successfully! ⏰",
        description: "10-minute security countdown has started. You can finalize after the timer ends.",
      })

      // Background sync (non-blocking)
      try {
        console.log("[v0] Background sync after successful transaction...")
        await syncUserStateWithContract(userAddress)
      } catch (syncError) {
        console.error("[v0] Background sync failed (non-critical):", syncError)
      }
    } catch (error: any) {
      console.error("[v0] Failed to initiate claim:", error)
      toast({
        title: "Claim Failed",
        description: error.message || "Failed to initiate claim. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleFinalizeClaim = async () => {
    if (!userAddress) {
      toast({
        title: "Wallet Required",
        description: "Please connect your wallet first",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      console.log("[v0] Finalizing claim for address:", userAddress)

      const contract = await getDistributorContract()
      if (!contract) {
        throw new Error("Unable to connect to distributor contract")
      }

      console.log("[v0] Calling finalizeClaim on smart contract...")
      const tx = await contract.finalizeClaim({ value: userState.claimFeeWei })
      console.log("[v0] Transaction sent:", tx.hash)

      toast({
        title: "Finalizing Claim...",
        description: "Transaction sent. Waiting for confirmation...",
      })

      const receipt = await tx.wait()
      console.log("[v0] Transaction confirmed:", receipt.hash)

      setUserState((prev) => ({
        ...prev,
        hasClaimed: true,
        pendingClaimTimestamp: 0,
        secondsUntilFinalize: 0,
      }))

      clearClaimStateFromStorage(userAddress)

      toast({
        title: "🎉 Congratulations! Tokens Transferred! 🎉",
        description:
          "1,500 ZUCKA tokens have been successfully transferred to your wallet! Stay connected to our social platforms for LP launch updates.",
      })

      // Reload contract data to update stats
      loadContractData()

      // Background sync (non-blocking)
      try {
        await syncUserStateWithContract(userAddress)
      } catch (syncError) {
        console.error("[v0] Background sync failed (non-critical):", syncError)
      }
    } catch (error: any) {
      console.error("[v0] Failed to finalize claim:", error)
      toast({
        title: "Finalize Failed",
        description: error.message || "Failed to finalize claim. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerificationComplete = () => {
    // Placeholder for verification complete logic
  }

  const handleModalClose = () => {
    setIsWalletModalOpen(false)
  }

  const handleWalletConnect = async (walletType: string) => {
    setIsLoading(true)
    setWalletError(null)

    try {
      console.log(`[v0] Attempting to connect ${walletType} wallet...`)
      const address = await connectWallet(walletType)

      if (address) {
        setUserAddress(address)
        if (typeof window !== "undefined") {
          localStorage.setItem("zuckabot-wallet-connected", "true")
        }
        setIsWalletModalOpen(false)

        toast({
          title: "Wallet Connected",
          description: `Successfully connected to ${walletType}`,
        })

        console.log(`[v0] Successfully connected ${walletType}:`, address)
      } else {
        throw new Error("No address returned from wallet connection")
      }
    } catch (error: any) {
      console.error(`[v0] Failed to connect ${walletType}:`, error)
      setWalletError(error.message || `Failed to connect ${walletType}`)

      toast({
        title: "Connection Failed",
        description: error.message || `Failed to connect ${walletType}`,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleWalletDisconnect = () => {
    if (syncInterval) {
      clearInterval(syncInterval)
      setSyncInterval(null)
    }

    setUserAddress(null)
    if (typeof window !== "undefined") {
      localStorage.removeItem("zuckabot-wallet-connected")
      localStorage.removeItem("zuckabot-verified")
    }
    setIsVerified(false)

    // Reset user state
    setUserState({
      hasClaimed: false,
      pendingClaimTimestamp: 0,
      secondsUntilFinalize: 0,
      claimAmount: "0",
      claimFeeWei: "0",
    })

    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected successfully",
    })
  }

  return (
    <div className="min-h-screen bg-background grid-pattern w-full overflow-x-hidden">
      <header className="bg-gradient-to-r from-primary via-green-600 to-secondary text-white sticky top-0 z-40 shadow-2xl backdrop-blur-md border-b border-white/10 w-full">
        <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 py-2 sm:py-3 md:py-4">
          <div className="flex items-center justify-between gap-1 sm:gap-2 md:gap-4 w-full">
            <div className="flex items-center gap-1 sm:gap-2 md:gap-3 min-w-0 flex-1 max-w-[60%] sm:max-w-none">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-lg sm:rounded-xl md:rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center neon-border float-animation flex-shrink-0">
                <img
                  src="/images/zuckabot-logo.png"
                  alt="ZuckaBot"
                  className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 object-contain"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-sm sm:text-lg md:text-xl lg:text-2xl font-serif font-bold neon-glow truncate">
                  ZuckaBot
                </h1>
                <p className="text-xs sm:text-sm text-white/90 flex items-center gap-1 font-sans truncate">
                  <span>🤖</span>
                  <span className="hidden xs:inline">AI-Powered Blockchain Future</span>
                  <span className="xs:hidden">AI Blockchain</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              <Button
                variant="outline"
                size="sm"
                className="bg-secondary/20 text-white border-secondary/50 hover:bg-secondary/30 backdrop-blur-sm hidden lg:flex crypto-glow text-xs"
              >
                <span className="mr-1">🎁</span>
                Rewards
              </Button>

              {userAddress ? (
                <div className="flex items-center gap-1">
                  <Badge className="glass-card text-primary px-1 sm:px-2 md:px-3 py-1 backdrop-blur-sm border-2 border-primary/60 text-xs shadow-lg crypto-glow">
                    <span className="mr-1">👛</span>
                    <span className="font-semibold text-xs">
                      {userAddress.slice(0, 3)}...{userAddress.slice(-2)}
                    </span>
                  </Badge>
                  <Button
                    onClick={handleWalletDisconnect}
                    variant="outline"
                    size="sm"
                    className="bg-red-500/20 text-red-300 border-red-400/50 hover:bg-red-500/30 backdrop-blur-sm text-xs px-1 sm:px-2 py-1 shadow-lg"
                  >
                    ×
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => setIsWalletModalOpen(true)}
                  className="gradient-bg text-white px-2 sm:px-3 md:px-4 lg:px-6 py-1 sm:py-2 crypto-glow text-xs sm:text-sm font-semibold border-2 border-secondary/30 shadow-lg"
                >
                  <span className="sm:hidden">Connect</span>
                  <span className="hidden sm:inline">Connect Wallet</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <Navigation />

      <main className="w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-6 py-3 sm:py-4 md:py-6 lg:py-8 space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8 overflow-x-hidden">
        <section className="text-center space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8 py-4 sm:py-6 md:py-8 lg:py-12 xl:py-16 w-full">
          <div className="space-y-3 sm:space-y-4 md:space-y-6">
            <div className="space-y-1 sm:space-y-2 md:space-y-4">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-serif font-black gradient-text neon-glow leading-tight px-1">
                AI Innovation Meets
              </h2>
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-serif font-bold text-secondary gradient-text leading-tight px-1">
                Decentralized Finance
              </h3>
            </div>

            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 mx-auto rounded-xl sm:rounded-2xl md:rounded-3xl glass-card flex items-center justify-center neon-border float-animation pulse-glow">
              <img
                src="/images/zuckabot-logo.png"
                alt="ZuckaBot Logo"
                className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 object-contain"
              />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-serif font-black gradient-text neon-glow leading-tight px-1 sm:px-2">
              ZuckaBot Pre-Launch Giveaway
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-sans text-balance px-2 sm:px-4">
              Experience the future of AI-powered cryptocurrency with ZuckaBot - inspired by Mark Zuckerberg's
              groundbreaking AI innovations. Join our exclusive pre-launch giveaway where artificial intelligence meets
              decentralized finance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 max-w-4xl mx-auto px-1 sm:px-2">
            <div className="glass-card p-3 sm:p-4 md:p-6 lg:p-8 rounded-xl sm:rounded-2xl md:rounded-3xl border-2 border-primary/30 neon-border crypto-glow">
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-primary mb-1 sm:mb-2 md:mb-3 gradient-text leading-tight">
                200,000,000 ZUCKA
              </div>
              <div className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground font-semibold">
                Pre-Launch Giveaway Pool
              </div>
            </div>
            <div className="glass-card p-3 sm:p-4 md:p-6 lg:p-8 rounded-xl sm:rounded-2xl md:rounded-3xl border-2 border-secondary/30 neon-border crypto-glow">
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-secondary mb-1 sm:mb-2 md:mb-3 gradient-text leading-tight">
                $0.05 per ZUCKA
              </div>
              <div className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground font-semibold">
                Projected Launch Price
              </div>
            </div>
          </div>

          <div className="glass-card p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl md:rounded-2xl border-2 border-primary/20 max-w-3xl mx-auto">
            <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-foreground leading-relaxed px-1">
              Building a strong community through strategic token distribution. Get your share before the official
              PancakeSwap launch on <span className="text-primary font-bold gradient-text">October 1st, 2025</span>.
            </p>
          </div>
        </section>

        {/* Contract Stats */}
        <ContractStats
          totalDistributed={contractStats.totalDistributed}
          totalClaimants={contractStats.totalClaimants}
          bnbPrice={contractStats.bnbPrice}
        />

        {/* Enhanced Claim Section */}
        <EnhancedClaimSection
          userAddress={userAddress}
          hasClaimed={userState.hasClaimed}
          pendingClaimTimestamp={userState.pendingClaimTimestamp}
          claimAmount={userState.claimAmount}
          claimFeeWei={userState.claimFeeWei}
          secondsUntilFinalize={userState.secondsUntilFinalize}
          isLoading={isLoading}
          isVerified={isVerified}
          onVerificationComplete={handleVerificationComplete}
          onInitiateClaim={handleInitiateClaim}
          onFinalizeClaim={handleFinalizeClaim}
        />

        {/* Add Token Button */}
        <AddTokenButton userAddress={userAddress} />

        <section className="space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8 w-full">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-black text-center gradient-text neon-glow px-1">
            Verified Smart Contracts
          </h2>
          <div className="grid gap-3 sm:gap-4 md:gap-6 lg:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
            {contractAddresses.map((contract, index) => (
              <div
                key={index}
                className="glass-card p-3 sm:p-4 md:p-6 lg:p-8 rounded-xl sm:rounded-2xl md:rounded-3xl border-2 border-primary/20 neon-border crypto-glow w-full"
              >
                <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4 md:mb-6">
                  <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl">{contract.icon}</span>
                  <h3 className="font-bold text-sm sm:text-base md:text-lg lg:text-xl gradient-text text-left leading-tight">
                    {contract.name}
                  </h3>
                </div>
                <div className="space-y-2 sm:space-y-3 md:space-y-4">
                  <div className="font-mono text-xs sm:text-sm bg-muted/80 p-2 sm:p-3 md:p-4 rounded-md sm:rounded-lg md:rounded-xl break-all border border-primary/20 w-full overflow-hidden">
                    {contract.address}
                  </div>
                  <div className="flex gap-1 sm:gap-2 md:gap-3 w-full">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(contract.address)}
                      className="flex-1 border-primary/30 hover:border-primary/60 crypto-glow text-xs sm:text-sm px-2 py-1"
                    >
                      Copy
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        if (typeof window !== "undefined") {
                          window.open(contract.url, "_blank")
                        }
                      }}
                      className="flex-1 border-secondary/30 hover:border-secondary/60 crypto-glow text-xs sm:text-sm px-2 py-1"
                    >
                      <span className="sm:hidden">BSCScan</span>
                      <span className="hidden sm:inline">View on BSCScan</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Learn More Section */}
        <LearnMoreSection />

        <section className="space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8 w-full">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-black text-center gradient-text neon-glow px-1">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3 sm:space-y-4 md:space-y-6 max-w-4xl mx-auto w-full">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="glass-card rounded-xl sm:rounded-2xl md:rounded-3xl border-2 border-primary/20 neon-border overflow-hidden crypto-glow w-full"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-3 sm:p-4 md:p-6 lg:p-8 text-left hover:bg-primary/5 transition-colors"
                >
                  <div className="flex justify-between items-center gap-2">
                    <h3 className="font-bold text-secondary text-sm sm:text-base md:text-lg leading-tight text-balance">
                      {faq.question}
                    </h3>
                    <span className="text-primary text-lg flex-shrink-0">{openFaqIndex === index ? "−" : "+"}</span>
                  </div>
                </button>
                {openFaqIndex === index && (
                  <div className="px-3 sm:px-4 md:px-6 lg:px-8 pb-3 sm:pb-4 md:pb-6 lg:pb-8">
                    <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Wallet Connect Modal */}
        <WalletConnectModal
          isOpen={isWalletModalOpen}
          onClose={handleModalClose}
          onConnect={handleWalletConnect}
          error={walletError}
        />
      </main>

      <footer className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 border-t border-primary/20 mt-4 sm:mt-6 md:mt-8 w-full">
        <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
          <div className="flex flex-col items-center space-y-3 sm:space-y-4 text-center">
            <div className="flex items-center gap-2 sm:gap-3">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/zuckabot_face_256-BAhGcccC22GRGc3MlTEuJTr9VXRM0h.png"
                alt="ZuckaBot Logo"
                className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 object-contain"
              />
              <span className="text-base sm:text-lg md:text-xl font-serif font-bold gradient-text">ZuckaBot</span>
            </div>

            <div className="glass-card p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl border-2 border-secondary/30 max-w-2xl w-full">
              <div className="flex items-center justify-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                <span className="text-lg sm:text-xl">📱</span>
                <h3 className="font-bold text-secondary text-sm sm:text-base md:text-lg leading-tight text-balance">
                  Best Experience Tip
                </h3>
              </div>
              <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">
                For the best experience and easy wallet connection, we recommend using your wallet's built-in browser
                (MetaMask Browser, Trust Wallet Browser, etc.) to access this dApp.
              </p>
            </div>

            <div className="text-xs sm:text-sm text-muted-foreground">
              <p>© 2025 ZuckaBot. AI-Powered Blockchain Innovation.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default function ZuckabotDAppClient() {
  return (
    <ClientOnlyWrapper>
      <ZuckabotDAppContent />
    </ClientOnlyWrapper>
  )
}

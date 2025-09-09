"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Wallet, ExternalLink, AlertCircle, Smartphone, Download, Network, Zap, CheckCircle } from "lucide-react"
import { isWalletAvailable, getWalletInstallUrl, detectBrowserType } from "@/lib/web3"
import { useState, useEffect } from "react"

interface WalletConnectModalProps {
  isOpen: boolean
  onClose: () => void
  onConnect: (walletType: string) => void
  error?: string
}

export function WalletConnectModal({ isOpen, onClose, onConnect, error }: WalletConnectModalProps) {
  const [connecting, setConnecting] = useState<string | null>(null)
  const [browserInfo, setBrowserInfo] = useState<{
    isWeb3Capable: boolean
    browserType: string
    isMobile: boolean
    recommendation: string
    supportedNetworks: string[]
  } | null>(null)

  useEffect(() => {
    const info = detectBrowserType()
    setBrowserInfo(info)
  }, [])

  const walletOptions = [
    {
      name: "MetaMask",
      id: "metamask",
      icon: "🦊",
      description: "Most popular Web3 wallet with multi-network support",
      networks: ["BSC", "Ethereum", "Polygon"],
      recommended: true,
    },
    {
      name: "Trust Wallet",
      id: "trust",
      icon: "🛡️",
      description: "Mobile-first wallet with built-in dApp browser",
      networks: ["BSC", "Ethereum", "Polygon"],
      recommended: browserInfo?.isMobile || false,
    },
    {
      name: "WalletConnect",
      id: "walletconnect",
      icon: "📱",
      description: "Connect any mobile wallet via QR code scanning",
      networks: ["BSC", "Ethereum", "Polygon"],
      recommended: false,
    },
  ]

  const handleConnect = async (walletId: string) => {
    if (walletId === "metamask") {
      if (typeof window !== "undefined" && window.ethereum) {
        console.log("[v0] Ethereum provider detected, attempting MetaMask connection...")

        let provider = window.ethereum

        // Handle multiple providers (like when both MetaMask and other wallets are installed)
        if (window.ethereum.providers && Array.isArray(window.ethereum.providers)) {
          console.log("[v0] Multiple providers detected, finding MetaMask...")
          provider = window.ethereum.providers.find((p: any) => p.isMetaMask) || window.ethereum.providers[0]
        }

        // Ensure we're using MetaMask if available
        if (provider.isMetaMask || window.ethereum.isMetaMask) {
          console.log("[v0] MetaMask provider confirmed")
        } else {
          console.log("[v0] Generic Web3 provider, attempting connection anyway...")
        }

        // Set the provider for the connection attempt
        if (window.ethereum.providers && provider !== window.ethereum) {
          try {
            await provider.request({ method: "eth_requestAccounts" })
          } catch (error) {
            console.log("[v0] Direct provider request failed, using default ethereum object")
          }
        }
      } else {
        console.log("[v0] No ethereum provider found, redirecting to install")
        if (typeof window !== "undefined") {
          window.open(getWalletInstallUrl(walletId), "_blank")
        }
        return
      }
    } else if (!isWalletAvailable(walletId) && walletId !== "walletconnect") {
      if (typeof window !== "undefined") {
        window.open(getWalletInstallUrl(walletId), "_blank")
      }
      return
    }

    setConnecting(walletId)
    try {
      console.log(`[v0] Attempting to connect to ${walletId}...`)
      await onConnect(walletId)
      console.log(`[v0] Successfully connected to ${walletId}`)
    } catch (error) {
      console.error(`[v0] Failed to connect to ${walletId}:`, error)
    } finally {
      setConnecting(null)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-md mx-auto bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-blue-950 border-2 border-blue-200 dark:border-blue-800 max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center pb-4">
          <DialogTitle className="flex items-center justify-center gap-2 text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            <Wallet className="h-5 w-5 text-blue-600 flex-shrink-0" />
            <span className="break-words">Connect Your Wallet</span>
          </DialogTitle>
          <p className="text-xs sm:text-sm text-muted-foreground mt-2 px-2 break-words">
            Choose your preferred wallet to access ZuckaBot's AI-powered features
          </p>
        </DialogHeader>

        <div className="space-y-4 px-2 pb-4">
          {browserInfo && !browserInfo.isWeb3Capable && (
            <div className="p-3 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30 border-l-4 border-orange-400 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-orange-600 mt-1 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-orange-700 dark:text-orange-300 mb-2">
                    ⚠️ Web3 Wallet Required
                  </p>
                  <p className="text-xs text-orange-700 dark:text-orange-300 mb-3 break-words leading-relaxed">
                    {browserInfo.recommendation}
                  </p>
                  <div className="grid grid-cols-1 gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open("https://trustwallet.com/download", "_blank")}
                      className="text-xs h-8 border-orange-300 hover:bg-orange-100 justify-center"
                    >
                      <Download className="h-3 w-3 mr-1 flex-shrink-0" />
                      <span className="break-words">Get Trust Wallet</span>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open("https://metamask.io/download", "_blank")}
                      className="text-xs h-8 border-orange-300 hover:bg-orange-100 justify-center"
                    >
                      <Download className="h-3 w-3 mr-1 flex-shrink-0" />
                      <span className="break-words">Get MetaMask</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="p-3 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-950/30 dark:to-pink-950/30 border-l-4 border-red-400 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-red-600 mt-1 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-red-700 dark:text-red-300 mb-1">Connection Failed</p>
                  <p className="text-xs text-red-700 dark:text-red-300 break-words leading-relaxed">{error}</p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {walletOptions.map((wallet) => {
              const available = wallet.id === "walletconnect" ? !!window?.ethereum : isWalletAvailable(wallet.id)
              const isConnecting = connecting === wallet.id

              return (
                <div
                  key={wallet.id}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    wallet.recommended
                      ? "border-blue-300 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50"
                      : "border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80"
                  } ${isConnecting ? "animate-pulse" : ""}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col items-center gap-1 flex-shrink-0">
                      <span className="text-xl">{wallet.icon}</span>
                      {available && <CheckCircle className="h-3 w-3 text-green-500" />}
                    </div>

                    <div className="min-w-0 flex-1 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-sm font-semibold break-words">{wallet.name}</h3>
                        {wallet.recommended && (
                          <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs px-2 py-0.5 flex-shrink-0">
                            Recommended
                          </Badge>
                        )}
                      </div>

                      <p className="text-xs text-muted-foreground break-words leading-relaxed">
                        {!available && wallet.id !== "walletconnect" ? "Click to install wallet" : wallet.description}
                      </p>

                      <div className="flex flex-wrap gap-1">
                        {wallet.networks.map((network) => (
                          <Badge
                            key={network}
                            variant="secondary"
                            className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 border-blue-200 flex-shrink-0"
                          >
                            {network}
                          </Badge>
                        ))}
                      </div>

                      <Button
                        variant="outline"
                        className="w-full mt-2 h-8 text-xs bg-transparent"
                        onClick={() => handleConnect(wallet.id)}
                        disabled={isConnecting}
                      >
                        {isConnecting ? (
                          <span className="break-words">Connecting...</span>
                        ) : !available && wallet.id !== "walletconnect" ? (
                          <span className="break-words">Install {wallet.name}</span>
                        ) : (
                          <span className="break-words">Connect {wallet.name}</span>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="pt-4 border-t-2 border-blue-100 dark:border-blue-800 space-y-3">
            <div className="p-3 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-lg border border-blue-200 dark:border-blue-700">
              <div className="flex items-start gap-2">
                <Network className="h-4 w-4 text-blue-600 mt-1 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-blue-700 dark:text-blue-300 mb-2 flex items-center gap-1">
                    <Zap className="h-3 w-3 flex-shrink-0" />
                    <span className="break-words">Multi-Network Support</span>
                  </p>
                  <div className="space-y-1 text-xs text-blue-700 dark:text-blue-300">
                    <p className="break-words leading-relaxed">
                      🟢 <strong>Primary:</strong> Binance Smart Chain (BSC) - Lowest fees
                    </p>
                    <p className="break-words leading-relaxed">
                      🔵 <strong>Supported:</strong> Ethereum, Polygon, and more
                    </p>
                    <p className="break-words leading-relaxed">
                      ⚡ <strong>Auto-Switch:</strong> Wallet will prompt to add/switch networks
                    </p>
                    <p className="break-words leading-relaxed">
                      📱 <strong>Mobile:</strong> Use Trust Wallet or MetaMask app browser
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-lg border border-green-200 dark:border-green-700">
              <div className="flex items-start gap-2">
                <Smartphone className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-green-700 dark:text-green-300 mb-2 break-words">
                    🚀 Best Connection Experience
                  </p>
                  <div className="space-y-1 text-xs text-green-700 dark:text-green-300">
                    <p className="break-words leading-relaxed">
                      📱 <strong>Mobile:</strong> Open in Trust Wallet or MetaMask app browser
                    </p>
                    <p className="break-words leading-relaxed">
                      💻 <strong>Desktop:</strong> Install MetaMask browser extension
                    </p>
                    <p className="break-words leading-relaxed">
                      🔗 <strong>Networks:</strong> Added automatically when you connect
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center pt-2 space-y-2">
              <p className="text-xs text-muted-foreground break-words leading-relaxed">
                New to Web3? Start with MetaMask - it's beginner-friendly!
              </p>
              <a
                href="https://metamask.io/download.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline inline-flex items-center gap-1 text-xs font-medium break-words"
              >
                <span>Get MetaMask Wallet</span>
                <ExternalLink className="h-3 w-3 flex-shrink-0" />
              </a>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

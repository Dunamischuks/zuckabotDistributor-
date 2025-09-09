"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Zap, Shield, Users, TrendingUp, Globe, Code } from "lucide-react"
import Link from "next/link"

export default function WhitepaperPage() {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true)

    try {
      const content = document.getElementById("whitepaper-content")
      if (!content) throw new Error("Content not found")

      // Create a comprehensive PDF content
      const pdfContent = `
ZuckaBot (ZUCKA) Whitepaper
AI-Powered Cryptocurrency Revolution

Executive Summary
================
ZuckaBot (ZUCKA) represents the next evolution in AI-powered cryptocurrency, combining cutting-edge artificial intelligence with blockchain technology to create a revolutionary digital asset ecosystem. Inspired by Meta's groundbreaking AI innovations, ZuckaBot leverages advanced machine learning algorithms to provide intelligent, automated solutions for the decentralized finance landscape.

Key Metrics:
- Total Supply: 1,000,000,000 ZUCKA Tokens
- Launch Price: $0.05 Per ZUCKA Token  
- Pre-Launch Giveaway: 200,000,000 ZUCKA Tokens

Project Vision & Mission
=======================
Vision: To create the world's most intelligent cryptocurrency ecosystem that seamlessly integrates artificial intelligence with decentralized finance, empowering users with automated, efficient, and secure financial solutions.

Mission:
• Democratize access to AI-powered financial tools
• Build a transparent and secure blockchain ecosystem  
• Foster innovation in decentralized artificial intelligence
• Create sustainable value for our community

Technology Overview
==================
AI-Powered Features:
• Intelligent Trading Algorithms
• Machine Learning Price Prediction
• Automated Yield Optimization

Blockchain Infrastructure:
• Binance Smart Chain (BSC)
• Standard ERC20 Token Protocol
• Audited Smart Contracts

Tokenomics
==========
Token Distribution:
• Pre-Launch Giveaway: 20% (200,000,000 ZUCKA)
• Liquidity Pool: 40% (400,000,000 ZUCKA)
• Development & Marketing: 25% (250,000,000 ZUCKA)
• Team & Advisors: 15% (150,000,000 ZUCKA)

Contract Addresses:
• Token Contract: 0x54bff3901d7d27ffe21b9a23bc8efb48c9847048
• Distributor Contract: 0xec222Dba73C17877773E411D15904bf205FbA149
• Treasury Wallet: 0x42e8D84Ff8ff8e5EaE8E2648Ebfa772ee4515c91

Security & Transparency
======================
Security Features:
✅ Ownership Renounced After Deployment
✅ No Mint Function - Fixed Supply
✅ Standard ERC20 Implementation
✅ Transparent Smart Contract Code
✅ Chainlink Price Feed Integration

Transparency Measures:
🔍 Open Source Smart Contracts
🔍 Public Treasury Wallet
🔍 Real-time Transaction Tracking
🔍 Community-Driven Development
🔍 Regular Progress Updates

Roadmap & Launch Strategy
========================
Phase 1: Pre-Launch (Current)
Community building, social media campaigns, and giveaway distribution

Phase 2: PancakeSwap Launch
Official token launch on PancakeSwap at $0.05 per ZUCKA

Phase 3: AI Integration
Launch of AI-powered trading tools and analytics platform

Phase 4: Ecosystem Expansion
Multi-chain deployment and advanced DeFi integrations

Community & Social Media
=======================
Join our growing community:
• Telegram: https://t.me/zuckabotofficial/1
• X (Twitter): https://x.com/zuckabottoken
• Facebook: https://web.facebook.com/profile.php?id=61579580776149

Important Disclaimer
===================
This whitepaper is for informational purposes only and does not constitute investment advice. ZuckaBot tokens are utility tokens and should not be considered as securities. Cryptocurrency investments carry inherent risks, and you may lose some or all of your investment.

© 2025 ZuckaBot - www.zuckabot.xyz
      `

      // Create and download the PDF-like text file
      const blob = new Blob([pdfContent], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const element = document.createElement("a")
      element.href = url
      element.download = "ZuckaBot-Whitepaper-v1.0.txt"
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("PDF generation failed:", error)
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-x-hidden">
      <Navigation />

      {/* Header */}
      <div className="border-b border-cyan-500/20 bg-black/20 backdrop-blur-sm pt-20">
        <div className="container mx-auto px-4 py-6 max-w-full">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Link href="/">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 flex-shrink-0"
                >
                  <span className="mr-2">←</span>
                  <span className="hidden sm:inline">Back to Home</span>
                  <span className="sm:hidden">Back</span>
                </Button>
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4 flex-1">
                <img
                  src="/images/zuckabot-logo.png"
                  alt="ZuckaBot"
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-cyan-400 flex-shrink-0"
                />
                <div className="flex-1">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                    ZuckaBot Whitepaper
                  </h1>
                  <p className="text-cyan-400 text-sm sm:text-base mt-1 leading-relaxed">
                    Technical Documentation & Project Overview
                  </p>
                </div>
              </div>

              <Button
                onClick={handleDownloadPDF}
                disabled={isGeneratingPDF}
                className="bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-700 hover:to-emerald-700 flex-shrink-0 w-full sm:w-auto mt-2 sm:mt-0"
              >
                {isGeneratingPDF ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Generating...
                  </>
                ) : (
                  <>
                    <span className="mr-2">📥</span>
                    Download PDF
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl overflow-x-hidden" id="whitepaper-content">
        <div className="space-y-6 sm:space-y-8">
          {/* Executive Summary */}
          <Card className="bg-black/40 border-cyan-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl text-white flex items-center gap-2">
                <span className="text-cyan-400">📄</span>
                Executive Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p className="text-base sm:text-lg leading-relaxed">
                ZuckaBot (ZUCKA) represents the next evolution in AI-powered cryptocurrency, combining cutting-edge
                artificial intelligence with blockchain technology to create a revolutionary digital asset ecosystem.
                Inspired by Meta's groundbreaking AI innovations, ZuckaBot leverages advanced machine learning
                algorithms to provide intelligent, automated solutions for the decentralized finance landscape.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                <div className="bg-gradient-to-br from-cyan-600/20 to-emerald-600/20 p-4 rounded-lg border border-cyan-500/30">
                  <h4 className="font-semibold text-cyan-400 mb-2 text-sm sm:text-base">Total Supply</h4>
                  <p className="text-xl sm:text-2xl font-bold text-white">1,000,000,000</p>
                  <p className="text-xs sm:text-sm text-gray-400">ZUCKA Tokens</p>
                </div>
                <div className="bg-gradient-to-br from-emerald-600/20 to-cyan-600/20 p-4 rounded-lg border border-emerald-500/30">
                  <h4 className="font-semibold text-emerald-400 mb-2 text-sm sm:text-base">Launch Price</h4>
                  <p className="text-xl sm:text-2xl font-bold text-white">$0.05</p>
                  <p className="text-xs sm:text-sm text-gray-400">Per ZUCKA Token</p>
                </div>
                <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 p-4 rounded-lg border border-purple-500/30 sm:col-span-2 lg:col-span-1">
                  <h4 className="font-semibold text-purple-400 mb-2 text-sm sm:text-base">Pre-Launch Giveaway</h4>
                  <p className="text-xl sm:text-2xl font-bold text-white">200,000,000</p>
                  <p className="text-xs sm:text-sm text-gray-400">ZUCKA Tokens</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Project Vision */}
          <Card className="bg-black/40 border-cyan-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center gap-2">
                <Zap className="w-6 h-6 text-emerald-400" />
                Project Vision & Mission
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <h3 className="text-xl font-semibold text-cyan-400 mb-3">Our Vision</h3>
              <p className="leading-relaxed">
                To create the world's most intelligent cryptocurrency ecosystem that seamlessly integrates artificial
                intelligence with decentralized finance, empowering users with automated, efficient, and secure
                financial solutions.
              </p>

              <h3 className="text-xl font-semibold text-emerald-400 mt-6">Our Mission</h3>
              <ul className="space-y-2 list-disc list-inside">
                <li>Democratize access to AI-powered financial tools</li>
                <li>Build a transparent and secure blockchain ecosystem</li>
                <li>Foster innovation in decentralized artificial intelligence</li>
                <li>Create sustainable value for our community</li>
              </ul>
            </CardContent>
          </Card>

          {/* Technology Overview */}
          <Card className="bg-black/40 border-cyan-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center gap-2">
                <Code className="w-6 h-6 text-purple-400" />
                Technology Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-cyan-400 mb-3">AI-Powered Features</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Badge variant="outline" className="border-cyan-500/50 text-cyan-400">
                        AI
                      </Badge>
                      Intelligent Trading Algorithms
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge variant="outline" className="border-emerald-500/50 text-emerald-400">
                        ML
                      </Badge>
                      Machine Learning Price Prediction
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge variant="outline" className="border-purple-500/50 text-purple-400">
                        AUTO
                      </Badge>
                      Automated Yield Optimization
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-emerald-400 mb-3">Blockchain Infrastructure</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Badge variant="outline" className="border-yellow-500/50 text-yellow-400">
                        BSC
                      </Badge>
                      Binance Smart Chain
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge variant="outline" className="border-blue-500/50 text-blue-400">
                        ERC20
                      </Badge>
                      Standard Token Protocol
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge variant="outline" className="border-green-500/50 text-green-400">
                        SECURE
                      </Badge>
                      Audited Smart Contracts
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tokenomics */}
          <Card className="bg-black/40 border-cyan-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-yellow-400" />
                Tokenomics
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-cyan-400 mb-4">Token Distribution</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-cyan-600/20 to-transparent rounded-lg border border-cyan-500/30">
                      <span>Pre-Launch Giveaway</span>
                      <span className="font-bold text-cyan-400">20%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-emerald-600/20 to-transparent rounded-lg border border-emerald-500/30">
                      <span>Liquidity Pool</span>
                      <span className="font-bold text-emerald-400">40%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-purple-600/20 to-transparent rounded-lg border border-purple-500/30">
                      <span>Development & Marketing</span>
                      <span className="font-bold text-purple-400">25%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-yellow-600/20 to-transparent rounded-lg border border-yellow-500/30">
                      <span>Team & Advisors</span>
                      <span className="font-bold text-yellow-400">15%</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-emerald-400 mb-4">Key Metrics</h3>
                  <div className="space-y-4">
                    <div className="bg-black/60 p-4 rounded-lg border border-gray-700">
                      <p className="text-sm text-gray-400">Contract Address</p>
                      <p className="font-mono text-sm text-white break-all">
                        0x54bff3901d7d27ffe21b9a23bc8efb48c9847048
                      </p>
                    </div>
                    <div className="bg-black/60 p-4 rounded-lg border border-gray-700">
                      <p className="text-sm text-gray-400">Distributor Contract</p>
                      <p className="font-mono text-sm text-white break-all">
                        0xec222Dba73C17877773E411D15904bf205FbA149
                      </p>
                    </div>
                    <div className="bg-black/60 p-4 rounded-lg border border-gray-700">
                      <p className="text-sm text-gray-400">Treasury Wallet</p>
                      <p className="font-mono text-sm text-white break-all">
                        0x42e8D84Ff8ff8e5EaE8E2648Ebfa772ee4515c91
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security & Transparency */}
          <Card className="bg-black/40 border-cyan-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center gap-2">
                <Shield className="w-6 h-6 text-green-400" />
                Security & Transparency
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-green-400 mb-3">Security Features</h3>
                  <ul className="space-y-2">
                    <li>✅ Ownership Renounced After Deployment</li>
                    <li>✅ No Mint Function - Fixed Supply</li>
                    <li>✅ Standard ERC20 Implementation</li>
                    <li>✅ Transparent Smart Contract Code</li>
                    <li>✅ Chainlink Price Feed Integration</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-blue-400 mb-3">Transparency Measures</h3>
                  <ul className="space-y-2">
                    <li>🔍 Open Source Smart Contracts</li>
                    <li>🔍 Public Treasury Wallet</li>
                    <li>🔍 Real-time Transaction Tracking</li>
                    <li>🔍 Community-Driven Development</li>
                    <li>🔍 Regular Progress Updates</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Roadmap */}
          <Card className="bg-black/40 border-cyan-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center gap-2">
                <Globe className="w-6 h-6 text-orange-400" />
                Roadmap & Launch Strategy
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-green-600/20 to-transparent rounded-lg border border-green-500/30">
                  <div className="w-3 h-3 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-green-400">Phase 1: Pre-Launch (Current)</h4>
                    <p className="text-sm">Community building, social media campaigns, and giveaway distribution</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-cyan-600/20 to-transparent rounded-lg border border-cyan-500/30">
                  <div className="w-3 h-3 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-cyan-400">Phase 2: PancakeSwap Launch</h4>
                    <p className="text-sm">Official token launch on PancakeSwap at $0.05 per ZUCKA</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-purple-600/20 to-transparent rounded-lg border border-purple-500/30">
                  <div className="w-3 h-3 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-purple-400">Phase 3: AI Integration</h4>
                    <p className="text-sm">Launch of AI-powered trading tools and analytics platform</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-orange-600/20 to-transparent rounded-lg border border-orange-500/30">
                  <div className="w-3 h-3 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-orange-400">Phase 4: Ecosystem Expansion</h4>
                    <p className="text-sm">Multi-chain deployment and advanced DeFi integrations</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Community */}
          <Card className="bg-black/40 border-cyan-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center gap-2">
                <Users className="w-6 h-6 text-pink-400" />
                Community & Social Media
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p className="leading-relaxed">
                Join our growing community across multiple platforms to stay updated on the latest developments,
                participate in discussions, and be part of the ZuckaBot revolution.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <a
                  href="https://t.me/zuckabotofficial/1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-600/20 to-transparent rounded-lg border border-blue-500/30 hover:border-blue-400/50 transition-colors"
                >
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">T</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-400">Telegram</h4>
                    <p className="text-sm text-gray-400">Official Channel</p>
                  </div>
                </a>
                <a
                  href="https://x.com/zuckabottoken"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-gradient-to-r from-gray-600/20 to-transparent rounded-lg border border-gray-500/30 hover:border-gray-400/50 transition-colors"
                >
                  <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">X</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-300">X (Twitter)</h4>
                    <p className="text-sm text-gray-400">Latest Updates</p>
                  </div>
                </a>
                <a
                  href="https://web.facebook.com/profile.php?id=61579580776149"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-800/20 to-transparent rounded-lg border border-blue-700/30 hover:border-blue-600/50 transition-colors"
                >
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">f</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-400">Facebook</h4>
                    <p className="text-sm text-gray-400">Community Page</p>
                  </div>
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Disclaimer */}
          <Card className="bg-red-900/20 border-red-500/30 backdrop-blur-sm">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-red-400 mb-3">Important Disclaimer</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                This whitepaper is for informational purposes only and does not constitute investment advice, financial
                advice, trading advice, or any other sort of advice. ZuckaBot tokens are utility tokens and should not
                be considered as securities or investment instruments. Please conduct your own research and consult with
                financial advisors before making any investment decisions. Cryptocurrency investments carry inherent
                risks, and you may lose some or all of your investment.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

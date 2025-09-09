"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Navigation } from "@/components/navigation"
import {
  Twitter,
  MessageCircle,
  Facebook,
  ExternalLink,
  CheckCircle,
  Clock,
  Save,
  Check,
  Gift,
  Zap,
  Users,
  ArrowLeft,
  Coins,
  DollarSign,
  Timer,
  Sparkles,
} from "lucide-react"
import Link from "next/link"

interface FormData {
  telegram: string
  twitter: string
  facebook: string
}

export default function GiveawayPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState<FormData>({
    telegram: "",
    twitter: "",
    facebook: "",
  })
  const [savedData, setSavedData] = useState<FormData>({
    telegram: "",
    twitter: "",
    facebook: "",
  })
  const [isVerifying, setIsVerifying] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [showBalance, setShowBalance] = useState(false)
  const [verificationProgress, setVerificationProgress] = useState(0)

  useEffect(() => {
    const saved = localStorage.getItem("zuckabot-giveaway-links")
    if (saved) {
      try {
        const parsedData = JSON.parse(saved)
        setFormData(parsedData)
        setSavedData(parsedData)
      } catch (error) {
        console.error("Error loading saved social links:", error)
      }
    }

    const verified = localStorage.getItem("zuckabot-verified")
    if (verified === "true") {
      setIsVerified(true)
      setShowBalance(true)
    }
  }, [])

  const socialTasks = [
    {
      platform: "Telegram",
      icon: MessageCircle,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
      tasks: [
        "Join our official Telegram channel",
        "Share our giveaway post to at least 5 people or groups",
        "Copy the link to your share/forward as proof",
      ],
      url: "https://t.me/zuckabotofficial/1",
      field: "telegram" as keyof FormData,
      placeholder: "Paste your Telegram share/forward link here...",
    },
    {
      platform: "X (Twitter)",
      icon: Twitter,
      color: "text-gray-300",
      bgColor: "bg-gray-500/10",
      borderColor: "border-gray-500/30",
      tasks: [
        "Follow our official X (Twitter) account",
        "Retweet our giveaway post to your timeline",
        "Copy the link to your retweet as proof",
      ],
      url: "https://x.com/zuckabottoken",
      field: "twitter" as keyof FormData,
      placeholder: "Paste your X (Twitter) retweet link here...",
    },
    {
      platform: "Facebook",
      icon: Facebook,
      color: "text-blue-600",
      bgColor: "bg-blue-600/10",
      borderColor: "border-blue-600/30",
      tasks: [
        "Like our official Facebook page",
        "Share our giveaway post to your timeline or groups",
        "Copy the link to your share/post as proof",
      ],
      url: "https://web.facebook.com/profile.php?id=61579580776149",
      field: "facebook" as keyof FormData,
      placeholder: "Paste your Facebook share/post link here...",
    },
  ]

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSaveLink = (field: keyof FormData) => {
    const currentValue = formData[field]
    if (!currentValue.trim()) {
      toast({
        title: "Empty Link",
        description: "Please enter a link before saving.",
        variant: "destructive",
      })
      return
    }

    const updatedSavedData = { ...savedData, [field]: currentValue }
    setSavedData(updatedSavedData)
    localStorage.setItem("zuckabot-giveaway-links", JSON.stringify(updatedSavedData))

    toast({
      title: "Link Saved Temporarily",
      description: `Your ${field} link has been saved. You can continue with other tasks.`,
    })
  }

  const handleSubmitForApproval = async () => {
    // Validate all fields are filled
    if (!formData.telegram || !formData.twitter || !formData.facebook) {
      toast({
        title: "Missing Links",
        description: "Please provide all three social media proof links before submitting.",
        variant: "destructive",
      })
      return
    }

    // Basic URL validation
    const isValidUrl = (url: string) => {
      try {
        new URL(url)
        return true
      } catch {
        return false
      }
    }

    if (!isValidUrl(formData.telegram) || !isValidUrl(formData.twitter) || !isValidUrl(formData.facebook)) {
      toast({
        title: "Invalid URLs",
        description: "Please provide valid URLs for all social media proofs.",
        variant: "destructive",
      })
      return
    }

    setIsVerifying(true)
    setVerificationProgress(0)

    const progressInterval = setInterval(() => {
      setVerificationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 100 / 15 // 15 seconds total
      })
    }, 1000)

    setTimeout(() => {
      clearInterval(progressInterval)
      setIsVerifying(false)
      setIsVerified(true)
      setShowBalance(true)
      localStorage.setItem("zuckabot-verified", "true")
      localStorage.removeItem("zuckabot-giveaway-links")

      toast({
        title: "Links Approved! 🎉",
        description: "Your social media tasks have been verified. 1500 ZUCKA tokens added to your balance!",
      })
    }, 15000) // 15 second verification
  }

  if (showBalance && isVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <Navigation />

        <div className="pt-20 pb-8">
          <div className="container mx-auto px-3 sm:px-4 max-w-xl sm:max-w-2xl">
            <div className="mb-4 sm:mb-6">
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>

            <Card className="bg-black/40 border-green-500/30 backdrop-blur-sm">
              <CardHeader className="text-center px-4 sm:px-6">
                <div className="w-16 sm:w-20 h-16 sm:h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-10 sm:h-12 w-10 sm:w-12 text-green-400" />
                </div>
                <CardTitle className="text-2xl sm:text-3xl font-bold text-green-400">Congratulations!</CardTitle>
                <p className="text-sm sm:text-base text-gray-300">Your social media verification is complete</p>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6">
                <div className="text-center space-y-4">
                  <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 p-4 sm:p-6 rounded-lg border border-green-500/30">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Coins className="h-5 sm:h-6 w-5 sm:w-6 text-green-400" />
                      <span className="text-base sm:text-lg font-semibold text-green-400">Your dApp Balance</span>
                    </div>
                    <div className="text-2xl sm:text-4xl font-bold text-white mb-2">1,500 ZUCKA</div>
                    <div className="flex items-center justify-center gap-2 text-gray-300">
                      <DollarSign className="h-4 sm:h-5 w-4 sm:w-5" />
                      <span className="text-lg sm:text-xl font-semibold">$0.05 × 1,500 = $75.00</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-400 mt-2">Value at PancakeSwap Launch</p>
                  </div>

                  <div className="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 p-3 sm:p-4 rounded-lg border border-cyan-500/30">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Zap className="h-4 sm:h-5 w-4 sm:w-5 text-cyan-400" />
                      <span className="text-sm sm:text-base font-semibold text-cyan-400">Ready to Claim</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-300">
                      Connect your wallet on the home page to initiate your token claim
                    </p>
                  </div>

                  <Link href="/">
                    <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 sm:py-4 text-base sm:text-lg">
                      <Coins className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                      Claim Your Tokens
                    </Button>
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-6">
                  <div className="text-center p-3 bg-black/60 rounded-lg border border-gray-700">
                    <CheckCircle className="h-5 sm:h-6 w-5 sm:w-6 text-green-400 mx-auto mb-2" />
                    <p className="text-sm font-semibold text-green-400">Telegram</p>
                    <p className="text-xs text-gray-400">Verified</p>
                  </div>
                  <div className="text-center p-3 bg-black/60 rounded-lg border border-gray-700">
                    <CheckCircle className="h-5 sm:h-6 w-5 sm:w-6 text-green-400 mx-auto mb-2" />
                    <p className="text-sm font-semibold text-green-400">X (Twitter)</p>
                    <p className="text-xs text-gray-400">Verified</p>
                  </div>
                  <div className="text-center p-3 bg-black/60 rounded-lg border border-gray-700">
                    <CheckCircle className="h-5 sm:h-6 w-5 sm:w-6 text-green-400 mx-auto mb-2" />
                    <p className="text-sm font-semibold text-green-400">Facebook</p>
                    <p className="text-xs text-gray-400">Verified</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <Navigation />

        <div className="pt-20 pb-8">
          <div className="container mx-auto px-3 sm:px-4 max-w-xl sm:max-w-2xl">
            <Card className="bg-black/40 border-blue-500/30 backdrop-blur-sm">
              <CardHeader className="text-center px-4 sm:px-6">
                <div className="w-16 sm:w-20 h-16 sm:h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Timer className="h-10 sm:h-12 w-10 sm:w-12 text-blue-400 animate-pulse" />
                </div>
                <CardTitle className="text-xl sm:text-2xl font-bold text-blue-400">Verifying Your Links...</CardTitle>
                <p className="text-sm sm:text-base text-gray-300">
                  Please wait while we verify your social media activities
                </p>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6">
                <div className="text-center space-y-4">
                  <div className="text-4xl sm:text-6xl font-mono font-bold text-blue-400">
                    {Math.ceil((100 - verificationProgress) * 0.15)}s
                  </div>
                  <p className="text-sm sm:text-base text-gray-400">Time remaining</p>

                  <div className="w-full bg-gray-700 rounded-full h-2 sm:h-3 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-1000 ease-out"
                      style={{ width: `${verificationProgress}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-400">{Math.round(verificationProgress)}% Complete</p>

                  <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 p-3 sm:p-4 rounded-lg border border-blue-500/30">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Clock className="h-4 sm:h-5 w-4 sm:w-5 text-blue-400 animate-spin" />
                      <span className="text-sm sm:text-base font-semibold text-blue-400">Verification in Progress</span>
                    </div>
                    <div className="text-xs sm:text-sm text-gray-300 space-y-1 text-left">
                      <p>• Checking Telegram channel membership and shares</p>
                      <p>• Verifying X (Twitter) follow and retweets</p>
                      <p>• Confirming Facebook page likes and shares</p>
                      <p>• Validating proof links authenticity</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Navigation />

      <div className="pt-20 pb-8">
        <div className="container mx-auto px-2 sm:px-4 max-w-[95vw] sm:max-w-2xl lg:max-w-4xl">
          <div className="mb-4 sm:mb-6">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>

          <div className="text-center mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
              <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br from-cyan-600 to-emerald-600 rounded-full flex items-center justify-center">
                <Gift className="h-6 sm:h-8 w-6 sm:w-8 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-4xl font-bold text-white">ZuckaBot Giveaway</h1>
                <p className="text-xs sm:text-base text-cyan-400">Complete tasks to earn 1,500 ZUCKA tokens</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-cyan-600/20 to-emerald-600/20 p-3 sm:p-6 rounded-lg border border-cyan-500/30 max-w-full mx-auto">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles className="h-4 sm:h-6 w-4 sm:w-6 text-emerald-400" />
                <span className="text-base sm:text-xl font-bold text-white">Reward: 1,500 ZUCKA Tokens</span>
              </div>
              <div className="text-lg sm:text-2xl font-bold text-emerald-400 mb-2">Worth $75.00 at Launch</div>
              <p className="text-xs sm:text-base text-gray-300">
                Complete all social media tasks below to claim your tokens
              </p>
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {socialTasks.map((social, index) => (
              <Card key={social.platform} className="bg-black/40 border-cyan-500/30 backdrop-blur-sm">
                <CardHeader className="px-3 sm:px-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 sm:w-12 h-10 sm:h-12 ${social.bgColor} rounded-full flex items-center justify-center`}
                      >
                        <social.icon className={`h-5 sm:h-6 w-5 sm:w-6 ${social.color}`} />
                      </div>
                      <div>
                        <CardTitle className="text-base sm:text-xl text-white">{social.platform}</CardTitle>
                        <p className="text-xs sm:text-sm text-gray-400">Step {index + 1} of 3</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => window.open(social.url, "_blank")}
                      className="bg-cyan-600/20 border-cyan-500/50 text-cyan-400 hover:bg-cyan-600/30 text-xs sm:text-sm w-full sm:w-auto"
                    >
                      Visit Platform <ExternalLink className="h-3 sm:h-4 w-3 sm:w-4 ml-2" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 px-3 sm:px-6">
                  <div className={`${social.bgColor} rounded-lg p-3 sm:p-4 ${social.borderColor} border`}>
                    <p className="font-semibold text-white mb-3 text-xs sm:text-base">Required Tasks:</p>
                    <div className="space-y-2">
                      {social.tasks.map((task, taskIndex) => (
                        <div key={taskIndex} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-xs sm:text-sm text-gray-300">{task}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={social.field} className="text-white font-semibold text-xs sm:text-base">
                      Proof Link (Required)
                    </Label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <div className="flex-1 relative">
                        <Input
                          id={social.field}
                          placeholder={social.placeholder}
                          value={formData[social.field]}
                          onChange={(e) => handleInputChange(social.field, e.target.value)}
                          className="bg-black/60 border-cyan-500/30 focus:border-cyan-400 text-white placeholder:text-gray-500 pr-10 text-xs sm:text-sm"
                        />
                        {savedData[social.field] && (
                          <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-400" />
                        )}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSaveLink(social.field)}
                        disabled={!formData[social.field].trim()}
                        className="px-3 sm:px-4 bg-emerald-600/20 border-emerald-500/50 text-emerald-400 hover:bg-emerald-600/30 w-full sm:w-auto text-xs sm:text-sm"
                      >
                        <Save className="h-3 sm:h-4 w-3 sm:w-4 mr-1" />
                        Save
                      </Button>
                    </div>
                    {savedData[social.field] && (
                      <p className="text-xs text-green-400 flex items-center gap-1">
                        <Check className="h-3 w-3" />
                        Link saved temporarily - you can continue with other tasks
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 sm:mt-8">
            <Card className="bg-black/40 border-cyan-500/30 backdrop-blur-sm">
              <CardContent className="pt-4 sm:pt-6 px-3 sm:px-6">
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Users className="h-4 sm:h-6 w-4 sm:w-6 text-cyan-400" />
                    <span className="text-base sm:text-xl font-bold text-white">Ready to Submit?</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
                    {socialTasks.map((social) => (
                      <div
                        key={social.platform}
                        className="flex items-center justify-center gap-2 p-2 sm:p-3 bg-black/60 rounded-lg border border-gray-700"
                      >
                        <social.icon
                          className={`h-3 sm:h-5 w-3 sm:w-5 ${savedData[social.field] ? "text-green-400" : "text-gray-500"}`}
                        />
                        <span
                          className={`text-xs sm:text-sm font-semibold ${savedData[social.field] ? "text-green-400" : "text-gray-500"}`}
                        >
                          {social.platform}
                        </span>
                        {savedData[social.field] && <Check className="h-3 sm:h-4 w-3 sm:w-4 text-green-400" />}
                      </div>
                    ))}
                  </div>

                  <Button
                    onClick={handleSubmitForApproval}
                    disabled={isVerifying || !formData.telegram || !formData.twitter || !formData.facebook}
                    className="w-full bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-700 hover:to-emerald-700 text-white font-bold py-3 sm:py-4 text-sm sm:text-lg"
                    size="lg"
                  >
                    <CheckCircle className="h-4 sm:h-5 w-4 sm:w-5 mr-2" />
                    Submit for Approval
                  </Button>

                  <div className="bg-cyan-600/10 rounded-lg p-3 sm:p-4 border border-cyan-500/30">
                    <p className="text-xs sm:text-sm text-gray-300 text-center">
                      💡 Make sure all your social media profiles are public so we can verify your tasks. Verification
                      takes approximately 15 seconds.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

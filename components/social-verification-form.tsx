"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Twitter, MessageCircle, Facebook, ExternalLink, CheckCircle, Clock, Save, Check } from "lucide-react"

interface SocialVerificationFormProps {
  onVerificationComplete: () => void
}

export function SocialVerificationForm({ onVerificationComplete }: SocialVerificationFormProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    telegram: "",
    twitter: "",
    facebook: "",
  })
  const [savedData, setSavedData] = useState({
    telegram: "",
    twitter: "",
    facebook: "",
  })
  const [isVerifying, setIsVerifying] = useState(false)
  const [isVerified, setIsVerified] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("zuckabot-social-links")
    if (saved) {
      try {
        const parsedData = JSON.parse(saved)
        setFormData(parsedData)
        setSavedData(parsedData)
      } catch (error) {
        console.error("Error loading saved social links:", error)
      }
    }
  }, [])

  const socialTasks = [
    {
      platform: "Telegram",
      icon: MessageCircle,
      color: "text-blue-500",
      tasks: ["Join our official Telegram group", "Share our promotional post to 5+ people/groups"],
      url: "https://t.me/zuckabotofficial/1",
      field: "telegram",
    },
    {
      platform: "Twitter/X",
      icon: Twitter,
      color: "text-sky-500",
      tasks: ["Follow our official Twitter account", "Retweet our promotional post to your timeline"],
      url: "https://x.com/zuckabottoken",
      field: "twitter",
    },
    {
      platform: "Facebook",
      icon: Facebook,
      color: "text-blue-600",
      tasks: ["Like our official Facebook page", "Share our promotional post to your timeline"],
      url: "https://web.facebook.com/profile.php?id=61579580776149",
      field: "facebook",
    },
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSaveLink = (field: string) => {
    const currentValue = formData[field as keyof typeof formData]
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
    localStorage.setItem("zuckabot-social-links", JSON.stringify(updatedSavedData))

    toast({
      title: "Link Saved",
      description: `Your ${field} link has been saved temporarily.`,
    })
  }

  const handleSubmit = async () => {
    // Validate all fields are filled
    if (!formData.telegram || !formData.twitter || !formData.facebook) {
      toast({
        title: "Missing Links",
        description: "Please provide all three social media proof links.",
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

    setTimeout(() => {
      setIsVerifying(false)
      setIsVerified(true)
      localStorage.removeItem("zuckabot-social-links")
      toast({
        title: "Verification Complete",
        description: "Your social media tasks have been verified successfully!",
      })
      setTimeout(() => {
        onVerificationComplete()
      }, 100)
    }, 8000) // 8 second verification simulation
  }

  if (isVerified) {
    return (
      <Card className="glass border-green-500/20 bg-green-500/5">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <h3 className="text-xl font-bold text-green-500">Verified!</h3>
            <p className="text-muted-foreground font-medium">
              Your social media tasks have been successfully verified.
            </p>
            <div className="bg-card/50 rounded-lg p-4 space-y-2">
              <p className="text-lg font-bold">Your Reward: 1,500 ZUCKA</p>
              <p className="text-sm text-muted-foreground font-medium">Website Balance</p>
              <p className="text-2xl font-black gradient-text">$0.05 × 1,500 = $75.00</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-bold">
          <CheckCircle className="h-5 w-5 text-primary" />
          Social Media Verification
        </CardTitle>
        <p className="text-sm text-muted-foreground font-medium">
          Complete all social media tasks and provide proof links to claim your pre-launch giveaway reward of 1,500
          ZUCKA tokens
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {socialTasks.map((social) => (
          <div key={social.platform} className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <social.icon className={`h-5 w-5 ${social.color}`} />
                <span className="font-bold">{social.platform}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(social.url, "_blank")}
                className="hover:bg-primary/10 font-semibold"
              >
                Visit <ExternalLink className="h-3 w-3 ml-1" />
              </Button>
            </div>

            <div className="bg-muted/30 rounded-lg p-3 space-y-2 border-2 border-primary/20">
              <p className="text-sm font-bold">Required Tasks:</p>
              {social.tasks.map((task, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  <span className="text-sm text-muted-foreground font-medium">{task}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <Label htmlFor={social.field} className="font-bold">
                Proof Link (Share/Retweet/Post URL)
              </Label>
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Input
                    id={social.field}
                    placeholder={`Paste your ${social.platform} proof link here...`}
                    value={formData[social.field as keyof typeof formData]}
                    onChange={(e) => handleInputChange(social.field, e.target.value)}
                    className="bg-background/50 border-2 border-primary/30 focus:border-primary/60 font-medium pr-10"
                  />
                  {savedData[social.field as keyof typeof savedData] && (
                    <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
                  )}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSaveLink(social.field)}
                  disabled={!formData[social.field as keyof typeof formData].trim()}
                  className="px-3 font-semibold"
                >
                  <Save className="h-4 w-4" />
                </Button>
              </div>
              {savedData[social.field as keyof typeof savedData] && (
                <p className="text-xs text-green-600 font-medium">✓ Link saved temporarily</p>
              )}
            </div>
          </div>
        ))}

        <div className="pt-4">
          <Button
            onClick={handleSubmit}
            disabled={isVerifying}
            className="w-full gradient-bg text-white font-bold py-3 text-lg"
            size="lg"
          >
            {isVerifying ? (
              <>
                <Clock className="h-4 w-4 mr-2 animate-spin" />
                Verifying Proof...
              </>
            ) : (
              "Submit Verification"
            )}
          </Button>
        </div>

        <div className="bg-primary/5 rounded-lg p-3 border border-primary/20">
          <p className="text-xs text-muted-foreground text-center font-medium">
            💡 Make sure your social media profiles are public so we can verify your tasks
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

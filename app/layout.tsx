import type React from "react"
import type { Metadata } from "next"
import { Work_Sans, Open_Sans } from "next/font/google"
import { Suspense } from "react"
import "./globals.css"

const workSans = Work_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-work-sans",
  weight: ["400", "600", "700", "900"],
})

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
  weight: ["300", "400", "600", "700"],
})

export const metadata: Metadata = {
  title: "ZuckaBot - AI-Powered Cryptocurrency Pre-Launch Giveaway",
  description:
    "Join the ZuckaBot Pre-Launch Giveaway - Complete social media tasks and claim your 1,500 ZUCKA tokens worth $75. AI-powered cryptocurrency inspired by Mark Zuckerberg's innovations.",
  keywords:
    "ZuckaBot, ZUCKA, cryptocurrency, AI, blockchain, giveaway, pre-launch, tokens, Mark Zuckerberg, Meta, artificial intelligence",
  authors: [{ name: "ZuckaBot Team" }],
  creator: "ZuckaBot",
  publisher: "ZuckaBot",
  robots: "index, follow",
  openGraph: {
    title: "ZuckaBot - AI-Powered Cryptocurrency Pre-Launch Giveaway",
    description:
      "Join the ZuckaBot Pre-Launch Giveaway - Complete social media tasks and claim your 1,500 ZUCKA tokens worth $75",
    url: "https://www.zuckabot.xyz",
    siteName: "ZuckaBot",
    type: "website",
    images: [
      {
        url: "/images/zuckabot-logo.png",
        width: 256,
        height: 256,
        alt: "ZuckaBot Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ZuckaBot - AI-Powered Cryptocurrency Pre-Launch Giveaway",
    description:
      "Join the ZuckaBot Pre-Launch Giveaway - Complete social media tasks and claim your 1,500 ZUCKA tokens worth $75",
    images: ["/images/zuckabot-logo.png"],
    creator: "@zuckabottoken",
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#0891b2",
  generator: "ZuckaBot dApp",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/zuckabot-logo.png" />
        <link rel="apple-touch-icon" href="/images/zuckabot-logo.png" />
        <meta name="application-name" content="ZuckaBot" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="ZuckaBot" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#0891b2" />
        <meta name="msapplication-tap-highlight" content="no" />
      </head>
      <body className={`${workSans.variable} ${openSans.variable} font-sans antialiased`}>
        <Suspense fallback={null}>{children}</Suspense>
      </body>
    </html>
  )
}

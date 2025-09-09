"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ContractStatsProps {
  totalDistributed: string
  totalClaimants: number
  bnbPrice: string
  isLoading?: boolean
}

export function ContractStats({ totalDistributed, totalClaimants, bnbPrice, isLoading = false }: ContractStatsProps) {
  const stats = [
    {
      title: "Total ZUCKA Distributed",
      value: isLoading ? "Loading..." : `${totalDistributed} ZUCKA`,
      icon: "💰",
      color: "text-chart-1",
    },
    {
      title: "Total Claimants",
      value: isLoading ? "Loading..." : totalClaimants.toLocaleString(),
      icon: "👥",
      color: "text-chart-2",
    },
    {
      title: "BNB Price (Chainlink)",
      value: isLoading ? "Loading..." : `$${bnbPrice}`,
      icon: "📈",
      color: "text-chart-4",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow min-w-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 pt-3">
            <CardTitle className="text-xs sm:text-sm font-bold text-muted-foreground truncate">{stat.title}</CardTitle>
            <span className="text-lg">{stat.icon}</span>
          </CardHeader>
          <CardContent className="px-3 pb-3">
            <div className="text-lg sm:text-xl lg:text-2xl font-black truncate">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

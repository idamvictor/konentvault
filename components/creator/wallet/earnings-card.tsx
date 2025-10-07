"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Calendar } from "lucide-react"
import { CREATOR_EARNINGS } from "@/lib/wallet-data"

export function EarningsCard() {
  const { total, thisMonth, percentageChange } = CREATOR_EARNINGS

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Creator Earnings</CardTitle>
        <TrendingUp className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">${total.toFixed(2)}</div>
        <div className="flex items-center gap-2 mt-4 pt-4 border-t">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <div className="text-sm text-muted-foreground">
            This month: <span className="font-medium text-foreground">${thisMonth.toFixed(2)}</span>
          </div>
        </div>
        <CardDescription className="mt-2">
          <span className={percentageChange >= 0 ? "text-green-600" : "text-red-600"}>
            {percentageChange >= 0 ? "+" : ""}
            {percentageChange.toFixed(1)}%
          </span>{" "}
          from last month
        </CardDescription>
      </CardContent>
    </Card>
  )
}

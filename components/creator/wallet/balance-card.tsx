"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, TrendingUp } from "lucide-react"
import { WALLET_BALANCE } from "@/lib/wallet-data"

export function BalanceCard() {
  const { available, pending, currency } = WALLET_BALANCE

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">${available.toFixed(2)}</div>
        <div className="flex items-center gap-2 mt-4 pt-4 border-t">
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
          <div className="text-sm text-muted-foreground">
            Pending: <span className="font-medium text-foreground">${pending.toFixed(2)}</span>
          </div>
        </div>
        <CardDescription className="mt-2">Available for withdrawal</CardDescription>
      </CardContent>
    </Card>
  )
}

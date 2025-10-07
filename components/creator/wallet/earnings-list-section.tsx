"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { EarningsTable } from "./earnings-table"
import { EARNINGS_LIST } from "@/lib/wallet-data"

export function EarningsListSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Earnings History</CardTitle>
        <CardDescription>View all your earnings and revenue sources</CardDescription>
      </CardHeader>
      <CardContent>
        <EarningsTable earnings={EARNINGS_LIST} />
      </CardContent>
    </Card>
  )
}

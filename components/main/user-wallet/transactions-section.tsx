import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TransactionsTable } from "./transactions-table"
import type { PaymentLog } from "@/lib/user-wallet-data"
import { Receipt } from "lucide-react"

interface TransactionsSectionProps {
  transactions: PaymentLog[]
}

export function TransactionsSection({ transactions }: TransactionsSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Receipt className="h-5 w-5" />
          Transaction History
        </CardTitle>
        <CardDescription>View all your wallet transactions and payment history</CardDescription>
      </CardHeader>
      <CardContent>
        <TransactionsTable transactions={transactions} />
      </CardContent>
    </Card>
  )
}

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import type { PaymentLog } from "@/lib/user-wallet-data"
import { formatDistanceToNow } from "date-fns"

interface TransactionsTableProps {
  transactions: PaymentLog[]
}

export function TransactionsTable({ transactions }: TransactionsTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "successful":
        return "default"
      case "pending":
        return "secondary"
      case "failed":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getPaymentTypeColor = (type: string) => {
    switch (type) {
      case "wallet":
        return "bg-blue-500/10 text-blue-700 dark:text-blue-400"
      case "subscription":
        return "bg-purple-500/10 text-purple-700 dark:text-purple-400"
      case "tip":
        return "bg-green-500/10 text-green-700 dark:text-green-400"
      case "purchase":
        return "bg-orange-500/10 text-orange-700 dark:text-orange-400"
      default:
        return "bg-gray-500/10 text-gray-700 dark:text-gray-400"
    }
  }

  if (transactions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No transactions yet</p>
      </div>
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Description</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Reference</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>
                <div>
                  <p className="font-medium">{transaction.description}</p>
                  <p className="text-sm text-muted-foreground">by {transaction.user.username}</p>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={getPaymentTypeColor(transaction.paymentType)}>
                  {transaction.paymentType}
                </Badge>
              </TableCell>
              <TableCell className="capitalize">{transaction.paymentMethod}</TableCell>
              <TableCell className="font-semibold">
                $
                {Number.parseFloat(transaction.amount).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </TableCell>
              <TableCell>
                <Badge variant={getStatusColor(transaction.status)}>{transaction.status}</Badge>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {formatDistanceToNow(new Date(transaction.createdAt), { addSuffix: true })}
              </TableCell>
              <TableCell className="font-mono text-xs text-muted-foreground">{transaction.reference}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

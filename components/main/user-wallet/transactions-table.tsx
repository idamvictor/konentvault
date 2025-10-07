import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Transaction } from "@/endpoint/user/user-types";
import { formatDistanceToNow } from "date-fns";

interface TransactionsTableProps {
  transactions: Transaction[];
}

export function TransactionsTable({ transactions }: TransactionsTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "successful":
        return "default";
      case "failed":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getPaymentTypeColor = (type: string) => {
    switch (type) {
      case "wallet":
        return "bg-blue-500/10 text-blue-700 dark:text-blue-400";
      case "media":
        return "bg-orange-500/10 text-orange-700 dark:text-orange-400";
      default:
        return "bg-gray-500/10 text-gray-700 dark:text-gray-400";
    }
  };

  if (transactions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No transactions yet</p>
      </div>
    );
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
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={getPaymentTypeColor(
                    transaction.paymentType || "wallet"
                  )}
                >
                  {transaction.paymentType || "wallet"}
                </Badge>
              </TableCell>
              <TableCell className="capitalize">
                {transaction.paymentMethod}
              </TableCell>
              <TableCell className="font-semibold">
                ${transaction.amount}
              </TableCell>
              <TableCell>
                <Badge variant={getStatusColor(transaction.status || "")}>
                  {transaction.status || "pending"}
                </Badge>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {formatDistanceToNow(new Date(transaction.createdAt), {
                  addSuffix: true,
                })}
              </TableCell>
              <TableCell className="font-mono text-xs text-muted-foreground">
                {transaction.reference}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

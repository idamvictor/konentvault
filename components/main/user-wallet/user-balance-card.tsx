import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet } from "lucide-react"

interface UserBalanceCardProps {
  balance: number
}

export function UserBalanceCard({ balance }: UserBalanceCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="h-5 w-5" />
          Wallet Balance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div>
            <p className="text-sm text-muted-foreground">Available Balance</p>
            <p className="text-4xl font-bold tracking-tight">
              ${balance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

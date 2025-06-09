import { ArrowDown, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const transactions = [
  {
    id: 1,
    username: "learn z",
    handle: "@learn.z",
    amount: "₦1,000.00",
    type: "Tip",
    date: "Jun 7, 2025 | 09:39 AM",
    status: "completed",
  },
  {
    id: 2,
    username: "learn z",
    handle: "@learn.z",
    amount: "₦1,000.00",
    type: "Tip",
    date: "Jun 7, 2025 | 09:39 AM",
    status: "completed",
  },
  {
    id: 3,
    username: "learn z",
    handle: "@learn.z",
    amount: "₦2,000.00",
    type: "Tip",
    date: "Jun 7, 2025 | 09:32 AM",
    status: "completed",
  },
  {
    id: 4,
    username: "learn z",
    handle: "@learn.z",
    amount: "₦200.00",
    type: "Post Unlock",
    date: "Jun 6, 2025 | 03:17 PM",
    status: "completed",
  },
];

export function RecentTransactions() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>Recent Transactions</CardTitle>{" "}
        <Button variant="ghost" className="text-primary hover:text-primary/90">
          See all
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              {" "}
              <tr className="border-b bg-muted">
                <th className="text-left p-3 font-medium text-muted-foreground">
                  Username
                </th>
                <th className="text-left p-3 font-medium text-gray-600">
                  Amount
                </th>
                <th className="text-left p-3 font-medium text-gray-600">
                  Payment Type
                </th>
                <th className="text-left p-3 font-medium text-gray-600">
                  Date
                </th>
                <th className="text-left p-3 font-medium text-gray-600">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b hover:bg-muted/50">
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 bg-primary">
                        <AvatarFallback className="bg-green-600 text-white">
                          {transaction.username.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">
                          {transaction.username}
                        </div>{" "}
                        <div className="text-sm text-muted-foreground">
                          {transaction.handle}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 font-semibold">{transaction.amount}</td>
                  <td className="p-3">
                    <Badge
                      variant="secondary"
                      className={
                        transaction.type === "Tip"
                          ? "bg-secondary text-secondary-foreground"
                          : "bg-accent text-accent-foreground"
                      }
                    >
                      {transaction.type}
                    </Badge>
                  </td>{" "}
                  <td className="p-3 text-sm text-muted-foreground">
                    {transaction.date}
                  </td>
                  <td className="p-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-secondary/50 rounded-full">
                      <ArrowDown className="h-4 w-4 text-secondary-foreground" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

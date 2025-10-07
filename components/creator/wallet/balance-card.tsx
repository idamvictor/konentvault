"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DollarSign } from "lucide-react";
import { useUserStore } from "@/store/use-user-store";

export function BalanceCard() {
  const user = useUserStore((state) => state.user);

  const balance = Number(user?.balance ?? 0);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">${balance.toFixed(2)}</div>
        <CardDescription className="mt-2">
          Available for withdrawal
        </CardDescription>
      </CardContent>
    </Card>
  );
}

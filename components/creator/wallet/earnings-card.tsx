"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Calendar } from "lucide-react";
import { useEarnings } from "@/endpoint/creator/creator-queries";
import { Spinner } from "@/components/ui/spinner";

export function EarningsCard() {
  const { data: earningsData, isLoading } = useEarnings();

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex justify-center py-8">
          <Spinner />
        </CardContent>
      </Card>
    );
  }

  const total =
    earningsData?.earnings.reduce(
      (acc, curr) => acc + parseFloat(curr.netAmount),
      0
    ) || 0;

  const thisMonth =
    earningsData?.earnings
      .filter((earning) => {
        const date = new Date(earning.createdAt);
        const now = new Date();
        return (
          date.getMonth() === now.getMonth() &&
          date.getFullYear() === now.getFullYear()
        );
      })
      .reduce((acc, curr) => acc + parseFloat(curr.netAmount), 0) || 0;

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
            This month:{" "}
            <span className="font-medium text-foreground">
              ${thisMonth.toFixed(2)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

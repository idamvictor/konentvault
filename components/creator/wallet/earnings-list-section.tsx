"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EarningsTable } from "./earnings-table";
import { useEarnings } from "@/endpoint/creator/creator-queries";
import { Spinner } from "@/components/ui/spinner";

export function EarningsListSection() {
  const { data: earningsData, isLoading } = useEarnings();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Earnings History</CardTitle>
        <CardDescription>
          View all your earnings and revenue sources
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Spinner />
          </div>
        ) : (
          <EarningsTable earnings={earningsData?.earnings || []} />
        )}
      </CardContent>
    </Card>
  );
}

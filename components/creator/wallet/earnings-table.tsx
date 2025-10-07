"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { ArrowUpRightIcon, Folder } from "lucide-react";
import type { Earning } from "@/lib/wallet-data";
import Link from "next/link";

type EarningsTableProps = {
  earnings: Earning[];
};

const typeColors = {
  subscription:
    "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
  "one-time":
    "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  tip: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  commission:
    "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
};

export function EarningsTable({ earnings }: EarningsTableProps) {
  if (earnings.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Folder className="h-10 w-10" />
          </EmptyMedia>
          <EmptyTitle>No earnings yet</EmptyTitle>
          <EmptyDescription>
            Your earnings will appear here once you start receiving payments.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div className="flex gap-2">
            <Button
              variant="link"
              asChild
              className="text-muted-foreground"
              size="sm"
            >
              <Link href="/creator/settings">
                Set up payment methods{" "}
                <ArrowUpRightIcon className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
        </EmptyContent>
      </Empty>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Source</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="hidden md:table-cell">Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {earnings.map((earning) => (
            <TableRow key={earning.id}>
              <TableCell className="font-medium">{earning.source}</TableCell>
              <TableCell>
                <Badge variant="secondary" className={typeColors[earning.type]}>
                  {earning.type}
                </Badge>
              </TableCell>
              <TableCell className="font-semibold text-green-600 dark:text-green-400">
                +${earning.amount.toFixed(2)}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {new Date(earning.date).toLocaleDateString()}
              </TableCell>
              <TableCell className="hidden md:table-cell text-muted-foreground">
                {earning.description || "—"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

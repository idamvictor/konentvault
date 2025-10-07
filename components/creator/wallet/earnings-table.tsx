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
import type { Earning } from "@/endpoint/creator/creator-types";
import Link from "next/link";

type EarningsTableProps = {
  earnings: Earning[];
};

const typeColors = {
  subscription:
    "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
  media: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  tip: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
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
            <TableHead>Type</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Net Amount</TableHead>
            <TableHead>Commission</TableHead>
            <TableHead className="hidden md:table-cell">Status</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {earnings.map((earning) => (
            <TableRow key={earning.id}>
              <TableCell>
                <Badge variant="secondary" className={typeColors[earning.type]}>
                  {earning.type}
                </Badge>
              </TableCell>
              <TableCell className="font-semibold text-green-600 dark:text-green-400">
                +${earning.amount}
              </TableCell>
              <TableCell className="font-medium">
                ${earning.netAmount}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {earning.systemCommission}%
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Badge variant={earning.isPaid ? "default" : "secondary"}>
                  {earning.status}
                </Badge>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {new Date(earning.createdAt).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

"use client";

import { useState } from "react";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { EditPayoutDialog } from "./edit-payout-dialog";
import { DeletePayoutDialog } from "./delete-payout-dialog";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { ArrowUpRightIcon, InboxIcon } from "lucide-react";
import Link from "next/link";
import type { PayoutRequest } from "@/lib/wallet-data";

type PayoutRequestsTableProps = {
  requests: PayoutRequest[];
  onUpdate: (id: string, updates: Partial<PayoutRequest>) => void;
  onDelete: (id: string) => void;
};

const statusColors = {
  pending:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  processing:
    "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  completed:
    "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  rejected: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
};

export function PayoutRequestsTable({
  requests,
  onUpdate,
  onDelete,
}: PayoutRequestsTableProps) {
  const [editingRequest, setEditingRequest] = useState<PayoutRequest | null>(
    null
  );
  const [deletingRequest, setDeletingRequest] = useState<PayoutRequest | null>(
    null
  );

  if (requests.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <InboxIcon className="h-10 w-10" />
          </EmptyMedia>
          <EmptyTitle>No payout requests</EmptyTitle>
          <EmptyDescription>
            You haven&apos;t created any payout requests yet.
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
              <Link href="/creator/settings/wallet">
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
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Amount</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="font-medium">
                  ${request.amount.toFixed(2)}
                </TableCell>
                <TableCell>{request.paymentMethod}</TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={statusColors[request.status]}
                  >
                    {request.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(request.requestedAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => setEditingRequest(request)}
                      >
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setDeletingRequest(request)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {editingRequest && (
        <EditPayoutDialog
          request={editingRequest}
          open={!!editingRequest}
          onOpenChange={(open) => !open && setEditingRequest(null)}
          onSuccess={(updates) => {
            onUpdate(editingRequest.id, updates);
            setEditingRequest(null);
          }}
        />
      )}

      {deletingRequest && (
        <DeletePayoutDialog
          request={deletingRequest}
          open={!!deletingRequest}
          onOpenChange={(open) => !open && setDeletingRequest(null)}
          onSuccess={() => {
            onDelete(deletingRequest.id);
            setDeletingRequest(null);
          }}
        />
      )}
    </>
  );
}

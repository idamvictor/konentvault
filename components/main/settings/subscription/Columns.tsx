"use client";

import { formattedDate } from "@/lib/utils";
import { SubscriptionPlan } from "@/types/subscription";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

import { Edit, Trash } from "lucide-react";
import { EditSubscriptionModal } from "./EditSubscriptionModal";
import { DeleteSubscriptionModal } from "./DeleteSubscriptionModal";

export const columns: ColumnDef<SubscriptionPlan>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "duration",
    header: "Duration",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      return <div className="">{formattedDate(row.original.createdAt)}</div>;
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <EditSubscriptionModal
            plan={row.original}
            trigger={
              <Button variant="default" size="icon" className="rounded-full">
                <Edit className="h-4 w-4" />
              </Button>
            }
          />

          <DeleteSubscriptionModal
            plan={row.original}
            trigger={
              <Button
                variant="destructive"
                size="icon"
                className="rounded-full"
              >
                <Trash className="h-4 w-4" />
              </Button>
            }
          />
        </div>
      );
    },
  },
];

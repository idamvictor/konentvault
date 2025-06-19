import React from "react";

import { columns } from "./Columns";
import { DataTable } from "./Datatable";
import { useSubscriptionQuery } from "@/hooks/useSubscriptionQuery";
import { useUserStore } from "@/store/use-user-store";
import { TableSkeleton } from "@/components/skeletons/TableSkeleton";

const SubscriptionList = () => {
  const { user } = useUserStore((state) => state);

  const { data, isLoading } = useSubscriptionQuery(user?.id);

  if (isLoading) {
    return <TableSkeleton />;
  }

  return (
    <div className="w-full">
      {data && <DataTable columns={columns} data={data} />}
    </div>
  );
};

export default SubscriptionList;

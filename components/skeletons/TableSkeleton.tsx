import { Skeleton } from "@/components/ui/skeleton"

export function TableSkeleton({ rows = 5, columns = 5 }: { rows?: number; columns?: number }) {
  return (
    <div className="w-full space-y-2">
      {/* Table Header */}
      <div className="flex w-full gap-4 px-4">
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-[120px] rounded" />
        ))}
      </div>

      {/* Table Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex w-full gap-4 px-4 py-2">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton key={colIndex} className="h-4 w-[120px] rounded" />
          ))}
        </div>
      ))}
    </div>
  )
}

import { Skeleton } from "../ui/skeleton";

export function FormSkeleton() {
  return (
    <div className="space-y-4 px-4 pt-4 relative">
      {/* Username Field */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      {/* Bio Field */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-24 w-full rounded-md" />
      </div>

      {/* Submit Button */}
      <div className="space-y-2">
        <Skeleton className="h-10 w-[150px] rounded-md" />
      </div>
    </div>
  );
}

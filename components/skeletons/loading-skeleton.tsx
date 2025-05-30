import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "../ui/card";

export default function LoadingSkeleton() {
  return (
    <div className="p-4 space-y-4 bg-gray-50">
      {/* Header Skeleton */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="h-6 w-32" />
          </div>
        </CardContent>
      </Card>

      {/* Post Skeletons */}
      {[1, 2, 3].map((i) => (
        <Card key={i} className="border-0 shadow-sm">
          <CardContent className="p-0">
            <div className="p-4">
              <div className="flex items-center space-x-3 mb-4">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
            <Skeleton className="h-64 w-full" />
            <div className="p-4">
              <div className="flex space-x-4">
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-8 w-16" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

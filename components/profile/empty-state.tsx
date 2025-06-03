export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-6 flex justify-center">
        <div className="relative flex items-center justify-center">
          {/* Simple illustration of empty state */}
          <div className="flex items-center justify-center gap-2">
            <div className="h-16 w-16 border border-muted bg-muted/20 flex items-center justify-center">
              <div className="h-8 w-8 bg-muted/50"></div>
            </div>
            <div className="h-20 w-16 border border-muted bg-muted/20 flex items-center justify-center">
              <div className="h-6 w-6 rounded-full bg-muted/50"></div>
            </div>
            <div className="h-16 w-16 border border-muted bg-muted/20 flex items-center justify-center">
              <div className="h-8 w-8 rotate-45 bg-muted/50"></div>
            </div>
          </div>
        </div>
      </div>
      <h3 className="text-xl font-medium text-muted-foreground">
        No posts yet
      </h3>
    </div>
  );
}

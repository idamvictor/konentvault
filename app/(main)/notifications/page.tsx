import NotificationContent from "@/components/notifications/notification-content";
import RightPanel from "@/components/home/right-panel";
import LoadingSkeleton from "@/components/skeletons/loading-skeleton";
import React, { Suspense } from "react";

export default function NotificationsPage() {
  return (
    <>
      {/* Main Content Area */}
      <main className="flex-1 max-w-none">
        <div className="">
          <Suspense fallback={<LoadingSkeleton />}>
            <NotificationContent />
          </Suspense>
        </div>
      </main>

      {/* Right Panel */}
      <aside className="hidden lg:block w-[25%] bg-sidebar border-l border-sidebar-border h-full z-10">
        <Suspense
          fallback={<div className="p-4 text-muted-foreground">Loading...</div>}
        >
          <RightPanel />
        </Suspense>
      </aside>

    </>
  );
}

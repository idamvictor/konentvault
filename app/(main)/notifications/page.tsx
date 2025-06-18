import NotificationContent from "@/components/main/notifications/notification-content";
import RightPanel from "@/components/main/home/right-panel";
import LoadingSkeleton from "@/components/skeletons/loading-skeleton";
import React, { Suspense } from "react";

export default function NotificationsPage() {
  return (
    <div className="flex">
      {/* Main Content Area */}
      <main className="flex w-[70%]">
        <div className="">
          <Suspense fallback={<LoadingSkeleton />}>
            <NotificationContent />
          </Suspense>
        </div>
      </main>

      {/* Right Panel */}
      <aside className="hidden lg:block bg-sidebar border-l border-sidebar-border h-full z-10">
        <Suspense
          fallback={<div className="p-4 text-muted-foreground">Loading...</div>}
        >
          <RightPanel />
        </Suspense>
      </aside>
    </div>
  );
}

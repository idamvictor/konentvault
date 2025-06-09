"use client";

// import MainContent from "@/components/creator/home/main-content";
import RightPanel from "@/components/creator/home/right-panel";
import Subscribers from "@/components/creator/subscribers/subscribers-dashboard";
import LoadingSkeleton from "@/components/skeletons/loading-skeleton";
import { Suspense } from "react";

export default function SubscribersPage() {
  return (
    <>
      {/* Main Content Area */}
      <main className="flex-1 max-w-none border-1 border-border">
        <div className="">
          <Suspense fallback={<LoadingSkeleton />}>
            <Subscribers />
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

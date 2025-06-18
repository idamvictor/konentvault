"use client";

import MainContent from "@/components/main/home/main-content";
import RightPanel from "@/components/main/home/right-panel";
import LoadingSkeleton from "@/components/skeletons/loading-skeleton";
import { Suspense } from "react";

export default function Landing() {
  return (
    <div className="flex">
      {/* Main Content Area */}
      <main className="flex-1 max-w-none">
        <div className="">
          <Suspense fallback={<LoadingSkeleton />}>
            <MainContent />
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
    </div>
  );
}

"use client";

import MainContent from "@/components/main/home/main-content";
import RightPanel from "@/components/main/home/right-panel";
import LoadingSkeleton from "@/components/skeletons/loading-skeleton";
import { Suspense } from "react";

export default function Landing() {
  return (
    <>
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

      {/* Mobile Navigation Overlay */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border p-2 z-20">
        <div className="flex justify-around">
          <button className="p-2 text-muted-foreground hover:text-foreground">
            Home
          </button>
          <button className="p-2 text-muted-foreground hover:text-foreground">
            Search
          </button>
          <button className="p-2 text-muted-foreground hover:text-foreground">
            Messages
          </button>
          <button className="p-2 text-muted-foreground hover:text-foreground">
            Profile
          </button>
        </div>
      </div>
    </>
  );
}

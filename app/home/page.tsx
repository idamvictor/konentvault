"use client";

import MainContent from "@/components/landing/main-content";
import RightPanel from "@/components/landing/right-panel";
import Sidebar from "@/components/landing/sidebar";
import LoadingSkeleton from "@/components/skeletons/loading-skeleton";
import { Suspense } from "react";

export default function Landing() {
  return (
    <div className="flex min-h-screen bg-background container mx-auto">
      {/* Left Sidebar */}
      <aside className="hidden lg:block w-[25%] bg-sidebar border-r border-sidebar-border fixed h-full z-10">
        <Sidebar />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1  max-w-none">
        <div className="max-w-[50%] mx-auto">
          <Suspense fallback={<LoadingSkeleton />}>
            <MainContent />
          </Suspense>
        </div>
      </main>

      {/* Right Panel */}
      <aside className="hidden lg:block w-[25%] bg-sidebar border-l border-sidebar-border fixed right-0 h-full z-10">
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
    </div>
  );
}

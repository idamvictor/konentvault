import { Suspense } from "react";
import RightPanel from "@/components/landing/right-panel";
import LoadingSkeleton from "@/components/skeletons/loading-skeleton";
import Sidebar from "@/components/landing/sidebar";
import MainContent from "@/components/landing/main-content";

export default function Landing() {
  return (
    <div className="flex min-h-screen">
      {/* Left Sidebar */}
      <aside className="hidden lg:block w-64 bg-white border-r border-gray-200 fixed h-full">
        <Sidebar />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-64 lg:mr-80">
        <div className="max-w-2xl mx-auto">
          <Suspense fallback={<LoadingSkeleton />}>
            <MainContent />
          </Suspense>
        </div>
      </main>

      {/* Right Panel */}
      <aside className="hidden lg:block w-80 bg-white border-l border-gray-200 fixed right-0 h-full">
        <Suspense fallback={<div className="p-4">Loading...</div>}>
          <RightPanel />
        </Suspense>
      </aside>
    </div>
  );
}

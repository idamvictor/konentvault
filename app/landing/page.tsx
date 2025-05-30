import MainContent from "@/components/landing/main-content";
import RightPanel from "@/components/landing/right-panel";
import Sidebar from "@/components/landing/sidebar";
import LoadingSkeleton from "@/components/skeletons/loading-skeleton";
import { Suspense } from "react";


export default function Landing() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Sidebar */}
      <aside className="hidden lg:block w-64 bg-white border-r border-gray-200 fixed h-full z-10">
        <Sidebar />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-64 lg:mr-80 max-w-none">
        <div className="max-w-2xl mx-auto">
          <Suspense fallback={<LoadingSkeleton />}>
            <MainContent />
          </Suspense>
        </div>
      </main>

      {/* Right Panel */}
      <aside className="hidden lg:block w-80 bg-white border-l border-gray-200 fixed right-0 h-full z-10">
        <Suspense fallback={<div className="p-4">Loading...</div>}>
          <RightPanel />
        </Suspense>
      </aside>

      {/* Mobile Navigation Overlay */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2 z-20">
        <div className="flex justify-around">
          <button className="p-2 text-gray-600">Home</button>
          <button className="p-2 text-gray-600">Search</button>
          <button className="p-2 text-gray-600">Messages</button>
          <button className="p-2 text-gray-600">Profile</button>
        </div>
      </div>
    </div>
  );
}

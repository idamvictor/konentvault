"use client";

import ProtectedRoute from "@/components/auth/protected-route";
import Sidebar from "@/components/creator/sidebar";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-background container mx-auto">
        {/* Left Sidebar */}
        <aside className="hidden lg:block w-[25%] h-full z-10">
          <Sidebar />
        </aside>

        {/* Main Content Area */}
        {children}
      </div>
    </ProtectedRoute>
  );
}

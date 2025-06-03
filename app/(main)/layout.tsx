"use client";

import Sidebar from "@/components/home/sidebar";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen bg-background container mx-auto">
      {/* Left Sidebar */}
      <aside className="hidden lg:block w-[25%] fixed h-full z-10">
        <Sidebar />
      </aside>

      {/* Main Content Area */}
      {children}
    </div>
  );
}

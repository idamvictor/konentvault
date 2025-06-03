import ProfileSidebar from "@/components/profile/profile-sidebar";
import ProfileView from "@/components/profile/profile-view";
import React from "react";

export default function ProfilePage() {
  return (
    <div className="flex flex-1 flex-col md:flex-row min-h-screen bg-background">
      <div className="flex-1 border-r border-border">
        <ProfileView />
      </div>
      <div className="w-full md:w-[350px]">
        <ProfileSidebar />
      </div>
    </div>
  );
}

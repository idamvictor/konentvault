import ProfilePage from "@/components/creator-profile/profile-page";
import React from "react";

interface CreatorProfilePageProps {
  params: Promise<{ username: string }>;
}

export default async function CreatorProfilePage({
  params,
}: CreatorProfilePageProps) {
  const username = (await params).username;
  return (
    <div className="w-full">
      {" "}
      <ProfilePage username={username} />
    </div>
  );
}

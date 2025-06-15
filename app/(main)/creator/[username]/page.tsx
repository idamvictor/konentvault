import ProfilePage from "@/components/creator-profile/profile-page";
import React from "react";

export default function CreatorProfilePage({
  params,
}: {
  params: { username: string };
}) {
  return (
    <div className="w-full">
      {" "}
      <ProfilePage params={{ username: params.username }} />
    </div>
  );
}

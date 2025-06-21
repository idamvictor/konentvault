"use client";

import ProfileForm from "@/components/main/settings/account/profile-form";
import { useUserProfile } from "@/hooks/useUserProfile";

const Account = () => {
  const { user, isLoading } = useUserProfile();

  if (isLoading) return <div>Loading...</div>;
  if (!user) return null;

  return (
    <div className="pt-4 sticky top-0 w-full bg-bgColor border-b border-border z-10">
      <div className="px-4">
        <h3 className="text-sm sm:text-base uppercase font-medium text-foreground mb-4">
          Edit Profile
        </h3>
      </div>

      <ProfileForm user={user} />
    </div>
  );
};

export default Account;

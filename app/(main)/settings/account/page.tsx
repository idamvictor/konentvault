"use client";

import ProfileForm from "@/components/main/settings/profile-form";
import { useUserStore } from "@/store/use-user-store";

const Account = () => {
  const user = useUserStore((state) => state.user);

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

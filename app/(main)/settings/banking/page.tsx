"use client";

import { fetchUserProfile } from "@/services/user/user-services";
import { useUserStore } from "@/store/use-user-store";
import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BankingForm from "../../../../components/main/settings/banking/BankingForm";
import { FormSkeleton } from "@/components/skeletons/form-skeleton";

const BankingSettings = () => {
  const { setUser } = useUserStore((state) => state);

  const {
    data: user,
    error,
    isLoading,
  } = useQuery<User>({
    queryKey: ["userProfile"],
    queryFn: fetchUserProfile,
  });

  // ✅ Update Zustand state when user changes
  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user, setUser]);

  if (isLoading) return <FormSkeleton />;
  if (error) return <p>Error: {(error as Error).message}</p>;
  return (
    <section className="grid items-center gap-0 mt-0">
      <div className="pt-4 sticky top-0 w-full bg-bgColor border-b border-border z-10">
        <div className="px-4">
          <h3 className="text-sm sm:text-base uppercase font-medium text-foreground mb-4">
            Bank Details
          </h3>
        </div>
      </div>
      <div className="px-4 mt-4">
        {/* <Tabs defaultValue="banking" className="w-full">
				<TabsList className="w-full bg-transparent justify-start">
					<TabsTrigger value="banking" className="flex items-center gap-2">
						<Image src="/banking/banking-ico.avif" width={32} height={32} className="object-contain" alt="bank" />
						Bank Transfer
					</TabsTrigger>
					<TabsTrigger value="password">Password</TabsTrigger>
				</TabsList>
				<TabsContent value="banking">Make changes to your account here.</TabsContent>
				<TabsContent value="password">Change your password here.</TabsContent>
			</Tabs> */}
        <BankingForm user={user} />
      </div>
    </section>
  );
};

export default BankingSettings;

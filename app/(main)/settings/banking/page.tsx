"use client";

import React from "react";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BankingForm from "../../../../components/main/settings/banking/BankingForm";
import { FormSkeleton } from "@/components/skeletons/form-skeleton";
import { useUserProfile } from "@/hooks/useUserProfile";

const BankingSettings = () => {
  const { user, isLoading, error } = useUserProfile();

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
        <BankingForm user={user} />
      </div>
    </section>
  );
};

export default BankingSettings;

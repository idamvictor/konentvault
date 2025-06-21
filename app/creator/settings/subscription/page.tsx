"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

import SubscriptionList from "../../../../components/main/settings/subscription/SubscriptionList";
import { useUserStore } from "@/store/use-user-store";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CreateSubscriptionModal } from "../../../../components/main/settings/subscription/CreateSubscriptionModal";
// import { LoaderCircle } from 'lucide-react';

const SubscriptionSetting = () => {
  const { user } = useUserStore((state) => state);
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <div className="pt-4 sticky top-0 w-full bg-bgColor border-b border-border z-10">
        <div className="px-4">
          <h3 className="text-sm sm:text-base uppercase font-medium text-foreground mb-4">
            Subscription Plan
          </h3>
        </div>
      </div>

      <Card className="w-full p-0 rounded-none shadow-none border-0 hover:shadow">
        <CardContent className="p-4">
          {user && user.isVerified !== false && (
            <p className="text-sm sm:text-base mb-4 text-muted-foreground">
              Your identity verification status is
              <span className="font-bold text-red-500">
                {/* <LoaderCircle className='animate-spin' size={14} /> */}
                Pending
              </span>
            </p>
          )}
          {/* create new subscription plan button */}
          <div className="flex justify-end w-full">
            <Button
              className="mb-4 bg-primary text-white hover:bg-primary/80 hover:text-primary"
              variant="default"
              onClick={() => setOpen(true)}
            >
              <Plus className="mr-2" size={16} />
              Create Plan
            </Button>
          </div>

          {/* create new subscription plan form */}
          <CreateSubscriptionModal open={open} setOpen={setOpen} />

          {/* <SubscriptionPriceForm user={user} /> */}
          <SubscriptionList />
        </CardContent>
      </Card>
    </>
  );
};

export default SubscriptionSetting;

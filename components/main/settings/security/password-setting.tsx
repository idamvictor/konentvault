"use client";

import React from "react";
import { usePathname } from "next/navigation";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ChangePasswordForm from "@/components/main/settings/security/ChangePasswordForm";

const PasswordSetting = () => {
  const pathname = usePathname();
  const isCreatorSettings = pathname === "/creator/settings";
  return (
    <>
      <div className="px-4 pt-4 relative">
        <div className="flex gap-4 items-start">
          {!isCreatorSettings && (
            <Button
              variant="link"
              asChild
              className="text-foreground p-0 h-auto hover:text-primary hover:bg-transparent"
            >
              <Link href={"/settings/security"}>
                <ArrowLeft size={25} />
              </Link>
            </Button>
          )}
          <h3 className="text-sm sm:text-base uppercase font-medium text-foreground">
            Change your password
          </h3>
        </div>
      </div>

      <div className="w-full px-4 rounded-none mt-4">
        {/* change password form */}
        <ChangePasswordForm />
      </div>
    </>
  );
};

export default PasswordSetting;

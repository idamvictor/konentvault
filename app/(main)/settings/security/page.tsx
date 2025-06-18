"use client";
import React from "react";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

const securitySidebarLinks = [
  {
    label: "Change your password",
    description: "You can change your password here",
    route: "/settings/security/password",
  },
  {
    label: "Change your email",
    description: "You can change your email here",
    route: "/settings/security/email",
  },
  {
    label: "Two-Factor Authentication",
    description: "You can enable Two-Factor Authentication here",
    route: "/settings/security/two-factor",
  },
];

const Security = () => {
  const pathname = usePathname();

  return (
    <>
      <div className="pt-4 sticky top-0 w-full bg-bgColor border-b border-border z-10">
        <div className="px-4">
          <h3 className="text-sm sm:text-base uppercase font-medium text-foreground mb-4">
            My Settings
          </h3>
        </div>
      </div>

      <div className="w-full text-base font-medium rounded-none mt-4">
        {securitySidebarLinks.map((link) => {
          const isActive = pathname.startsWith(link.route); // Use startsWith for partial matches
          return (
            <Link
              key={link.label}
              href={link.route}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                isActive ? "border-r-2 border-primary bg-muted" : "",
                "flex justify-between items-center w-full px-4 py-3 cursor-pointer hover:bg-muted"
              )}
            >
              <div className="flex flex-col gap-1">
                <span>{link.label}</span>
                <span className="text-xs">{link.description}</span>
              </div>

              <ChevronRight size={20} />
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Security;

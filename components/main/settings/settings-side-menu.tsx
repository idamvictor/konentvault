"use client";

// import { settingsSidebar } from "@/constants";
import { cn } from "@/lib/utils";
import {
  ChevronRight,
  KeyRound,
  Settings,
  ShieldCheck,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const settingsSidebar = [
  {
    label: "My Account",
    route: "/settings/account",
    icon: User,
  },
  {
    label: "Security Settings",
    route: "/settings/security",
    icon: Lock,
  },
  {
    label: "Subscription Settings",
    route: "/settings/subscription",
    icon: Settings,
  },
  {
    label: "Banking (To Earn)",
    route: "/settings/banking",
    icon: ShieldCheck,
  },
  {
    label: "Two-Factor Authentication",
    route: "/settings/two-factor",
    icon: KeyRound,
  },
  {
    label: "ID Verification",
    route: "/settings/id-verification",
    icon: KeyRound,
  },
];

const SettingsSideMenu = () => {
  // Get current route
  const pathname = usePathname();

  return (
    <section className="custom-scrollbar bg-bgColor rightsidebar border-l p-0 pt-4">
      <div className="flex flex-1 flex-col justify-start">
        <div className="px-4">
          <h3 className="text-sm sm:text-base uppercase font-medium text-foreground">
            Settings
          </h3>
        </div>

        <div className="w-full text-base font-medium text-muted-foreground rounded-none mt-4">
          {settingsSidebar.map((link) => {
            const isActive = pathname.startsWith(link.route); // Use startsWith for partial matches
            return (
              <Link
                key={link.label}
                href={link.route}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  isActive ? "border-r-2 border-primary bg-muted" : "",
                  "flex justify-between items-center w-full px-4 py-3 text-muted-foreground cursor-pointer hover:bg-muted"
                )}
              >
                <span> {link.label}</span>
                <ChevronRight size={20} />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SettingsSideMenu;

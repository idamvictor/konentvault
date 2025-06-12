"use client";

import {
  Home,
  MessageCircle,
  Bell,
  User,
  // Bookmark,
  Users,
  LayoutDashboard,
  Settings,
  // HelpCircle,
  UserRoundPlus,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";

// Group definitions for the sidebar
const mainNavigation = [
  { icon: Home, label: "Home", href: "/creator/home", badge: null },
  {
    icon: Bell,
    label: "Notifications",
    href: "/creator/notifications",
    badge: "1",
  },
  {
    icon: MessageCircle,
    label: "Messages",
    href: "/creator/messages",
    badge: null,
  },
];

const quickAccess = [
  { icon: User, label: "My Profile", href: "/creator/profile", badge: null },
  // {
  //   icon: Bookmark,
  //   label: "Bookmarks",
  //   href: "/creator/bookmarks",
  //   badge: null,
  // },
  { icon: Users, label: "Referrals", href: "/creator/referrals", badge: null },
];

const finance = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/creator/dashboard",
    badge: null,
  },
  {
    icon: UserRoundPlus,
    label: "Subscribers",
    href: "/creator/subscribers",
    badge: null,
  },
];

const preferences = [
  { icon: Settings, label: "Settings", href: "/creator/settings", badge: null },
  // {
  //   icon: HelpCircle,
  //   label: "Help Center",
  //   href: "/creator/help",
  //   badge: null,
  // },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();
  return (
    <>
      <nav
        className="flex flex-col h-full bg-white w-full"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex-1">
          <ul className="space-y-1.5 px-3 pt-6">
            {mainNavigation.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={`relative flex items-center gap-x-4 px-4 py-3 rounded-xl text-[15px] transition-all duration-200 ${
                    pathname === item.href
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-gray-700 hover:bg-gray-100/80"
                  }`}
                >
                  <item.icon className="w-6 h-6" aria-hidden="true" />
                  <span className="font-medium">{item.label}</span>
                  {item.badge && (
                    <span className="absolute right-4 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[12px] font-medium text-white">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            ))}

            <li className="pt-4">
              <p className="px-4 text-sm font-medium text-gray-500">
                Quick Access
              </p>
            </li>
            {quickAccess.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={`relative flex items-center gap-x-4 px-4 py-3 rounded-xl text-[15px] transition-all duration-200 ${
                    pathname === item.href
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-gray-700 hover:bg-gray-100/80"
                  }`}
                >
                  <item.icon className="w-6 h-6" aria-hidden="true" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            ))}

            <li className="pt-4">
              <p className="px-4 text-sm font-medium text-gray-500">Finance</p>
            </li>
            {finance.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={`relative flex items-center gap-x-4 px-4 py-3 rounded-xl text-[15px] transition-all duration-200 ${
                    pathname === item.href
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-gray-700 hover:bg-gray-100/80"
                  }`}
                >
                  <item.icon className="w-6 h-6" aria-hidden="true" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            ))}

            <li className="pt-4">
              <p className="px-4 text-sm font-medium text-gray-500">
                Preferences
              </p>
            </li>
            {preferences.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={`relative flex items-center gap-x-4 px-4 py-3 rounded-xl text-[15px] transition-all duration-200 ${
                    pathname === item.href
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-gray-700 hover:bg-gray-100/80"
                  }`}
                >
                  <item.icon className="w-6 h-6" aria-hidden="true" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-3 mt-auto border-t border-border">
          <div className="flex items-center gap-x-4 p-2 bg-primary/20 rounded-xl">
            <Avatar className="w-10 h-10 ring-2 ring-primary/10">
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" />
              <AvatarFallback>C</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-[15px] font-semibold text-foreground truncate">
                Creator8492147164
              </p>
              <p className="text-sm text-muted-foreground truncate">@zack25</p>
            </div>
            <button
              className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
              aria-label="Logout"
              onClick={() => logout()}
            >
              <LogOut className="w-5 h-5 text-primary" />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}

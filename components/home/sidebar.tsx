"use client";

import {
  Home,
  Bell,
  MessageCircle,
  Bookmark,
  User,
  MoreHorizontal,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePathname } from "next/navigation";

const navigationItems = [
  { icon: Home, label: "Home", href: "/home", badge: null },
  { icon: Bell, label: "Notifications", href: "/notifications", badge: null },
  { icon: MessageCircle, label: "Messages", href: "/messages", badge: "10" },
  { icon: Bookmark, label: "Collections", href: "/collections", badge: null },
  { icon: Users, label: "Subscriptions", href: "/subscriptions", badge: null },
  { icon: User, label: "My profile", href: "/profile", badge: null },
  { icon: MoreHorizontal, label: "More", href: "/more", badge: null },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <nav
      className="flex flex-col h-full bg-white w-full"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex-1">
        <div className="p-6">
          <Avatar className="w-12 h-12 ring-2 ring-primary/10">
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>

        <ul className="space-y-1.5 px-3">
          {navigationItems.map((item) => (
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
        </ul>
      </div>

      <div className="p-5 mt-auto border-t border-gray-200">
        <div className="flex items-center space-x-4">
          <Avatar className="w-12 h-12 ring-2 ring-primary/10">
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-[15px] font-semibold text-gray-900 truncate">
              Your Account
            </p>
            <p className="text-sm text-gray-500 truncate">@youraccount</p>
          </div>
        </div>
      </div>
    </nav>
  );
}

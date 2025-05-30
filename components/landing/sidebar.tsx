'use client'

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
      className="flex flex-col h-full bg-white"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex-1">
        <div className="p-4">
          <Avatar className="w-10 h-10">
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>

        <ul className="space-y-1 px-2">
          {navigationItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className={`relative flex items-center gap-x-3 px-3 py-2.5 rounded-lg text-sm transition-colors duration-200 ${
                  pathname === item.href
                    ? "bg-primary-100 text-primary-800 font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <item.icon className="w-5 h-5" aria-hidden="true" />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="absolute right-3 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[11px] font-medium text-white">
                    {item.badge}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-4 mt-auto border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              Your Account
            </p>
            <p className="text-xs text-gray-500 truncate">
              @youraccount
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
}

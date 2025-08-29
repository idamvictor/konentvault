"use client";

import {
  Home,
  Bell,
  MessageCircle,
  Bookmark,
  User,
  MoreHorizontal,
  Users,
  Video,
} from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePathname } from "next/navigation";
import { useState } from "react";
import UserMenuModal from "./modals/main/UserMenuModal";
import { useUserStore } from "@/store/use-user-store";

const getInitials = (name: string | undefined) => {
  if (!name) return "U";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const navigationItems = [
  { icon: Home, label: "Home", href: "/home", badge: null },
  { icon: Bell, label: "Notifications", href: "/notifications", badge: null },
  { icon: MessageCircle, label: "Messages", href: "/messages", badge: "10" },
  { icon: Bookmark, label: "Collections", href: "/collections", badge: null },
  { icon: Users, label: "Subscriptions", href: "/subscriptions", badge: null },
  { icon: Video, label: "Streaming", href: "/streaming", badge: null },
  { icon: User, label: "My profile", href: "/profile", badge: null },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useUserStore((state) => state.user);

  const handleMoreClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMenuOpen(true);
  };

  return (
    <>
      <nav
        className="flex flex-col h-full bg-white w-full"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex-1">
          <div className="p-6">
            <div className="flex items-center space-x-4">
              <Avatar className="w-12 h-12 ring-2 ring-primary/10">
                <AvatarImage
                  src={`${process.env.NEXT_PUBLIC_API_URL}/${user?.profilePicture}`}
                  className="w-fill"
                />
                <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-[15px] font-semibold text-gray-900 truncate">
                  {user?.name || "Your Account"}
                </p>
                <p className="text-sm text-gray-500 truncate">{user?.email}</p>
              </div>
            </div>
          </div>{" "}
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
            <li>
              <button
                onClick={handleMoreClick}
                className="relative w-full flex items-center gap-x-4 px-4 py-3 rounded-xl text-[15px] transition-all duration-200 text-gray-700 hover:bg-gray-100/80"
              >
                <MoreHorizontal className="w-6 h-6" aria-hidden="true" />
                <span className="font-medium">More</span>
              </button>
            </li>
          </ul>
        </div>{" "}
        <div className="p-5 mt-auto border-t border-gray-200">
          <button className="w-full bg-primary text-white rounded-full py-3 font-medium hover:bg-primary/90 transition-colors">
            + NEW POST
          </button>
        </div>{" "}
      </nav>
      <UserMenuModal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}

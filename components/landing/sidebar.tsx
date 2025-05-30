import {
  Home,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navigationItems = [
  { icon: Home, label: "Home", href: "/", active: '' },

  { icon: Settings, label: "More", href: "/settings" },
];

export default function Sidebar() {
  return (
    <nav
      className="p-4 h-full flex flex-col bg-sidebar"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="mt-auto pt-4  border-sidebar-border">
        <div className="flex items-center space-x-3 mb-4">
          <Avatar className="w-10 h-10">
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">
              Your Account
            </p>
            <p className="text-xs text-sidebar-foreground/60 truncate">
              @youraccount
            </p>
          </div>
        </div>
      </div>

      

      <ul className="space-y-1 flex-1">
        {navigationItems.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors duration-200 ${
                item.active
                  ? "bg-sidebar-accent text-sidebar-primary font-medium"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              }`}
              aria-current={item.active ? "page" : undefined}
            >
              <item.icon className="w-5 h-5" aria-hidden="true" />
              <span className="text-sm">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

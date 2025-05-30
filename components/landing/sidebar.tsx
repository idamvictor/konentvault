import {
  Home,
  Search,
  Bell,
  Mail,
  Bookmark,
  User,
  Settings,
} from "lucide-react";
import Link from "next/link";

const navigationItems = [
  { icon: Home, label: "Home", href: "/", active: true },
  { icon: Search, label: "Explore", href: "/explore" },
  { icon: Bell, label: "Notifications", href: "/notifications" },
  { icon: Mail, label: "Messages", href: "/messages" },
  { icon: Bookmark, label: "Bookmarks", href: "/bookmarks" },
  { icon: User, label: "Profile", href: "/profile" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export default function Sidebar() {
  return (
    <nav
      className="p-4 h-full flex flex-col"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-blue-600">Creative Hub</h1>
      </div>

      <ul className="space-y-2 flex-1">
        {navigationItems.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                item.active
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              aria-current={item.active ? "page" : undefined}
            >
              <item.icon className="w-6 h-6" aria-hidden="true" />
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-4 border-t border-gray-200">
        <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200">
          Create Post
        </button>
      </div>
    </nav>
  );
}

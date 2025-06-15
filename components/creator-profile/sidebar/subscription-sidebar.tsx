import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { SubscriptionButton } from "../ui/subscription-button";

interface SubscriptionSidebarProps {
  price: string;
}

export function SubscriptionSidebar({ price }: SubscriptionSidebarProps) {
  return (
    <div className="w-80 bg-white border-l border-gray-200 p-6 space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search user's post"
          className="pl-10 bg-gray-50 border-gray-200"
        />
      </div>

      {/* Subscription */}
      <div>
        <h3 className="text-gray-500 text-sm font-medium mb-3">SUBSCRIPTION</h3>
        <SubscriptionButton price={price} />
      </div>

      {/* Legal Links */}
      <div className="flex gap-4 text-xs text-gray-400">
        <a href="#" className="hover:text-gray-600">
          Privacy
        </a>
        <span>•</span>
        <a href="#" className="hover:text-gray-600">
          Cookie Notice
        </a>
        <span>•</span>
        <a href="#" className="hover:text-gray-600">
          Terms of Service
        </a>
      </div>
    </div>
  );
}

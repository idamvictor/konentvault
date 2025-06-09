import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import MostEngagedUser from "./right-panel/most-engaged-user";
import TopUser from "./right-panel/top-users-grid";

export default function RightPanel() {
  return (
    <div className="w-full max-w-md mx-auto p-4 space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search here..."
          className="pl-10 bg-muted/50 border-0"
        />
      </div>

      {/* Most Engaged User Component */}
      <MostEngagedUser />

      {/* Top Users Component */}
      <TopUser />
    </div>
  );
}

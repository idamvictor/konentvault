import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle, Crown } from "lucide-react";

export default function TopUser() {
  const topUsers = [
    {
      id: 1,
      initials: "OB",
      username: "User0129151124",
      handle: "@Olamideb",
      subscriptions: 7,
      spent: "$183K",
    },
    {
      id: 2,
      initials: "MP",
      username: "User6898826197",
      handle: "@Regardstoy",
      subscriptions: 3,
      spent: "$124K",
    },
    {
      id: 3,
      initials: "BC",
      username: "User028378938",
      handle: "@Boycoco1",
      subscriptions: 6,
      spent: "$95K",
    },
    {
      id: 4,
      initials: "HO",
      username: "User854876864",
      handle: "@Habeeb08",
      subscriptions: 5,
      spent: "$85K",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Top Users</h2>
        <Select defaultValue="sort-by">
          <SelectTrigger className="w-32 border-0 bg-muted/50">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sort-by">Sort By</SelectItem>
            <SelectItem value="engagement">Engagement</SelectItem>
            <SelectItem value="spending">Spending</SelectItem>
            <SelectItem value="subscriptions">Subscriptions</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <p className="text-sm text-muted-foreground">
        Discover and connect with the top users who are most engaged with your
        content, and see who&apos;s supporting you the most.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {topUsers.map((user) => (
          <Card key={user.id} className="relative overflow-hidden border-0">
            <div className="absolute inset-0 bg-pink-50 z-0" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/50 opacity-100 top-[40%] z-10" />

            <CardContent className="p-4 relative z-20">
              <div className="space-y-3">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold text-lg border-2 border-white/20 mx-auto">
                  {user.initials}
                </div>

                <div className="space-y-2 text-center">
                  {/* Top Spender Badge */}
                  <Badge className="bg-yellow-500 text-black font-semibold px-2 py-1 text-xs">
                    <Crown className="h-3 w-3 mr-1" />
                    TOP SPENDER
                  </Badge>

                  {/* User Info */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-center gap-1">
                      <span className="font-semibold text-sm text-white">
                        {user.username}
                      </span>
                      <CheckCircle className="h-3 w-3 text-blue-300" />
                    </div>
                    <p className="text-xs text-white/90">{user.handle}</p>
                  </div>

                  {/* Stats */}
                  <div className="flex justify-center gap-3 text-xs text-white">
                    <div className="flex items-center gap-1">
                      <span className="opacity-90">📧 SUBS</span>
                      <span className="font-bold">{user.subscriptions}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="opacity-90">💰 SPENT</span>
                      <span className="font-bold">{user.spent}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

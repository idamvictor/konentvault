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
      spent: "$95K",
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
          <Card
            key={user.id}
            className="relative overflow-hidden border-0 bg-gradient-to-r from-primary  to-primary/50 text-primary-foreground"
          >
            <CardContent className="p-4">
              <div className="space-y-3">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-bold text-lg border-2 border-primary/20 mx-auto">
                  {user.initials}
                </div>

                {/* Top Spender Badge */}
                <div className="text-center">
                  <Badge className="bg-accent text-accent-foreground font-semibold px-2 py-1 text-xs">
                    <Crown className="h-3 w-3 mr-1" />
                    TOP SPENDER
                  </Badge>
                </div>

                {/* User Info */}
                <div className="text-center space-y-1">
                  <div className="flex items-center justify-center gap-1">
                    <span className="font-semibold text-sm">
                      {user.username}
                    </span>
                    <CheckCircle className="h-3 w-3 text-accent" />
                  </div>
                  <p className="text-xs opacity-90">{user.handle}</p>
                </div>

                {/* Stats */}
                <div className="flex justify-center gap-3 text-xs">
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
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

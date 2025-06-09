import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Crown, Lock } from "lucide-react";

export default function MostEngagedUser() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Most Engaged Subscribers</h2>

      <Card className="relative overflow-hidden border-0 bg-gradient-to-r from-primary  to-primary/50 text-primary-foreground">
        <CardContent className="p-6">
          {/* Decorative Lock Icon */}
          <div className="absolute top-4 right-4 opacity-20">
            <Lock className="h-8 w-8" />
          </div>

          <div className="flex items-start gap-4">
            {/* Avatar */}
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-bold text-xl border-4 border-primary/20">
                BE
              </div>
            </div>

            <div className="flex-1 space-y-2">
              {/* Top Spender Badge */}
              <Badge className="bg-accent text-accent-foreground font-semibold px-2 py-1 text-xs">
                <Crown className="h-3 w-3 mr-1" />
                TOP SPENDER
              </Badge>

              {/* User Info */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">User2465184630</span>
                  <CheckCircle className="h-4 w-4 text-accent" />
                </div>
                <p className="text-sm opacity-90">@mailerhello</p>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <span className="opacity-90">📧 SUBSCRIPTIONS</span>
                  <span className="font-bold">21</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="opacity-90">💰 SPENT</span>
                  <span className="font-bold">₦6.5M</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

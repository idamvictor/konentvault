import { TrendingDown, ChevronDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function SummaryCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="text-2xl font-bold">₦0.00</div>{" "}
              <div className="text-sm text-muted-foreground">Total Earned</div>
              <div className="flex items-center gap-1 text-sm text-destructive">
                <TrendingDown className="h-4 w-4" />
                <span>0% Today</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-xl font-semibold text-accent-foreground">
                $0.00
              </div>
              <Button variant="ghost" size="sm">
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="text-2xl font-bold">₦0.00</div>{" "}
              <div className="text-sm text-muted-foreground">
                Total Withdrawn
              </div>
              <div className="flex items-center gap-1 text-sm text-destructive">
                <TrendingDown className="h-4 w-4" />
                <span>0% Today</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-xl font-semibold text-destructive">
                $0.00
              </div>
              <Button variant="ghost" size="sm">
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import { TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function BalanceCard() {
  return (
    <Card className="bg-primary text-primary-foreground border-0">
      <CardContent className="p-6">
        <div className="space-y-4">
          <h2 className="text-lg font-medium">Available Balance</h2>

          <div className="flex items-center justify-between">
            <div className="text-3xl md:text-4xl font-bold">₦2,940.00</div>
            <div className="text-right">
              <div className="text-2xl md:text-3xl font-bold">$0.00</div>
              <div className="flex items-center gap-1 text-sm opacity-90">
                <TrendingDown className="h-4 w-4" />
                <span>0%</span>
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-colors"
            aria-label="Withdraw funds"
          >
            <TrendingDown className="mr-2 h-4 w-4" />
            Withdraw
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

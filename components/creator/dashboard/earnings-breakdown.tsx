"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const monthlyData = [
  { month: "January", usd: "$0.00", ngn: "₦0.00" },
  { month: "February", usd: "$0.00", ngn: "₦0.00" },
  { month: "March", usd: "$0.00", ngn: "₦0.00" },
  { month: "April", usd: "$0.00", ngn: "₦0.00" },
  { month: "May", usd: "$0.00", ngn: "₦0.00" },
  { month: "June", usd: "$0.00", ngn: "₦2,940.00" },
];

export function EarningsBreakdown() {
  const [selectedYear, setSelectedYear] = useState("2025");

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>Earnings Breakdown</CardTitle>
        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger className="w-24">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2025">2025</SelectItem>
            <SelectItem value="2024">2024</SelectItem>
            <SelectItem value="2023">2023</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {monthlyData.map((item) => (
            <div
              key={item.month}
              className="flex items-center justify-between py-2"
            >
              <span className="font-medium">{item.month}</span>
              <div className="flex items-center gap-4">
                {" "}
                <span className="text-sm text-muted-foreground">
                  {item.usd}
                </span>
                <span className="font-semibold text-foreground">
                  {item.ngn}
                </span>
                <Button variant="ghost" size="sm">
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

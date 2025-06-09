"use client";

import { useState } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = {
  Today: [
    { time: "00:00", earnings: 0 },
    { time: "03:00", earnings: 0 },
    { time: "06:00", earnings: 150 },
    { time: "09:00", earnings: 420 },
    { time: "12:00", earnings: 680 },
    { time: "15:00", earnings: 890 },
    { time: "18:00", earnings: 1200 },
    { time: "21:00", earnings: 1450 },
    { time: "24:00", earnings: 1650 },
  ],
  "This week": [
    { time: "Mon", earnings: 1200 },
    { time: "Tue", earnings: 1800 },
    { time: "Wed", earnings: 2400 },
    { time: "Thu", earnings: 1900 },
    { time: "Fri", earnings: 3200 },
    { time: "Sat", earnings: 2800 },
    { time: "Sun", earnings: 2100 },
  ],
  "This month": [
    { time: "Week 1", earnings: 8500 },
    { time: "Week 2", earnings: 12300 },
    { time: "Week 3", earnings: 15600 },
    { time: "Week 4", earnings: 18900 },
  ],
  "This year": [
    { time: "Jan", earnings: 45000 },
    { time: "Feb", earnings: 52000 },
    { time: "Mar", earnings: 48000 },
    { time: "Apr", earnings: 61000 },
    { time: "May", earnings: 55000 },
    { time: "Jun", earnings: 67000 },
    { time: "Jul", earnings: 72000 },
    { time: "Aug", earnings: 68000 },
    { time: "Sep", earnings: 75000 },
    { time: "Oct", earnings: 82000 },
    { time: "Nov", earnings: 78000 },
    { time: "Dec", earnings: 85000 },
  ],
  All: [
    { time: "2021", earnings: 245000 },
    { time: "2022", earnings: 380000 },
    { time: "2023", earnings: 520000 },
    { time: "2024", earnings: 680000 },
    { time: "2025", earnings: 420000 },
  ],
};

const timeRanges = [
  "Today",
  "This week",
  "This month",
  "This year",
  "All",
] as const;
type TimeRange = (typeof timeRanges)[number];

const chartConfig = {
  earnings: {
    label: "Earnings",
    color: "hsl(var(--chart-1))",
  },
};

export function EarningsChart() {
  const [activeRange, setActiveRange] = useState<TimeRange>("Today");
  const currentData = chartData[activeRange];
  const totalEarnings = currentData[currentData.length - 1]?.earnings || 0;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Earnings</CardTitle>
        <div className="flex flex-wrap gap-2">
          {timeRanges.map((range) => (
            <Button
              key={range}
              variant={activeRange === range ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveRange(range)}
              className={
                activeRange === range ? "bg-primary hover:bg-primary/90" : ""
              }
            >
              {range}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="text-2xl font-bold">
            {formatCurrency(totalEarnings)}
          </div>{" "}
          <div className="text-sm text-muted-foreground">
            Total for {activeRange.toLowerCase()}
          </div>
        </div>

        <ChartContainer config={chartConfig} className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={currentData}
              margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
            >
              <defs>
                <linearGradient
                  id="earningsGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="rgb(220, 38, 38)"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="rgb(220, 38, 38)"
                    stopOpacity={0.05}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="time"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#666" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#666" }}
                tickFormatter={formatCurrency}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value) => [
                      formatCurrency(Number(value)),
                      "Earnings",
                    ]}
                    labelFormatter={(label) => `Time: ${label}`}
                  />
                }
              />
              <Area
                type="monotone"
                dataKey="earnings"
                stroke="rgb(220, 38, 38)"
                strokeWidth={2}
                fill="url(#earningsGradient)"
                dot={{ fill: "rgb(220, 38, 38)", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "rgb(220, 38, 38)", strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

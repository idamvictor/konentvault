"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  MoreHorizontal,
  SlidersHorizontal,
  ChevronRight,
  MessageCircle,
  ChevronLeft,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const filterTabs = [
  { label: "All", count: 1, active: true },
  { label: "Active", count: 1, active: false },
  { label: "VIP", count: 0, active: false },
  { label: "Expired", count: 0, active: false },
];

const subscriber = {
  id: "991813214",
  username: "User991813214",
  handle: "@learn.z",
  avatar: "I",
  nextRenewal: "29/06/2025",
  price: "₦0.00",
  totalSpent: "₦4,200.00",
  avatarColor: "bg-green-600",
};

export default function SubscibersDashboard() {
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="max-w-4xl mx-auto p-4 bg-background min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-primary">Subscribers</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">More options</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Export subscribers</DropdownMenuItem>
            <DropdownMenuItem>Import subscribers</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Input
          type="text"
          placeholder="Search for username"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pr-10 h-12 text-base"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
        >
          <SlidersHorizontal className="h-4 w-4" />
          <span className="sr-only">Filter options</span>
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto">
        <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous filters</span>
        </Button>

        <div className="flex gap-2 flex-1 min-w-0">
          {filterTabs.map((tab) => (
            <Button
              key={tab.label}
              variant={activeTab === tab.label ? "default" : "outline"}
              onClick={() => setActiveTab(tab.label)}
              className={`shrink-0 h-9 px-4 ${
                activeTab === tab.label
                  ? "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
                  : "bg-background border-border text-foreground hover:bg-muted"
              }`}
            >
              {tab.label}
              <Badge
                variant="secondary"
                className={`ml-2 h-5 px-1.5 text-xs ${
                  activeTab === tab.label
                    ? "bg-primary/20 text-primary"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {tab.count}
              </Badge>
            </Button>
          ))}
        </div>

        <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next filters</span>
        </Button>
      </div>

      {/* Subscriber Card */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <Avatar className="h-12 w-12 shrink-0">
              <AvatarImage src="/placeholder.svg" alt={subscriber.username} />
              <AvatarFallback className="bg-primary text-primary-foreground font-semibold text-lg">
                {subscriber.avatar}
              </AvatarFallback>
            </Avatar>

            {/* User Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="font-semibold text-foreground text-lg mb-1">
                    {subscriber.username}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {subscriber.handle}
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-1">Next renewal</p>
                    <p className="font-medium text-foreground">
                      {subscriber.nextRenewal}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Price</p>
                    <p className="font-medium text-foreground">
                      {subscriber.price}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Total spent</p>
                    <p className="font-medium text-foreground">
                      {subscriber.totalSpent}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <Button className="px-6 h-10">Apply Discount</Button>
                <Button variant="outline" className="px-6 h-10">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Chat
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* No More Subscribers Message */}
      <div className="text-center py-8">
        <p className="text-muted-foreground text-sm">No more subscribers</p>
      </div>
    </div>
  );
}

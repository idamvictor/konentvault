"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import UserGrid from "./user-grid";

export default function FollowingPanel() {
  const [activeTab, setActiveTab] = useState<"users" | "posts">("users");
  const [activeFilter, setActiveFilter] = useState<
    "all" | "active" | "expired" | "attention"
  >("all");

  type FilterType = "all" | "active" | "expired" | "attention";

  const filters: Array<{ id: FilterType; label: string }> = [
    { id: "all", label: "All 17" },
    { id: "active", label: "Active 14" },
    { id: "expired", label: "Expired 3" },
    { id: "attention", label: "Attention required 2" },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b">
        <h1 className="text-lg font-medium">FOLLOWING</h1>
      </div>

      {/* Tabs */}
      <div className="flex border-b">
        <button
          className={cn(
            "flex-1 py-3 text-center font-medium",
            activeTab === "users"
              ? "border-b-2 border-primary"
              : "text-muted-foreground"
          )}
          onClick={() => setActiveTab("users")}
        >
          USERS
        </button>
        <button
          className={cn(
            "flex-1 py-3 text-center font-medium",
            activeTab === "posts"
              ? "border-b-2 border-primary"
              : "text-muted-foreground"
          )}
          onClick={() => setActiveTab("posts")}
        >
          POSTS
        </button>
      </div>

      {/* Filter Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <span className="text-sm text-muted-foreground">RECENT</span>
        <div className="flex items-center gap-2">
          <button>
            <Search className="h-5 w-5 text-muted-foreground" />
          </button>
          <button>
            <SlidersHorizontal className="h-5 w-5 text-muted-foreground" />
          </button>
          <button>
            <GripVertical className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Filter Pills */}
      <div className="flex gap-2 p-4 overflow-x-auto">
        {filters.map((filter) => (
          <button
            key={filter.id}
            className={cn(
              "px-4 py-2 rounded-full text-sm whitespace-nowrap",
              activeFilter === filter.id
                ? "bg-primary/10 text-primary"
                : "bg-muted text-muted-foreground"
            )}
            onClick={() => setActiveFilter(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* User Grid */}
      <UserGrid />
    </div>
  );
}

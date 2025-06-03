"use client";

import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import UserGrid from "./user-grid";

export default function FollowingPanel() {
  const [activeTab, setActiveTab] = useState<"users" | "posts">("users");
  const [activeFilter, setActiveFilter] = useState<
    "all" | "active" | "expired" | "attention"
  >("all");

  const filters = [
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5 text-muted-foreground"
            >
              <line x1="4" x2="20" y1="9" y2="9" />
              <line x1="4" x2="20" y1="15" y2="15" />
              <line x1="10" x2="8" y1="5" y2="19" />
              <line x1="16" x2="14" y1="5" y2="19" />
            </svg>
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
            onClick={() => setActiveFilter(filter.id as any)}
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

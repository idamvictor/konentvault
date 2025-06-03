"use client";

import { useState } from "react";
import { ArrowLeft, Plus, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import CollectionsList from "./collections-list";

export default function CollectionsPanel() {
  const [activeTab, setActiveTab] = useState<"user-lists" | "bookmarks">(
    "user-lists"
  );

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <ArrowLeft className="h-5 w-5" />
          <h1 className="text-lg font-medium">COLLECTIONS</h1>
        </div>
        <div className="flex items-center gap-2">
          <button>
            <Search className="h-5 w-5" />
          </button>
          <button>
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b">
        <button
          className={cn(
            "flex-1 py-3 text-center font-medium",
            activeTab === "user-lists"
              ? "border-b-2 border-primary"
              : "text-muted-foreground"
          )}
          onClick={() => setActiveTab("user-lists")}
        >
          USER LISTS
        </button>
        <button
          className={cn(
            "flex-1 py-3 text-center font-medium",
            activeTab === "bookmarks"
              ? "border-b-2 border-primary"
              : "text-muted-foreground"
          )}
          onClick={() => setActiveTab("bookmarks")}
        >
          BOOKMARKS
        </button>
      </div>

      {/* Sort Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <span className="text-sm text-muted-foreground">CUSTOM ORDER</span>
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

      {/* Collections List */}
      <CollectionsList />
    </div>
  );
}

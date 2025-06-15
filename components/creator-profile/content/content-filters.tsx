"use client";

import { Button } from "@/components/ui/button";
import { Search, Grid, List } from "lucide-react";

interface ContentFilter {
  label: string;
  count: number;
  active?: boolean;
}

interface ContentFiltersProps {
  filters: ContentFilter[];
  onFilterChange?: (filter: string) => void;
  activeTab: "posts" | "media";
}

export function ContentFilters({
  filters,
  onFilterChange,
}: // activeTab,
ContentFiltersProps) {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-gray-500 text-sm font-medium">RECENT</h3>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Grid className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex gap-2">
          {filters.map((filter, index) => (
            <Button
              key={index}
              variant={filter.active ? "default" : "outline"}
              size="sm"
              className={`rounded-full text-xs ${
                filter.active
                  ? "bg-primary/10 text-primary border-primary/20"
                  : "bg-muted text-muted-foreground border-muted"
              }`}
              onClick={() => onFilterChange?.(filter.label)}
            >
              {filter.label} {filter.count}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

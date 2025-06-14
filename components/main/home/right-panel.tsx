"use client";

import {
  Search,
  Shuffle,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SuggestionCard } from "./right-panel/suggestion-card";
import { useGetCreators } from "@/services/creator/get-creators";
import { useState, useMemo } from "react";

export default function RightPanel() {
  const { data: creators = [], isLoading } = useGetCreators();
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 3;

  const filteredCreators = useMemo(() => {
    return creators.filter(
      (creator) =>
        creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        creator.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [creators, searchQuery]);

  const totalPages = Math.ceil(filteredCreators.length / itemsPerPage);
  const currentCreators = filteredCreators.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const shuffleCreators = () => {
    setCurrentPage(Math.floor(Math.random() * totalPages));
  };

  const refreshCreators = () => {
    // This will trigger a refetch of the creators data
    window.location.reload();
  };

  return (
    <aside className="w-80 p-4 space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search creators"
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Suggestions */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            CREATORS
          </h2>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={shuffleCreators}
            >
              <Shuffle className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={refreshCreators}
            >
              <RefreshCw className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={prevPage}
              disabled={currentPage === 0}
            >
              <ChevronLeft className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={nextPage}
              disabled={currentPage === totalPages - 1}
            >
              <ChevronRight className="h-3 w-3" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          {isLoading ? (
            <div className="text-center text-sm text-muted-foreground">
              Loading creators...
            </div>
          ) : currentCreators.length > 0 ? (
            currentCreators.map((creator) => (
              <SuggestionCard key={creator.id} creator={creator} />
            ))
          ) : (
            <div className="text-center text-sm text-muted-foreground">
              No creators found
            </div>
          )}
        </div>

        {/* Pagination dots */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-1 mt-4">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  currentPage === index
                    ? "bg-foreground"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                onClick={() => setCurrentPage(index)}
              />
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}

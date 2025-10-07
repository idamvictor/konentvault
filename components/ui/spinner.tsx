"use client";

import { Loader2 } from "lucide-react";
// import { cn } from "@/lib/utils";

interface SpinnerProps {
  className?: string;
}

export function Spinner({ className }: SpinnerProps) {
  return (
    <div className={className}>
      <Loader2 className="h-4 w-4 animate-spin" />
    </div>
  );
}

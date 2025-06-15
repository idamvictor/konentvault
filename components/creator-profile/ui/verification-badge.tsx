import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface VerificationBadgeProps {
  className?: string;
}

export function VerificationBadge({ className }: VerificationBadgeProps) {
  return (
    <CheckCircle
      className={cn("h-4 w-4 text-primary fill-current", className)}
    />
  );
}

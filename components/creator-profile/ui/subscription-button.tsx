"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SubscriptionButtonProps {
  price: string;
  period?: string;
  discount?: string;
  className?: string;
  variant?: "default" | "bundle";
  onClick?: () => void;
}

export function SubscriptionButton({
  price,
  period = "per month",
  discount,
  className,
  variant = "default",
  onClick,
}: SubscriptionButtonProps) {
  return (
    <Button
      className={cn(
        "w-full rounded-full font-medium text-primary-foreground",
        variant === "default"
          ? "bg-primary hover:bg-primary/90"
          : "bg-primary hover:bg-primary/90",
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-center justify-between w-full">
        <span>
          {variant === "bundle" && discount && (
            <span className="mr-2">{discount}</span>
          )}
          SUBSCRIBE
        </span>
        <span>
          ${price} {variant === "bundle" ? "total" : period}
        </span>
      </div>
    </Button>
  );
}

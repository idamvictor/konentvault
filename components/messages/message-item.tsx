"use client";

import Image from "next/image";
import { X, Check, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MessageItemProps {
  message: {
    id: number;
    username: string;
    handle: string;
    avatar: string;
    message: string;
    time: string;
    isVerified?: boolean;
    isOnline?: boolean;
    hasImage?: boolean;
    isUnread?: boolean;
  };
}

export default function MessageItem({ message }: MessageItemProps) {
  return (
    <div className="flex items-center gap-3 p-4 hover:bg-muted/50 border-b border-border cursor-pointer">
      {/* Avatar with online status */}
      <div className="relative">
        <Image
          src={message.avatar || "/placeholder.svg"}
          alt={message.username}
          width={40}
          height={40}
          className="rounded-full"
        />
        {message.isOnline && (
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
        )}
      </div>

      {/* Message content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1 mb-1">
          <span className="font-medium text-foreground truncate">
            {message.username}
          </span>
          {message.isVerified && (
            <Check className="h-4 w-4 text-blue-500 fill-current" />
          )}
          <span className="text-muted-foreground text-sm truncate">
            {message.handle}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {message.hasImage && (
            <ImageIcon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          )}
          <span className="text-sm text-muted-foreground truncate">
            {message.message}
          </span>
        </div>
      </div>

      {/* Time and status */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <span
          className={`text-sm ${
            message.isUnread
              ? "text-blue-500 font-medium"
              : "text-muted-foreground"
          }`}
        >
          {message.time}
        </span>
        {message.isUnread && (
          <div className="w-2 h-2 bg-blue-500 rounded-full" />
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

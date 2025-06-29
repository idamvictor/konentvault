"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteMessage, useMarkMessageSeen } from "@/hooks/use-messages";
import { formatDistanceToNow } from "date-fns";
import { Check, CheckCheck, MoreVertical, Trash2 } from "lucide-react";
import type { Message } from "@/types/message";

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
  currentUserId: number;
}

export function MessageBubble({
  message,
  isOwn,
  currentUserId,
}: MessageBubbleProps) {
  const deleteMessage = useDeleteMessage();
  const markSeen = useMarkMessageSeen();
  console.log(currentUserId, "currentUserId");

  const handleDelete = () => {
    deleteMessage.mutate({
      userId: isOwn ? message.receiverId : message.senderId,
      messageId: message.id,
    });
  };

  const handleMarkSeen = () => {
    if (!message.seen && !isOwn) {
      markSeen.mutate({
        userId: message.senderId,
        messageId: message.id,
      });
    }
  };

  if (message.isDeleted) {
    return (
      <div className={`flex ${isOwn ? "justify-end" : "justify-start"} mb-4`}>
        <div className="max-w-xs lg:max-w-md px-4 py-2 rounded-lg bg-muted/50 text-muted-foreground italic text-sm">
          This message was deleted
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex ${isOwn ? "justify-end" : "justify-start"} mb-6 group`}
    >
      <div
        className={`flex items-start space-x-3 max-w-[70%] ${
          isOwn ? "flex-row-reverse space-x-reverse" : ""
        }`}
      >
        {/* Avatar - only show for received messages */}
        {!isOwn && (
          <Avatar className="h-8 w-8 flex-shrink-0">
            <AvatarImage
              src={`https://sp.konentvault.net.ng/${message.sender.profilePicture}`}
              alt={message.sender.name}
            />
            <AvatarFallback className="text-xs">
              {message.sender.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        )}

        {/* Message Content */}
        <div className={`flex flex-col ${isOwn ? "items-end" : "items-start"}`}>
          {/* Sender name for received messages */}
          {!isOwn && (
            <span className="text-xs text-muted-foreground mb-1 px-1">
              {message.sender.name}
            </span>
          )}

          <div className="relative">
            <div
              className={`px-4 py-3 rounded-2xl cursor-pointer transition-colors ${
                isOwn
                  ? "bg-primary text-primary-foreground rounded-br-md"
                  : "bg-muted hover:bg-muted/80 rounded-bl-md"
              }`}
              onClick={handleMarkSeen}
            >
              <p className="text-sm leading-relaxed break-words">
                {message.content}
              </p>

              {message.mediaUrl && (
                <div className="mt-2 rounded-lg overflow-hidden">
                  <Image
                    src={`https://sp.konentvault.net.ng/${message.mediaUrl}`}
                    alt="Message media"
                    width={400}
                    height={300}
                    className="rounded-lg w-auto h-auto max-w-full"
                    style={{ objectFit: "contain" }}
                  />
                </div>
              )}
            </div>

            {/* Message actions dropdown - always visible for own messages */}
            {isOwn && (
              <div className="absolute -right-2 top-1/2 -translate-y-1/2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 bg-background/80 backdrop-blur-sm border shadow-sm hover:bg-background"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-32">
                    <DropdownMenuItem
                      onClick={handleDelete}
                      className="text-destructive focus:text-destructive cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>

          {/* Message metadata */}
          <div
            className={`flex items-center mt-1 space-x-2 px-1 ${
              isOwn ? "flex-row-reverse space-x-reverse" : ""
            }`}
          >
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(message.createdAt), {
                addSuffix: true,
              })}
            </span>

            {isOwn && (
              <div className="flex items-center">
                {message.seen ? (
                  <CheckCheck className="h-3 w-3 text-blue-500" />
                ) : (
                  <Check className="h-3 w-3 text-muted-foreground" />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

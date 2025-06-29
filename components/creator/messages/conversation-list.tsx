"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useConversations } from "@/hooks/use-messages";
import { formatDistanceToNow } from "date-fns";
import { Loader2 } from "lucide-react";
import type { Conversation } from "@/types/message";

interface ConversationListProps {
  selectedUserId?: number;
  onSelectConversation: (userId: number) => void;
}

export function ConversationList({
  selectedUserId,
  onSelectConversation,
}: ConversationListProps) {
  const { data: conversationsData, isLoading, error } = useConversations();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        Failed to load conversations
      </div>
    );
  }

  const conversations = conversationsData?.conversations || [];

  return (
    <ScrollArea className="h-full">
      <div className="space-y-1 p-4">
        {conversations.map((conversation: Conversation) => (
          <Card
            key={conversation.otherUser.id}
            className={`cursor-pointer transition-all duration-200 hover:bg-muted/50 hover:shadow-sm border-0 ${
              selectedUserId === conversation.otherUser.id
                ? "bg-primary/10 border-l-4 border-l-primary shadow-sm"
                : "hover:border-l-4 hover:border-l-muted-foreground/20"
            }`}
            onClick={() => onSelectConversation(conversation.otherUser.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                <div className="relative">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={`https://sp.konentvault.net.ng/${conversation.otherUser.profilePicture}`}
                      alt={conversation.otherUser.name}
                    />
                    <AvatarFallback className="text-sm font-medium">
                      {conversation.otherUser.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  {/* Online indicator - you can add online status logic here */}
                  <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 border-2 border-background rounded-full"></div>
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold truncate text-base">
                      {conversation.otherUser.name}
                    </h3>
                    <div className="flex items-center space-x-2 flex-shrink-0">
                      {conversation.unseenCount > 0 && (
                        <Badge
                          variant="destructive"
                          className="text-xs px-2 py-0.5 min-w-[20px] h-5 flex items-center justify-center"
                        >
                          {conversation.unseenCount > 99
                            ? "99+"
                            : conversation.unseenCount}
                        </Badge>
                      )}
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(
                          new Date(conversation.lastMessage.createdAt),
                          { addSuffix: true }
                        )}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground/80 truncate">
                    @{conversation.otherUser.username}
                  </p>

                  <p
                    className={`text-sm truncate ${
                      conversation.unseenCount > 0
                        ? "font-medium text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {conversation.lastMessage.sender.id === 1 ? "You: " : ""}
                    {conversation.lastMessage.content}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {conversations.length === 0 && (
          <div className="text-center text-muted-foreground py-12">
            <div className="space-y-2">
              <p className="text-lg font-medium">No conversations yet</p>
              <p className="text-sm">Start a new conversation to get started</p>
            </div>
          </div>
        )}
      </div>
    </ScrollArea>
  );
}

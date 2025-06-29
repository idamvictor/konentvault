"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMessages } from "@/hooks/use-messages";
import { Loader2, MessageCircle, MoreVertical } from "lucide-react";
import { useEffect, useRef } from "react";
import { MessageBubble } from "./message-bubble";
import { MessageInput } from "./message-input";
import type { User } from "@/types/message";
import { Button } from "@/components/ui/button";

interface ChatWindowProps {
  selectedUser: User | null;
  currentUserId: number;
}

export function ChatWindow({ selectedUser, currentUserId }: ChatWindowProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { data: messagesData, isLoading } = useMessages(selectedUser?.id || 0);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messagesData?.messages]);

  if (!selectedUser) {
    return (
      <Card className="h-full flex items-center justify-center border-0 bg-gradient-to-br from-muted/20 to-muted/5">
        <div className="text-center text-muted-foreground space-y-4">
          <div className="relative">
            <MessageCircle className="h-16 w-16 mx-auto opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent rounded-full"></div>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Welcome to Messages</h3>
            <p className="text-sm max-w-sm">
              Select a conversation from the sidebar to start messaging with
              your contacts.
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col border-0 bg-background">
      {/* Chat Header */}
      <CardHeader className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={`https://sp.konentvault.net.ng/${selectedUser.profilePicture}`}
                  alt={selectedUser.name}
                />
                <AvatarFallback>
                  {selectedUser.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 border-2 border-background rounded-full"></div>
            </div>
            <div>
              <h3 className="font-semibold text-lg">{selectedUser.name}</h3>
              <p className="text-sm text-muted-foreground">
                @{selectedUser.username} • Online
              </p>
            </div>
          </div>

          <Button variant="ghost" size="sm">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      {/* Messages Area */}
      <CardContent className="flex-1 p-0 flex flex-col min-h-0">
        <ScrollArea className="flex-1 px-6 py-4" ref={scrollAreaRef}>
          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : (
            <div className="space-y-1">
              {messagesData?.messages?.map((message) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  isOwn={message.senderId === currentUserId}
                  currentUserId={currentUserId}
                />
              ))}

              {messagesData?.messages?.length === 0 && (
                <div className="text-center text-muted-foreground py-12">
                  <div className="space-y-3">
                    <div className="h-12 w-12 bg-muted rounded-full flex items-center justify-center mx-auto">
                      <MessageCircle className="h-6 w-6" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium">No messages yet</p>
                      <p className="text-sm">
                        Start the conversation with {selectedUser.name}!
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </ScrollArea>

        {/* Message Input */}
        <div className="border-t bg-card/30">
          <MessageInput receiverId={selectedUser.id} />
        </div>
      </CardContent>
    </Card>
  );
}

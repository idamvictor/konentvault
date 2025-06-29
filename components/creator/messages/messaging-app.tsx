"use client";

import { useConversations } from "@/hooks/use-messages";
import { useState } from "react";
import { useUserStore } from "@/store/use-user-store";
import { ConversationList } from "./conversation-list";
import { ChatWindow } from "./chat-window";

export default function MessagingApp() {
  const [selectedUserId, setSelectedUserId] = useState<number>();
  const { data: conversationsData } = useConversations();
  const user = useUserStore((state) => state.user);
  const currentUserId = user?.id ?? 0;

  const selectedUser = conversationsData?.conversations?.find(
    (conv) => conv.otherUser.id === selectedUserId
  )?.otherUser;

  return (
    <div className="h-screen flex bg-background">
      {/* Conversations Sidebar */}
      <div className="w-96 border-r bg-card/50">
        <div className="p-6 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <h1 className="text-2xl font-bold">Messages</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Stay connected with your conversations
          </p>
        </div>
        <ConversationList
          selectedUserId={selectedUserId}
          onSelectConversation={setSelectedUserId}
        />
      </div>

      {/* Chat Window */}
      <div className="flex-1 min-w-0">
        <ChatWindow
          selectedUser={selectedUser || null}
          currentUserId={currentUserId}
        />
      </div>
    </div>
  );
}

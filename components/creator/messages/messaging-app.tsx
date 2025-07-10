"use client";

import { useConversations } from "@/hooks/use-messages";
import { useState } from "react";
import { useUserStore } from "@/store/use-user-store";
import { ConversationList } from "./conversation-list";
import { ChatWindow } from "./chat-window";
import { UserList } from "@/components/creator/messages/user-list";
import type { Creator } from "@/types/creator-profile/user";

export default function MessagingApp() {
  const [selectedUserId, setSelectedUserId] = useState<number>();
  const [selectedUserFromList, setSelectedUserFromList] =
    useState<Creator | null>(null);
  const [showUserList, setShowUserList] = useState(false);
  const { data: conversationsData } = useConversations();
  const user = useUserStore((state) => state.user);
  const currentUserId = user?.id ?? 0;

  // Get selected user from either existing conversations or newly selected user
  const selectedUser =
    conversationsData?.conversations?.find(
      (conv) => conv.otherUser.id === selectedUserId
    )?.otherUser || selectedUserFromList;

  const handleSelectUser = (creator: Creator) => {
    setSelectedUserId(creator.id);
    setSelectedUserFromList(creator);
    setShowUserList(false);
  };

  const handleSelectConversation = (userId: number) => {
    setSelectedUserId(userId);
    setSelectedUserFromList(null); // Clear selected user from list when selecting from conversations
  };

  const handleNewChat = () => {
    setShowUserList(true);
  };

  const handleCloseUserList = () => {
    setShowUserList(false);
  };

  return (
    <div className="h-screen flex bg-background w-full">
      {/* Conversations Sidebar */}
      <div className="w-96 border-r bg-card/50">
        <div className="p-6 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <h1 className="text-2xl font-bold">Messages</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Stay connected with your conversations
          </p>
        </div>
        {showUserList ? (
          <UserList
            onSelectUser={handleSelectUser}
            onClose={handleCloseUserList}
          />
        ) : (
          <ConversationList
            selectedUserId={selectedUserId}
            onSelectConversation={handleSelectConversation}
            onNewChat={handleNewChat}
          />
        )}
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

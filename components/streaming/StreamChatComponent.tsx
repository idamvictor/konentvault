"use client";

import React, { useEffect, useState } from "react";
import {
  Chat,
  Channel,
  Window,
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread,
} from "stream-chat-react";
import { Channel as ChannelType } from "stream-chat";
import {
  chatClient,
  initializeUser,
  initializeChannel,
} from "@/lib/streamChatConfig";
import "stream-chat-react/dist/css/v2/index.css";
import "@/app/streaming/chat.css";

export const StreamChatComponent = () => {
  const [channel, setChannel] = useState<ChannelType | null>(null);

  useEffect(() => {
    const setupChat = async () => {
      const userConnected = await initializeUser();
      if (userConnected) {
        const newChannel = await initializeChannel();
        if (newChannel) {
          setChannel(newChannel);
        }
      }
    };

    setupChat();

    // Cleanup on unmount
    return () => {
      chatClient.disconnectUser();
    };
  }, []);

  if (!channel) return <div>Loading chat...</div>;

  return (
    <Chat client={chatClient} theme="str-chat__theme-dark">
      <Channel channel={channel}>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
};

export default StreamChatComponent;

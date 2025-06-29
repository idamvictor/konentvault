"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSendMessage } from "@/hooks/use-messages";
import { Paperclip, Send } from "lucide-react";
import { useState } from "react";

interface MessageInputProps {
  receiverId: number;
}

export function MessageInput({ receiverId }: MessageInputProps) {
  const [message, setMessage] = useState("");
  const sendMessage = useSendMessage();

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim()) return;

    try {
      await sendMessage.mutateAsync({
        receiverId,
        content: message.trim(),
        media: "",
      });
      setMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <form
      onSubmit={handleSend}
      className="flex items-center space-x-2 p-4 border-t"
    >
      <Button type="button" variant="ghost" size="sm">
        <Paperclip className="h-4 w-4" />
      </Button>

      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="flex-1"
        disabled={sendMessage.isPending}
      />

      <Button
        type="submit"
        size="sm"
        disabled={!message.trim() || sendMessage.isPending}
      >
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
}

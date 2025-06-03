"use client";

import { Button } from "@/components/ui/button";

export default function ConversationArea() {
  return (
    <div className="flex-1 bg-background flex flex-col items-center justify-center p-8">
      <div className="text-center space-y-6">
        <h2 className="text-xl font-medium text-foreground">
          Select any Conversation or send a New Message
        </h2>
        <Button
          className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full font-medium"
          size="lg"
        >
          NEW MESSAGE
        </Button>
      </div>
    </div>
  );
}

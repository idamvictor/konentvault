"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useCreators } from "@/hooks/use-creators";
import { type Creator, getImageUrl } from "@/lib/api";
import { CheckCircle } from "lucide-react";

interface MentionTextareaProps {
  value: string;
  onChange: (value: string) => void;
  onMentionSelect: (users: Creator[]) => void;
  placeholder?: string;
  className?: string;
}

export function MentionTextarea({
  value,
  onChange,
  onMentionSelect,
  placeholder = "Create a post...",
  className = "min-h-[100px] resize-none rounded-xl",
}: MentionTextareaProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mentionQuery, setMentionQuery] = useState("");
  const [cursorPosition, setCursorPosition] = useState(0);
  const [selectedUsers, setSelectedUsers] = useState<Creator[]>([]);
  const [suggestionIndex, setSuggestionIndex] = useState(0);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const { data: creatorsData } = useCreators();
  const creators = creatorsData?.creators || [];

  // Filter creators based on mention query
  const filteredCreators = creators
    .filter(
      (creator: Creator) =>
        creator.name.toLowerCase().includes(mentionQuery.toLowerCase()) ||
        creator.username.toLowerCase().includes(mentionQuery.toLowerCase())
    )
    .slice(0, 10); // Limit to 10 suggestions

  useEffect(() => {
    onMentionSelect(selectedUsers);
  }, [selectedUsers, onMentionSelect]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    const cursorPos = e.target.selectionStart;

    onChange(newValue);
    setCursorPosition(cursorPos);

    // Check for @ mentions
    const textBeforeCursor = newValue.slice(0, cursorPos);
    const mentionMatch = textBeforeCursor.match(/@(\w*)$/);

    if (mentionMatch) {
      setMentionQuery(mentionMatch[1]);
      setShowSuggestions(true);
      setSuggestionIndex(0);
    } else {
      setShowSuggestions(false);
      setMentionQuery("");
    }

    // Extract mentioned usernames from the text
    const mentionMatches = newValue.match(/@(\w+)/g) || [];
    const mentionedUsernames = mentionMatches.map((match) => match.slice(1));

    const mentionedUsers = creators.filter((creator: Creator) =>
      mentionedUsernames.includes(creator.username)
    );

    setSelectedUsers(mentionedUsers);
  };

  const handleSuggestionClick = (creator: Creator) => {
    const textBeforeCursor = value.slice(0, cursorPosition);
    const textAfterCursor = value.slice(cursorPosition);

    // Replace the current mention query with the selected username
    const mentionMatch = textBeforeCursor.match(/@(\w*)$/);
    if (mentionMatch) {
      const beforeMention = textBeforeCursor.slice(0, mentionMatch.index);
      const newText = `${beforeMention}@${creator.username} ${textAfterCursor}`;
      onChange(newText);

      // Update selected users
      const updatedUsers = [...selectedUsers];
      if (!updatedUsers.find((u) => u.id === creator.id)) {
        updatedUsers.push(creator);
        setSelectedUsers(updatedUsers);
      }
    }

    setShowSuggestions(false);
    setMentionQuery("");

    // Focus back to textarea
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (showSuggestions && filteredCreators.length > 0) {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSuggestionIndex((prev) =>
            prev < filteredCreators.length - 1 ? prev + 1 : 0
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSuggestionIndex((prev) =>
            prev > 0 ? prev - 1 : filteredCreators.length - 1
          );
          break;
        case "Enter":
        case "Tab":
          e.preventDefault();
          if (filteredCreators[suggestionIndex]) {
            handleSuggestionClick(filteredCreators[suggestionIndex]);
          }
          break;
        case "Escape":
          setShowSuggestions(false);
          break;
      }
    }
  };

  return (
    <div className="relative">
      <Textarea
        ref={textareaRef}
        value={value}
        onChange={handleTextChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={className}
      />

      {showSuggestions && filteredCreators.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
        >
          {filteredCreators.map((creator: Creator, index: number) => (
            <div
              key={creator.id}
              className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-50 ${
                index === suggestionIndex ? "bg-blue-50" : ""
              }`}
              onClick={() => handleSuggestionClick(creator)}
            >
              <Avatar className="w-8 h-8">
                <AvatarImage
                  src={
                    creator.profilePicture
                      ? getImageUrl(creator.profilePicture)
                      : undefined
                  }
                  alt={creator.name}
                />
                <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
                  {creator.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <span className="font-medium text-sm truncate">
                    {creator.name}
                  </span>
                  {creator.isVerified && (
                    <CheckCircle className="w-3 h-3 text-blue-500 fill-current flex-shrink-0" />
                  )}
                </div>
                <p className="text-xs text-gray-500 truncate">
                  @{creator.username}
                </p>
              </div>
              {creator.isCreator && (
                <Badge
                  variant="outline"
                  className="bg-green-100 text-green-800 border-green-200 text-xs"
                >
                  Creator
                </Badge>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

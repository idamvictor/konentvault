"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCreators } from "@/hooks/use-creators";
import { Loader2, MessageCircle, Search, Verified } from "lucide-react";
import { useState } from "react";
import type { Creator } from "@/types/creator-profile/user";

interface UserListProps {
  onSelectUser: (user: Creator) => void;
  onClose: () => void;
}

export function UserList({ onSelectUser, onClose }: UserListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: creatorsData, isLoading, error } = useCreators();

  const creators: Creator[] = Array.isArray(creatorsData?.creators)
    ? creatorsData.creators
    : [];

  // Filter creators based on search query
  const filteredCreators: Creator[] = creators.filter(
    (creator: Creator) =>
      creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      creator.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (creator.bio &&
        creator.bio.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSelectUser = (creator: Creator) => {
    onSelectUser(creator);
    onClose();
  };

  if (isLoading) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Select User to Chat</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <Loader2 className="h-6 w-6 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Select User to Chat</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64 text-muted-foreground">
          Failed to load users
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <CardTitle>Select User to Chat</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            ✕
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardHeader>

      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-full">
          <div className="space-y-2 p-4">
            {filteredCreators.map((creator) => (
              <Card
                key={creator.id}
                className="cursor-pointer transition-all duration-200 hover:bg-muted/50 hover:shadow-sm border-0 hover:border-l-4 hover:border-l-primary/50"
                onClick={() => handleSelectUser(creator)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={
                            creator.profilePicture
                              ? `https://sp.konentvault.net.ng/${creator.profilePicture}`
                              : undefined
                          }
                          alt={creator.name}
                        />
                        <AvatarFallback className="text-sm font-medium">
                          {creator.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {creator.isActive && (
                        <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 border-2 border-background rounded-full"></div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold truncate text-base">
                            {creator.name}
                          </h3>
                          {creator.isVerified && (
                            <Verified className="h-4 w-4 text-blue-500 flex-shrink-0" />
                          )}
                        </div>
                        <div className="flex items-center space-x-1">
                          {creator.isCreator && (
                            <Badge variant="secondary" className="text-xs">
                              Creator
                            </Badge>
                          )}
                          {!creator.isActive && (
                            <Badge variant="outline" className="text-xs">
                              Inactive
                            </Badge>
                          )}
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground/80 truncate">
                        @{creator.username}
                      </p>

                      {creator.bio && (
                        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                          {creator.bio}
                        </p>
                      )}

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          {creator.country && <span>{creator.country}</span>}
                          {creator.gender && (
                            <span className="capitalize">{creator.gender}</span>
                          )}
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 bg-transparent"
                        >
                          <MessageCircle className="h-3 w-3 mr-1" />
                          Chat
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredCreators.length === 0 && (
              <div className="text-center text-muted-foreground py-12">
                <div className="space-y-2">
                  <p className="text-lg font-medium">No users found</p>
                  <p className="text-sm">Try adjusting your search query</p>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

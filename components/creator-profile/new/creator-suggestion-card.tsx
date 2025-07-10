"use client";

import { MoreHorizontal, Verified } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Creator } from "@/types/creator-profile/index";

interface CreatorSuggestionCardProps {
  creator: Creator;
}

export function CreatorSuggestionCard({ creator }: CreatorSuggestionCardProps) {
  const getImageUrl = (path: string | null) => {
    if (!path) return null;
    return path.startsWith("http")
      ? path
      : `https://sp.konentvault.net.ng/${path}`;
  };

  const defaultCoverImage = "/placeholder.svg?height=96&width=320";

  return (
    <Link href={`/creators/${creator.id}`} className="block">
      <Card className="relative overflow-hidden p-0 transition-transform hover:scale-[1.02] group">
        <div className="h-24 relative">
          <Image
            src={getImageUrl(creator.coverImage) || defaultCoverImage}
            alt={`${creator.name} cover`}
            className="object-cover"
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-6 w-6 text-white hover:bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // Handle more options
            }}
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>

          <div className="absolute bottom-2 left-2 flex items-center gap-2">
            <Avatar className="h-8 w-8 border-2 border-white">
              <AvatarImage
                src={getImageUrl(creator.profilePicture) || "/placeholder.svg"}
                alt={creator.name}
              />
              <AvatarFallback className="text-xs font-semibold bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                {creator.name.slice(0, 1).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="text-white min-w-0 flex-1">
              <div className="flex items-center gap-1">
                <span className="text-sm font-semibold truncate">
                  {creator.name}
                </span>
                {creator.isVerified && (
                  <Verified className="h-3 w-3 text-blue-400 fill-current flex-shrink-0" />
                )}
                {creator.subscriptionPrice && (
                  <span className="text-xs ml-1 flex-shrink-0">
                    ${creator.subscriptionPrice}
                  </span>
                )}
              </div>
              <p className="text-xs opacity-90 truncate">@{creator.username}</p>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}

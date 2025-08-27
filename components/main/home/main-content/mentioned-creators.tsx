"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { type Creator, getImageUrl } from "@/lib/api";
import { CheckCircle, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MentionedCreatorsProps {
  creators: Creator[];
  maxDisplay?: number;
}

export function MentionedCreators({
  creators,
  maxDisplay = 4,
}: MentionedCreatorsProps) {
  if (!creators || creators.length === 0) return null;

  const displayCreators = creators.slice(0, maxDisplay);
  const remainingCount = creators.length - maxDisplay;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700">
          Mentioned Creators
        </span>
        <Badge
          variant="outline"
          className="bg-blue-100 text-blue-800 border-blue-200 text-xs"
        >
          {creators.length} {creators.length === 1 ? "creator" : "creators"}
        </Badge>
      </div>

      {displayCreators.length <= 2 ? (
        // Display 1-2 creators side by side
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {displayCreators.map((creator) => (
            <CreatorCard key={creator.id} creator={creator} />
          ))}
        </div>
      ) : displayCreators.length === 3 ? (
        // Display 3 creators: 2 on top, 1 on bottom
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            {displayCreators.slice(0, 2).map((creator) => (
              <CreatorCard key={creator.id} creator={creator} />
            ))}
          </div>
          <CreatorCard creator={displayCreators[2]} fullWidth />
        </div>
      ) : (
        // Display 4+ creators: 2 on top, 2 on bottom (or 1 with +X more)
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            {displayCreators.slice(0, 2).map((creator) => (
              <CreatorCard key={creator.id} creator={creator} />
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <CreatorCard creator={displayCreators[2]} />
            {displayCreators[3] ? (
              <CreatorCard
                creator={displayCreators[3]}
                showMoreCount={remainingCount > 0 ? remainingCount : undefined}
              />
            ) : (
              <div className="flex items-center justify-center bg-gray-100 rounded-lg h-24 text-gray-500">
                <span className="text-sm">+{remainingCount} more</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

interface CreatorCardProps {
  creator: Creator;
  fullWidth?: boolean;
  showMoreCount?: number;
}

function CreatorCard({
  creator,
  fullWidth = false,
  showMoreCount,
}: CreatorCardProps) {
  return (
    <Card
      className={`overflow-hidden hover:shadow-md transition-shadow cursor-pointer ${
        fullWidth ? "col-span-full" : ""
      }`}
    >
      <div className="relative h-24 bg-gradient-to-br from-blue-100 to-purple-100">
        {creator.coverImage ? (
          <Image
            src={getImageUrl(creator.coverImage) || "/placeholder.svg"}
            alt={creator.name}
            className="w-full h-full object-cover"
            fill
            sizes="100vw"
            priority={true}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100" />
        )}

        <div className="absolute top-2 left-2">
          <Badge
            variant="secondary"
            className="bg-white/90 text-gray-700 text-xs"
          >
            {creator.isCreator ? "Creator" : "Free"}
          </Badge>
        </div>

        <div className="absolute top-2 right-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 bg-white/20 hover:bg-white/30"
          >
            <MoreHorizontal className="h-3 w-3 text-white" />
          </Button>
        </div>

        <div className="absolute bottom-2 left-2 flex items-center gap-2">
          <div className="relative">
            <Avatar className="w-8 h-8 border-2 border-white">
              <AvatarImage
                src={
                  creator.profilePicture
                    ? getImageUrl(creator.profilePicture)
                    : undefined
                }
                alt={creator.name}
              />
              <AvatarFallback className="bg-blue-500 text-white text-xs">
                {creator.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {creator.isActive && (
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <h4 className="font-semibold text-white text-xs truncate">
                {creator.name}
              </h4>
              {creator.isVerified && (
                <CheckCircle className="w-3 h-3 text-blue-400 fill-current flex-shrink-0" />
              )}
            </div>
            <p className="text-white/80 text-xs truncate">
              @{creator.username}
            </p>
          </div>
        </div>

        {showMoreCount && showMoreCount > 0 && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-lg">
            <span className="text-white text-lg font-bold">
              +{showMoreCount}
            </span>
          </div>
        )}
      </div>
    </Card>
  );
}

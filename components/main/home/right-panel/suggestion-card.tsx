import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Creators } from "@/types/creators";

type Creator = Creators[0];

interface SuggestionCardProps {
  creator: Creator;
}

export function SuggestionCard({ creator }: SuggestionCardProps) {
  const defaultImage =
    "https://res.cloudinary.com/dyp8gtllq/image/upload/v1739222053/Mothers_20and_20their_20children_20_20at_20ANC_20clinic_20in_20Homa_20Bay_i25atg.jpg";
  const imageBaseUrl = process.env.NEXT_PUBLIC_API_URL;

  return (
    <Card className="relative overflow-hidden p-0">
      <div className="h-24 relative">
        <Image
          src={
            creator.coverImage
              ? `${imageBaseUrl}/${creator.coverImage}`
              : defaultImage
          }
          alt={`${creator.name} cover`}
          className="object-cover"
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 h-6 w-6 text-white hover:bg-white/20"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>

        <div className="absolute bottom-2 left-2 flex items-center gap-2">
          {" "}
          <Avatar className="h-8 w-8 border-2 border-white">
            <AvatarImage
              src={
                creator.profilePicture
                  ? `${imageBaseUrl}/${creator.profilePicture}`
                  : undefined
              }
              alt={creator.name}
            />
            <AvatarFallback>
              {creator.name.slice(0, 1).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="text-white">
            <div className="flex items-center gap-1">
              <span className="text-sm font-semibold">{creator.name}</span>
              {creator.isVerified && <span className="text-xs">✓</span>}
              {creator.subscriptionPrice && (
                <span className="text-xs ml-1">
                  ${creator.subscriptionPrice}
                </span>
              )}
            </div>
            <p className="text-xs opacity-90">@{creator.username}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}

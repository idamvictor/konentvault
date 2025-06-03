import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Suggestion {
  name: string;
  username: string;
  avatar: string;
  coverImage: string;
  badge?: string;
}

interface SuggestionCardProps {
  suggestion: Suggestion;
}

export function SuggestionCard({ suggestion }: SuggestionCardProps) {
  return (
    <Card className="relative overflow-hidden p-0">
      <div className="h-24 relative">
        <Image
          src={
            suggestion.coverImage ||
            "https://source.unsplash.com/random/800x600?nature,abstract"
          }
          alt={`${suggestion.name} cover`}
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
          <Avatar className="h-8 w-8 border-2 border-white">
            <AvatarImage
              src={
                suggestion.avatar ||
                "https://source.unsplash.com/random/150x150?face,portrait"
              }
              alt={suggestion.name}
            />
            <AvatarFallback>{suggestion.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="text-white">
            <div className="flex items-center gap-1">
              <span className="text-sm font-semibold">{suggestion.name}</span>
              {suggestion.badge && (
                <span className="text-xs">{suggestion.badge}</span>
              )}
            </div>
            <p className="text-xs opacity-90">{suggestion.username}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}

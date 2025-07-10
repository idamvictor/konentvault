import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Calendar, Verified } from "lucide-react";
import type { Creator } from "@/types/creator-profile/index";

interface CreatorCardProps {
  creator: Creator;
}

export function CreatorCard({ creator }: CreatorCardProps) {
  const getImageUrl = (path: string | null) => {
    if (!path) return null;
    return path.startsWith("http")
      ? path
      : `https://sp.konentvault.net.ng/${path}`;
  };

  return (
    <Link href={`/creators/${creator.id}`}>
      <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <div className="relative h-48 bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
          {creator.coverImage && (
            <Image
              src={getImageUrl(creator.coverImage) || "/placeholder.svg"}
              alt={`${creator.name} cover`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <CardContent className="relative -mt-12 pb-6">
          <div className="flex flex-col items-center text-center">
            <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
              <AvatarImage
                src={getImageUrl(creator.profilePicture) || "/placeholder.svg"}
                alt={creator.name}
              />
              <AvatarFallback className="text-lg font-semibold bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                {creator.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </AvatarFallback>
            </Avatar>

            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg">{creator.name}</h3>
                {creator.isVerified && (
                  <Verified className="h-5 w-5 text-blue-500 fill-current" />
                )}
              </div>

              <p className="text-sm text-muted-foreground">
                @{creator.username}
              </p>

              {creator.bio && (
                <p className="text-sm text-gray-600 line-clamp-2 px-2">
                  {creator.bio}
                </p>
              )}

              <div className="flex flex-wrap gap-2 justify-center mt-3">
                {creator.isCreator && (
                  <Badge
                    variant="secondary"
                    className="bg-purple-100 text-purple-700"
                  >
                    Creator
                  </Badge>
                )}
                {creator.country && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {creator.country}
                  </Badge>
                )}
                {creator.subscriptionPrice && (
                  <Badge className="bg-green-100 text-green-700">
                    ${creator.subscriptionPrice}/month
                  </Badge>
                )}
              </div>

              <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground mt-3">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Joined {new Date(creator.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

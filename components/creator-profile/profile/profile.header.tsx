import { ArrowLeft, MoreVertical, Heart, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { VerificationBadge } from "../ui/verification-badge";
import { useRouter } from "next/navigation";

interface ProfileHeaderProps {
  coverImage: string;
  avatar: string;
  name: string;
  handle: string;
  lastSeen: string;
  stats: {
    posts: number;
    media: number;
    likes: number;
  };
}

export function ProfileHeader({
  coverImage,
  avatar,
  name,
  handle,
  lastSeen,
  stats,
}: ProfileHeaderProps) {
  const router = useRouter();

  return (
    <div className="relative">
      {/* Cover Image */}
      <div
        className="h-48 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${coverImage})` }}
      >
        {/* Navigation Bar */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 text-white">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <span className="text-xs">📷</span>
                <span>{stats.posts}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs">🎥</span>
                <span>{stats.media}</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="h-4 w-4" />
                <span>{stats.likes}</span>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
          >
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Profile Info */}
      <div className="px-4 pb-4 bg-white">
        <div className="flex items-start gap-4 -mt-8">
          <Avatar className="h-16 w-16 border-4 border-white">
            <AvatarImage src={avatar || "/placeholder.svg"} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 pt-8">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold">{name}</h1>
                  <VerificationBadge />
                </div>
                <p className="text-gray-500 text-sm">
                  @{handle} • {lastSeen}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="text-blue-400">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-blue-400">
                  <Share className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

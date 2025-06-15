import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Heart,
  MessageCircle,
  DollarSign,
  Bookmark,
  Lock,
  MoreHorizontal,
} from "lucide-react";
import { VerificationBadge } from "../ui/verification-badge";

interface PostCardProps {
  id: string;
  author: {
    name: string;
    handle: string;
    avatar: string;
    verified?: boolean;
  };
  timestamp: string;
  content?: string;
  locked: boolean;
  likes: number;
  comments?: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
}

export function PostCard({
  author,
  timestamp,
  content,
  locked,
  likes,
  // comments = 1,
  isLiked = false,
  isBookmarked = false,
}: PostCardProps) {
  return (
    <div className="bg-white border-b border-gray-100 p-4">
      {/* Post Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={author.avatar || "/placeholder.svg"} />
            <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-1">
              <span className="font-semibold text-sm">{author.name}</span>
              {author.verified && <VerificationBadge />}
            </div>
            <span className="text-gray-500 text-xs">@{author.handle}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <span>{timestamp}</span>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Post Content */}
      {content && <p className="text-sm mb-3">{content}</p>}

      {/* Locked Content Area */}
      <div className="bg-gray-50 rounded-lg p-8 mb-4 flex flex-col items-center justify-center min-h-[200px]">
        <Lock className="h-12 w-12 text-gray-300 mb-4" />
        {locked && (
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8">
            SUBSCRIBE TO SEE USER&apos;S POSTS
          </Button>
        )}
      </div>

      {/* Post Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className={`flex items-center gap-1 text-gray-500 hover:text-red-500 ${
              isLiked ? "text-red-500" : ""
            }`}
          >
            <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1 text-muted-foreground hover:text-primary"
          >
            <MessageCircle className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1 text-gray-500 hover:text-green-500"
          >
            <DollarSign className="h-4 w-4" />
            <span className="text-xs">SEND TIP</span>
          </Button>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className={`text-muted-foreground hover:text-primary ${
            isBookmarked ? "text-primary" : ""
          }`}
        >
          <Bookmark
            className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`}
          />
        </Button>
      </div>

      {/* Likes Count */}
      {likes > 0 && <p className="text-gray-500 text-sm mt-2">{likes} likes</p>}
    </div>
  );
}

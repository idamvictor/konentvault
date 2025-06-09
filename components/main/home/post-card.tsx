import Image from "next/image";
import {
  Heart,
  MessageCircle,
  Share,
  MoreHorizontal,
  CheckCircle,
  Play,
  CircleDollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface Author {
  name: string;
  username: string;
  avatar: string;
  verified: boolean;
}

interface Post {
  id: string;
  author: Author;
  content: string;
  image: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  mediaCount?: number;
}

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Card className="overflow-hidden border-0 bg-background/95 backdrop-blur-sm shadow-md rounded-lg mb-4">
      <CardContent className="p-0">
        {/* Post Header */}
        <div className="p-3 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <Avatar className="w-8 h-8 ring-1 ring-primary/10">
              <AvatarImage
                src={post.author.avatar || "/placeholder.svg"}
                alt={`${post.author.name}'s profile`}
                className="object-cover"
              />
              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center space-x-1">
                <h3 className="font-medium text-foreground text-sm">
                  {post.author.name}
                </h3>
                {post.author.verified && (
                  <CheckCircle
                    className="w-3.5 h-3.5 text-primary"
                    aria-label="Verified account"
                  />
                )}
              </div>
              <p className="text-[11px] text-muted-foreground leading-none">
                {post.author.username}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-[11px] text-muted-foreground">
              {post.timestamp}
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0 rounded-full"
            >
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Post Content */}
        <div className="px-3 pb-2">
          <p className="text-sm text-foreground/90 leading-relaxed">
            {post.content}
          </p>
        </div>

        {/* Post Image */}
        {post.image && (
          <div className="relative">
            <div className="aspect-[4/3] relative">
              <Image
                src={post.image || "/placeholder.svg"}
                alt="Post content"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {post.mediaCount && post.mediaCount > 1 && (
                <div className="absolute top-2 right-2">
                  <Badge
                    variant="secondary"
                    className="bg-background/80 backdrop-blur-sm text-foreground text-[10px] px-2 py-0.5"
                  >
                    <Play className="w-3 h-3 mr-1" />
                    {post.mediaCount}
                  </Badge>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Post Actions */}
        <div className="px-2 py-2 border-t border-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2.5 text-muted-foreground hover:text-destructive rounded-full"
              >
                <Heart className="w-3.5 h-3.5 mr-1" />
                <span className="text-xs">{post.likes}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2.5 text-muted-foreground hover:text-primary rounded-full"
              >
                <MessageCircle className="w-3.5 h-3.5 mr-1" />
                <span className="text-xs">{post.comments}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2.5 text-muted-foreground hover:text-primary rounded-full"
              >
                <Share className="w-3.5 h-3.5 mr-1" />
                <span className="text-xs">{post.shares}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2.5 text-muted-foreground hover:text-primary rounded-full"
              >
                <CircleDollarSign className="w-3.5 h-3.5 mr-1" />
                <span className="text-xs">55667</span>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

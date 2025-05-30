import Image from "next/image";
import {
  Heart,
  MessageCircle,
  Share,
  MoreHorizontal,
  CheckCircle,
  Play,
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
    <Card className="overflow-hidden border-0 shadow-sm">
      <CardContent className="p-0">
        {/* Post Header */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarImage
                src={post.author.avatar || "/placeholder.svg"}
                alt={`${post.author.name}'s profile`}
              />
              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center space-x-1">
                <h3 className="font-semibold text-foreground text-sm">
                  {post.author.name}
                </h3>
                {post.author.verified && (
                  <CheckCircle
                    className="w-4 h-4 text-primary"
                    aria-label="Verified account"
                  />
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {post.author.username}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-muted-foreground">
              {post.timestamp}
            </span>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Post Content */}
        <div className="px-4 pb-3">
          <p className="text-sm text-foreground leading-relaxed">
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
                <div className="absolute top-3 right-3">
                  <Badge
                    variant="secondary"
                    className="bg-background/70 text-foreground text-xs"
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
        <div className="px-4 py-3 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-muted-foreground hover:text-destructive"
              >
                <Heart className="w-4 h-4 mr-1" />
                <span className="text-xs">{post.likes}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-muted-foreground hover:text-primary"
              >
                <MessageCircle className="w-4 h-4 mr-1" />
                <span className="text-xs">{post.comments}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-muted-foreground hover:text-accent"
              >
                <Share className="w-4 h-4 mr-1" />
                <span className="text-xs">{post.shares}</span>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

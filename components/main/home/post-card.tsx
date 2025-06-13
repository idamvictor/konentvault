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
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Post as ApiPost } from "@/types/post-types";
import { formatTimestamp } from "@/helpers/format-timestamp";
import React, { useState } from "react";
import { useAddComment } from "@/services/reaction/use-add-comment";
import { useGetPostReactions } from "@/services/reaction/get-post-reactions";

interface PostCardProps {
  post: ApiPost;
}

export default function PostCard({ post }: PostCardProps) {
  const likes = post.reactions
    ? post.reactions.filter((r) => r.type === "like").length
    : 0;
  const comments = post.reactions
    ? post.reactions.filter((r) => r.type === "comment").length
    : 0;
  const shares = post.reactions
    ? post.reactions.filter((r) => r.type === "share").length
    : 0;
  const mediaCount = post.media ? post.media.length : 0;
  const image =
    post.media &&
    post.media.length > 0 &&
    typeof post.media[0] === "object" &&
    "url" in post.media[0]
      ? (post.media[0] as { url?: string }).url || ""
      : "";
  const authorName = post.user?.username || "Unknown";
  const authorAvatar = post.user?.profilePicture || "/placeholder.svg";
  const authorUsername = `@${post.user?.username || "unknown"}`;
  // If you have a verified field, use it; otherwise, default to false
  const authorVerified = false;
  const [commentText, setCommentText] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const { data: postReactions } = useGetPostReactions(post.id.toString());
  const addComment = useAddComment();

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setIsCommenting(true);
    await addComment.mutateAsync({
      type: "comment",
      text: commentText,
      media: "text",
      postId: post.id,
    });
    setCommentText("");
    setIsCommenting(false);
    setShowComments(false); // Hide comments after successful submission
  };

  return (
    <Card className="overflow-hidden border-0 bg-background/95 backdrop-blur-sm shadow-md rounded-lg mb-4">
      <CardContent className="p-0">
        {/* Post Header */}
        <div className="p-3 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <Avatar className="w-8 h-8 ring-1 ring-primary/10">
              <AvatarImage
                src={authorAvatar}
                alt={`${authorName}'s profile`}
                className="object-cover"
              />
              <AvatarFallback>
                {authorName.charAt(0).toLocaleUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center space-x-1">
                <h3 className="font-medium text-foreground text-sm">
                  {authorName}
                </h3>
                {authorVerified && (
                  <CheckCircle
                    className="w-3.5 h-3.5 text-primary"
                    aria-label="Verified account"
                  />
                )}
              </div>
              <p className="text-[11px] text-muted-foreground leading-none">
                {authorUsername}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-[11px] text-muted-foreground">
              {formatTimestamp(post.createdAt)}
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
          {" "}
          <p className="text-base text-foreground/90 leading-relaxed">
            {post.content}
          </p>
        </div>

        {/* Post Image */}
        {image && (
          <div className="relative">
            <div className="aspect-[4/3] relative">
              <Image
                src={image}
                alt="Post content"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {mediaCount > 1 && (
                <div className="absolute top-2 right-2">
                  <Badge
                    variant="secondary"
                    className="bg-background/80 backdrop-blur-sm text-foreground text-[10px] px-2 py-0.5"
                  >
                    <Play className="w-3 h-3 mr-1" />
                    {mediaCount}
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
                className="h-9 px-3 text-muted-foreground hover:text-destructive rounded-full"
              >
                <Heart className="w-5 h-5 mr-1.5" />
                <span className="text-sm">{likes}</span>
              </Button>{" "}
              <Button
                variant="ghost"
                size="sm"
                className="h-9 px-3 text-muted-foreground hover:text-primary rounded-full"
                onClick={() => setShowComments(!showComments)}
              >
                <MessageCircle className="w-5 h-5 mr-1.5" />
                <span className="text-sm">{comments}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-9 px-3 text-muted-foreground hover:text-primary rounded-full"
              >
                <Share className="w-5 h-5 mr-1.5" />
                <span className="text-sm">{shares}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-9 px-3 text-muted-foreground hover:text-primary rounded-full"
              >
                <CircleDollarSign className="w-5 h-5 mr-1.5" />
                <span className="text-sm">{post.views}</span>
              </Button>
            </div>
          </div>{" "}
          {/* Comment Input */}{" "}
          {showComments && (
            <div className="mt-2 space-y-4 px-2">
              {/* Comment Input Form */}
              <form
                onSubmit={handleCommentSubmit}
                className="flex items-center space-x-2"
              >
                <Input
                  type="text"
                  className="flex-1 h-10 text-base"
                  placeholder="Add a comment..."
                  value={commentText}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setCommentText(e.target.value)
                  }
                  disabled={isCommenting}
                  maxLength={200}
                />
                <Button
                  type="submit"
                  size="sm"
                  variant="secondary"
                  disabled={isCommenting || !commentText.trim()}
                  className="h-10 px-4 rounded-full shrink-0 text-base"
                >
                  {isCommenting ? "Posting..." : "Post"}
                </Button>
              </form>

              {/* Comments List */}
              <div className="space-y-3 pt-2 border-t border-border/50">
                {postReactions?.reactions
                  .filter((reaction) => reaction.type === "comment")
                  .sort(
                    (a, b) =>
                      new Date(b.createdAt).getTime() -
                      new Date(a.createdAt).getTime()
                  )
                  .map((comment) => {
                    const commentData = JSON.parse(comment.content);
                    return (
                      <div
                        key={comment.id}
                        className="flex items-start space-x-2"
                      >
                        <Avatar className="w-8 h-8 ring-1 ring-primary/10">
                          <AvatarImage
                            src={
                              comment.user.profilePicture || "/placeholder.svg"
                            }
                            alt={comment.user.name}
                            className="object-cover"
                          />
                          <AvatarFallback>
                            {comment.user.name.charAt(0).toLocaleUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <p className="text-xs font-medium">
                              {comment.user.username}
                            </p>
                            <span className="text-[10px] text-muted-foreground">
                              {formatTimestamp(comment.createdAt)}
                            </span>
                          </div>
                          <p className="text-xs text-foreground/90">
                            {commentData.text}
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

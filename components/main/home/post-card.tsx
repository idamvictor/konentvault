import Image from "next/image";
import {
  Heart,
  MessageCircle,
  Share,
  MoreHorizontal,
  CheckCircle,
  Play,
  CircleDollarSign,
  Pencil,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDeleteReaction } from "@/services/reaction/use-delete-reaction";
import { useLikePost } from "@/services/reaction/use-like-post";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Post as ApiPost } from "@/types/post-types";
import { formatTimestamp } from "@/helpers/format-timestamp";
import React, { useEffect, useState } from "react";
import { useAddComment } from "@/services/reaction/use-add-comment";
import { useGetPostReactions } from "@/services/reaction/get-post-reactions";
import { useUpdateComment } from "@/services/reaction/use-update-comment";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeletePost } from "@/services/post/use-delete-post";

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

  // Debug logs to check the media data
  console.log("Post Media:", post.media);
  console.log("NEXT_PUBLIC_API_URL:", process.env.NEXT_PUBLIC_API_URL);

  const imageUrl =
    post.media && post.media.length > 0
      ? `${process.env.NEXT_PUBLIC_API_URL}${post.media[0].mediaPath}`
      : "";

  console.log("Final Image URL:", imageUrl);

  const authorName = post.user?.username || "Unknown";
  const authorAvatar = post.user?.profilePicture || "/placeholder.svg";
  const authorUsername = `@${post.user?.username || "unknown"}`;
  const authorVerified = false;
  const [commentText, setCommentText] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editCommentText, setEditCommentText] = useState("");
  const { data: postReactions } = useGetPostReactions(post.id.toString());
  const addComment = useAddComment();
  const updateComment = useUpdateComment();
  const deleteReaction = useDeleteReaction();
  const likePost = useLikePost();
  const [isLiked, setIsLiked] = useState(() => {
    return post.reactions?.some(
      (r) => r.type === "like" && r.userId === post.user?.id
    );
  });
  const [currentLikeId, setCurrentLikeId] = useState(() => {
    return (
      post.reactions?.find(
        (r) => r.type === "like" && r.userId === post.user?.id
      )?.id || null
    );
  });

  useEffect(() => {
    if (postReactions?.reactions && post?.user) {
      // Find if the current user liked the post
      const liked = postReactions.reactions.find(
        (r) => r.type === "like" && r.userId === post.user.id
      );

      setIsLiked(!!liked);
      setCurrentLikeId(liked?.id ?? null);
    }
  }, [postReactions, post]);

  const deletePostMutation = useDeletePost();

  const handleDeletePost = async (postId: string) => {
    try {
      await deletePostMutation.mutateAsync(postId);
      // Post will be automatically removed from the UI due to query invalidation
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

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

  const handleCommentEdit = (commentId: string, text: string) => {
    setEditingCommentId(commentId);
    setEditCommentText(text);
  };

  const handleCommentUpdate = async (commentId: string) => {
    if (!editCommentText.trim()) return;

    try {
      await updateComment.mutateAsync({
        commentId,
        postId: post.id.toString(),
        commentData: {
          text: editCommentText,
          file: "text", // This can be updated to handle media files
        },
      });
      setEditingCommentId(null);
      setEditCommentText("");
    } catch (error) {
      console.error("Failed to update comment:", error);
    }
  };

  const handleLikeToggle = async () => {
    try {
      if (isLiked && currentLikeId) {
        await deleteReaction.mutateAsync(currentLikeId.toString());
        setIsLiked(false);
        setCurrentLikeId(null);
      } else {
        const newLikeId = await likePost.mutateAsync({
          type: "like",
          postId: post.id,
        });

        const likedId = parseInt(newLikeId, 10);
        setIsLiked(true);
        setCurrentLikeId(likedId);
      }
    } catch (error) {
      console.error("Failed to toggle like:", error);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await deleteReaction.mutateAsync(commentId);
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
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
            </span>{" "}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 p-0 rounded-full"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive"
                  onClick={() => handleDeletePost(post.id.toString())}
                >
                  Delete post
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Post Content */}
        <div className="px-3 pb-2">
          <p className="text-base text-foreground/90 leading-relaxed">
            {post.content}
          </p>
        </div>

        {/* Post Image */}
        {imageUrl && (
          <div className="relative">
            <div className="aspect-[4/3] relative">
              <Image
                src={imageUrl}
                alt="Post content"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
                onError={(e) => {
                  console.error("Error loading image:", imageUrl);
                  console.error("Image error event:", e);
                }}
                onLoad={() => {
                  console.log("Image loaded successfully:", imageUrl);
                }}
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
                className={`h-9 px-3 rounded-full ${
                  isLiked
                    ? "text-destructive"
                    : "text-muted-foreground hover:text-destructive"
                }`}
                onClick={handleLikeToggle}
              >
                <Heart
                  className={`w-5 h-5 mr-1.5 ${isLiked ? "fill-current" : ""}`}
                />
                <span className="text-sm">{likes}</span>
              </Button>
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
                    const isEditing =
                      editingCommentId === comment.id.toString();

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
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <p className="text-xs font-medium">
                                {comment.user.username}
                              </p>
                              <span className="text-[10px] text-muted-foreground">
                                {formatTimestamp(comment.createdAt)}
                              </span>
                            </div>{" "}
                            {!isEditing && (
                              <div className="flex items-center gap-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0 hover:bg-accent"
                                  onClick={() =>
                                    handleCommentEdit(
                                      comment.id.toString(),
                                      commentData.text
                                    )
                                  }
                                >
                                  <Pencil className="h-3 w-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0 hover:bg-accent hover:text-destructive"
                                  onClick={() =>
                                    handleDeleteComment(comment.id.toString())
                                  }
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            )}
                          </div>
                          {isEditing ? (
                            <div className="flex items-center space-x-2 mt-1">
                              <Input
                                type="text"
                                value={editCommentText}
                                onChange={(e) =>
                                  setEditCommentText(e.target.value)
                                }
                                className="flex-1 h-8 text-xs"
                                maxLength={200}
                              />
                              <div className="flex items-center space-x-1">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-8 px-2"
                                  onClick={() => setEditingCommentId(null)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="default"
                                  className="h-8 px-3"
                                  onClick={() =>
                                    handleCommentUpdate(comment.id.toString())
                                  }
                                  disabled={
                                    !editCommentText.trim() ||
                                    editCommentText === commentData.text
                                  }
                                >
                                  Save
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <p className="text-xs text-foreground/90">
                              {commentData.text}
                            </p>
                          )}
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

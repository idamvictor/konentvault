/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { type Post, getImageUrl } from "@/lib/api";
import {
  useCreateReaction,
  usePostReactions,
  useDeleteReaction,
} from "@/hooks/use-reactions";
import { useDeletePost } from "@/hooks/use-posts";
import {
  Heart,
  MessageCircle,
  Share2,
  Eye,
  DollarSign,
  Users,
  Lock,
  MoreHorizontal,
  Trash2,
  Edit,
  ImageIcon,
  ChevronLeft,
  ChevronRight,
  PlayCircle,
  FileVideo,
  Volume2,
  VolumeX,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDistanceToNow } from "date-fns";
import { CommentSection } from "./comment-section";
import { EditPostDialog } from "./edit-post-dialog";
import Image from "next/image";

interface PostCardProps {
  post: Post;
  showActions?: boolean;
  currentUserId?: number;
}

export function PostCard({
  post,
  showActions = true,
  currentUserId = 1,
}: PostCardProps) {
  const [showComments, setShowComments] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  const createReaction = useCreateReaction();
  const deleteReaction = useDeleteReaction();
  const deletePost = useDeletePost();
  const { data: reactionsData } = usePostReactions(post.id);

  const reactions = reactionsData?.reactions || [];
  const likesCount = reactions.filter((r: any) => r.type === "like").length;
  const commentsCount = reactions.filter(
    (r: any) => r.type === "comment"
  ).length;
  const sharesCount = reactions.filter((r: any) => r.type === "share").length;

  // Check if current user has liked this post
  const userLike = reactions.find(
    (r: any) => r.type === "like" && r.userId === currentUserId
  );
  const isLiked = !!userLike;

  const handleLike = () => {
    if (isLiked && userLike) {
      deleteReaction.mutate(userLike.id);
    } else {
      createReaction.mutate({
        type: "like",
        postId: post.id,
      });
    }
  };

  const handleShare = () => {
    createReaction.mutate({
      type: "share",
      postId: post.id,
      text: "Shared this amazing post!",
    });
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deletePost.mutate(post.id);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % post.media.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + post.media.length) % post.media.length
    );
  };

  const getPayTypeIcon = (payType: string) => {
    switch (payType) {
      case "free":
        return <Users className="w-3 h-3" />;
      case "ppv":
        return <DollarSign className="w-3 h-3" />;
      case "subscription":
        return <Lock className="w-3 h-3" />;
      default:
        return null;
    }
  };

  const getPayTypeColor = (payType: string) => {
    switch (payType) {
      case "free":
        return "bg-green-100 text-green-800 border-green-200";
      case "ppv":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "subscription":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const isVideoFile = (mediaPath: string) => {
    const videoExtensions = [".mp4", ".webm", ".ogg", ".mov", ".avi", ".mkv"];
    return videoExtensions.some((ext) => mediaPath.toLowerCase().includes(ext));
  };

  const renderMediaItem = (media: any, index: number, isDialog = false) => {
    const mediaUrl = getImageUrl(media.mediaPath);
    const isVideo = isVideoFile(media.mediaPath);

    if (isVideo) {
      return (
        <div className="relative group">
          <video
            src={mediaUrl || "/placeholder.svg"}
            controls={isDialog}
            muted={isMuted}
            loop
            className={`w-full rounded-lg object-cover ${
              isDialog ? "max-h-[80vh]" : "max-h-96"
            }`}
            onError={(e) => {
              e.currentTarget.src = "/placeholder.svg?height=400&width=600";
            }}
          />
          {!isDialog && (
            <>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <PlayCircle className="w-12 h-12 text-white/80" />
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="absolute bottom-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full h-8 w-8"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMuted(!isMuted);
                }}
              >
                {isMuted ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </Button>
              <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                <FileVideo className="w-3 h-3" />
                Video
              </div>
            </>
          )}
        </div>
      );
    } else {
      return (
        <div className="relative group cursor-pointer">
          <Image
            src={mediaUrl || "/placeholder.svg"}
            alt={`Post media ${index + 1}`}
            width={isDialog ? 800 : 600}
            height={isDialog ? 600 : 400}
            className={`w-full rounded-lg object-cover hover:opacity-95 transition-opacity ${
              isDialog ? "h-auto max-h-[80vh] object-contain" : "max-h-96"
            }`}
            onError={(e) => {
              e.currentTarget.src = "/placeholder.svg?height=400&width=600";
            }}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-lg" />
        </div>
      );
    }
  };

  const getMediaTypeStats = () => {
    if (!post.media || post.media.length === 0) return { images: 0, videos: 0 };

    const videos = post.media.filter((media) =>
      isVideoFile(media.mediaPath)
    ).length;
    const images = post.media.length - videos;
    return { images, videos };
  };

  const { images, videos } = getMediaTypeStats();

  return (
    <>
      <Card className="w-full shadow-md hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="w-10 h-10">
                <AvatarImage
                  src={
                    post.user.profilePicture
                      ? getImageUrl(post.user.profilePicture)
                      : undefined
                  }
                  alt={post.user.name}
                />
                <AvatarFallback className="bg-blue-100 text-blue-600">
                  {post.user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-sm">{post.user.name}</h3>
                  <Badge
                    variant="outline"
                    className={`${getPayTypeColor(
                      post.payType
                    )} text-xs flex items-center gap-1`}
                  >
                    {getPayTypeIcon(post.payType)}
                    {post.payType.toUpperCase()}
                    {post.payType === "ppv" &&
                      Number.parseFloat(post.price) > 0 && (
                        <span className="ml-1">${post.price}</span>
                      )}
                  </Badge>
                  {post.media && post.media.length > 0 && (
                    <div className="flex gap-1">
                      {images > 0 && (
                        <Badge
                          variant="outline"
                          className="bg-blue-100 text-blue-800 border-blue-200 text-xs flex items-center gap-1"
                        >
                          <ImageIcon className="w-3 h-3" />
                          {images}
                        </Badge>
                      )}
                      {videos > 0 && (
                        <Badge
                          variant="outline"
                          className="bg-purple-100 text-purple-800 border-purple-200 text-xs flex items-center gap-1"
                        >
                          <FileVideo className="w-3 h-3" />
                          {videos}
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  @{post.user.username} •{" "}
                  {formatDistanceToNow(new Date(post.createdAt), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>

            {showActions && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setShowEditDialog(true)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleDelete}
                    className="text-red-600 focus:text-red-600"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <div
            className="prose prose-sm max-w-none mb-4"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {post.media && post.media.length > 0 && (
            <div className="mb-4">
              {post.media.length === 1 ? (
                // Single media display
                <Dialog>
                  <DialogTrigger asChild>
                    <div>{renderMediaItem(post.media[0], 0)}</div>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    {renderMediaItem(post.media[0], 0, true)}
                  </DialogContent>
                </Dialog>
              ) : post.media.length === 2 ? (
                // Two media side by side
                <div className="grid grid-cols-2 gap-2">
                  {post.media.map((media, index) => (
                    <Dialog key={index}>
                      <DialogTrigger asChild>
                        <div className="h-48">
                          {isVideoFile(media.mediaPath) ? (
                            <div className="relative h-full">
                              <video
                                src={
                                  getImageUrl(media.mediaPath) ||
                                  "/placeholder.svg"
                                }
                                muted
                                className="w-full h-full rounded-lg object-cover"
                              />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <PlayCircle className="w-8 h-8 text-white/80" />
                              </div>
                            </div>
                          ) : (
                            <Image
                              src={
                                getImageUrl(media.mediaPath) ||
                                "/placeholder.svg"
                              }
                              alt={`Post media ${index + 1}`}
                              width={300}
                              height={300}
                              className="w-full h-full rounded-lg object-cover hover:opacity-95 transition-opacity"
                            />
                          )}
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl">
                        <div className="relative">
                          {renderMediaItem(
                            post.media[currentImageIndex],
                            currentImageIndex,
                            true
                          )}
                          {post.media.length > 1 && (
                            <>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                                onClick={prevImage}
                              >
                                <ChevronLeft className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                                onClick={nextImage}
                              >
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 text-white px-2 py-1 rounded text-sm">
                                {currentImageIndex + 1} / {post.media.length}
                              </div>
                            </>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  ))}
                </div>
              ) : (
                // Multiple media grid
                <div className="grid grid-cols-2 gap-2 h-96">
                  {post.media.slice(0, 4).map((media, index) => (
                    <Dialog key={index}>
                      <DialogTrigger asChild>
                        <div className="relative group cursor-pointer h-48">
                          {isVideoFile(media.mediaPath) ? (
                            <div className="relative h-full">
                              <video
                                src={
                                  getImageUrl(media.mediaPath) ||
                                  "/placeholder.svg"
                                }
                                muted
                                className="w-full h-full rounded-lg object-cover"
                              />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <PlayCircle className="w-8 h-8 text-white/80" />
                              </div>
                            </div>
                          ) : (
                            <Image
                              src={
                                getImageUrl(media.mediaPath) ||
                                "/placeholder.svg"
                              }
                              alt={`Post media ${index + 1}`}
                              width={300}
                              height={200}
                              className="w-full h-full rounded-lg object-cover hover:opacity-95 transition-opacity"
                            />
                          )}

                          {index === 3 && post.media.length > 4 && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-lg">
                              <span className="text-white text-2xl font-bold">
                                +{post.media.length - 4}
                              </span>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-lg" />
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl">
                        <div className="relative">
                          {renderMediaItem(
                            post.media[currentImageIndex],
                            currentImageIndex,
                            true
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                            onClick={prevImage}
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                            onClick={nextImage}
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 text-white px-2 py-1 rounded text-sm">
                            {currentImageIndex + 1} / {post.media.length}
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {post.views}
              </span>
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  post.published
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {post.published ? "Published" : "Draft"}
              </span>
            </div>
          </div>

          <Separator className="mb-3" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                className={`flex items-center gap-1 transition-colors ${
                  isLiked
                    ? "text-red-500 hover:text-red-600"
                    : "text-muted-foreground hover:text-red-500"
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? "fill-red-500" : ""}`} />
                <span className="text-xs">{likesCount}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowComments(!showComments)}
                className="flex items-center gap-1 text-muted-foreground hover:text-blue-500"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="text-xs">{commentsCount}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                className="flex items-center gap-1 text-muted-foreground hover:text-green-500"
              >
                <Share2 className="w-4 h-4" />
                <span className="text-xs">{sharesCount}</span>
              </Button>
            </div>
          </div>

          {showComments && (
            <div className="mt-4 pt-4 border-t">
              <CommentSection
                postId={post.id}
                reactions={reactions}
                currentUserId={currentUserId}
              />
            </div>
          )}
        </CardContent>
      </Card>

      <EditPostDialog
        post={post}
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
      />
    </>
  );
}

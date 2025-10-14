"use client";

import type React from "react";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useCreatePost } from "@/hooks/use-posts";
import {
  ImageIcon,
  Link2Icon,
  SmileIcon,
  X,
  DollarSign,
  Users,
  Lock,
  Plus,
  PlayCircle,
  FileVideo,
} from "lucide-react";
import Image from "next/image";
import type { AxiosError } from "axios";
import { MentionTextarea } from "./mention-textarea";
import { MentionedCreators } from "./mentioned-creators";
import type { Creator } from "@/lib/api";

interface MediaFile {
  file: File;
  preview: string;
  id: string;
  type: "image" | "video";
}

export function CreatePostForm() {
  const [content, setContent] = useState("");
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [payType, setPayType] = useState<"free" | "ppv" | "subscription">(
    "free"
  );
  const [price, setPrice] = useState<number>(0);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [mentionedUsers, setMentionedUsers] = useState<Creator[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate, isPending, isError, error } = useCreatePost();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    files.forEach((file) => {
      if (file.type.startsWith("image/") || file.type.startsWith("video/")) {
        const id = Math.random().toString(36).substr(2, 9);
        const preview = URL.createObjectURL(file);
        const type = file.type.startsWith("video/") ? "video" : "image";

        setMediaFiles((prev) => [...prev, { file, preview, id, type }]);
      } else {
        alert("Please select only image or video files");
      }
    });

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeMedia = (id: string) => {
    setMediaFiles((prev) => {
      const fileToRemove = prev.find((f) => f.id === id);
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter((f) => f.id !== id);
    });
  };

  const removeAllMedia = () => {
    mediaFiles.forEach((media) => {
      URL.revokeObjectURL(media.preview);
    });
    setMediaFiles([]);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    );
  };

  // const formatDuration = (duration: number) => {
  //   const minutes = Math.floor(duration / 60);
  //   const seconds = Math.floor(duration % 60);
  //   return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  // };

  const handlePost = async () => {
    if (!content.trim()) return;

    const formData = new FormData();
    formData.append("content", content);
    formData.append("payType", payType);

    if (payType === "ppv" && price > 0) {
      formData.append("price", price.toString());
    }

    // Add mentioned user IDs - try different formats to ensure compatibility
    if (mentionedUsers.length > 0) {
      // Try multiple formats to ensure the backend receives the data correctly
      mentionedUsers.forEach((user, index) => {
        formData.append(`mentionedUserIds[${index}]`, user.id.toString());
      });
      // Also add as a JSON string as backup
      formData.append(
        "mentionedUserIds",
        JSON.stringify(mentionedUsers.map((u) => u.id))
      );
    }

    if (mediaFiles.length > 0) {
      // Append all media files
      mediaFiles.forEach((media) => {
        formData.append(`media`, media.file);
      });

      // Determine type based on first file or mixed content
      const hasVideo = mediaFiles.some((media) => media.type === "video");
      const hasImage = mediaFiles.some((media) => media.type === "image");

      if (hasVideo && hasImage) {
        formData.append("type", "mixed");
      } else if (hasVideo) {
        formData.append("type", "video");
      } else {
        formData.append("type", "image");
      }
    } else {
      formData.append("type", "text");
    }

    // Debug: Log the FormData contents
    console.log("FormData contents:");
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    mutate(formData, {
      onSuccess: (response) => {
        console.log("Post created successfully:", response);
        setContent("");
        removeAllMedia();
        setPayType("free");
        setPrice(0);
        setShowPaymentOptions(false);
        setMentionedUsers([]);
      },
      onError: (err) => {
        console.error("Post creation failed:", err);
      },
    });
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

  const getMediaTypeStats = () => {
    const images = mediaFiles.filter((f) => f.type === "image").length;
    const videos = mediaFiles.filter((f) => f.type === "video").length;
    return { images, videos };
  };

  const { images, videos } = getMediaTypeStats();

  return (
    <Card className="border-0 shadow-sm w-full max-w-2xl mx-auto">
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Avatar>
              <AvatarFallback className="bg-blue-100 text-blue-600">
                U
              </AvatarFallback>
            </Avatar>
            <MentionTextarea
              value={content}
              onChange={setContent}
              onMentionSelect={setMentionedUsers}
              placeholder="Create a post..."
              className="min-h-[100px] resize-none rounded-xl"
            />
          </div>

          {mediaFiles.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">
                    {mediaFiles.length}{" "}
                    {mediaFiles.length === 1 ? "file" : "files"} selected
                  </span>
                  {images > 0 && (
                    <Badge
                      variant="outline"
                      className="bg-blue-100 text-blue-800 border-blue-200 text-xs"
                    >
                      {images} {images === 1 ? "image" : "images"}
                    </Badge>
                  )}
                  {videos > 0 && (
                    <Badge
                      variant="outline"
                      className="bg-purple-100 text-purple-800 border-purple-200 text-xs"
                    >
                      {videos} {videos === 1 ? "video" : "videos"}
                    </Badge>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={removeAllMedia}
                  className="text-red-600 hover:text-red-700 h-6"
                >
                  <X className="h-3 w-3 mr-1" />
                  Remove all
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {mediaFiles.map((media) => (
                  <div key={media.id} className="relative group">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-1 right-1 bg-black/50 hover:bg-black/70 text-white rounded-full z-10 h-6 w-6"
                      onClick={() => removeMedia(media.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>

                    {media.type === "image" ? (
                      <div className="relative h-24 w-full rounded-lg overflow-hidden">
                        <Image
                          src={media.preview || "/placeholder.svg"}
                          alt="Preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="relative h-24 w-full rounded-lg overflow-hidden bg-black">
                        <video
                          src={media.preview}
                          className="w-full h-full object-cover"
                          muted
                          onLoadedMetadata={(e) => {
                            const video = e.target as HTMLVideoElement;
                            video.currentTime = 1; // Show frame at 1 second for thumbnail
                          }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <PlayCircle className="w-8 h-8 text-white/80" />
                        </div>
                        <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                          <FileVideo className="w-3 h-3 inline mr-1" />
                          {formatFileSize(media.file.size)}
                        </div>
                      </div>
                    )}

                    <div className="absolute bottom-1 left-1 bg-black/50 text-white text-xs px-1 rounded">
                      {media.type === "video" ? "Video" : "Image"}
                    </div>
                  </div>
                ))}

                {/* Add more button */}
                <div
                  className="h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="text-center">
                    <Plus className="h-6 w-6 text-gray-400 mx-auto mb-1" />
                    <span className="text-xs text-gray-500">Add more</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {mentionedUsers.length > 0 && (
            <MentionedCreators creators={mentionedUsers} />
          )}

          {showPaymentOptions && (
            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Payment Settings</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPaymentOptions(false)}
                  className="h-6 w-6 p-0"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="payType" className="text-xs">
                    Payment Type
                  </Label>
                  <Select
                    value={payType}
                    onValueChange={(value: "free" | "ppv" | "subscription") =>
                      setPayType(value)
                    }
                  >
                    <SelectTrigger className="h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="free">Free</SelectItem>
                      <SelectItem value="ppv">Pay Per View</SelectItem>
                      <SelectItem value="subscription">Subscription</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {payType === "ppv" && (
                  <div className="space-y-2">
                    <Label htmlFor="price" className="text-xs">
                      Price ($)
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      value={price || ""}
                      onChange={(e) =>
                        setPrice(Number.parseFloat(e.target.value) || 0)
                      }
                      className="h-8"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between border-t pt-4">
            <div className="flex gap-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="image/*,video/*"
                multiple
                className="hidden"
              />
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-blue-600"
                onClick={() => fileInputRef.current?.click()}
              >
                <ImageIcon className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-green-600"
              >
                <Link2Icon className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-yellow-600"
              >
                <SmileIcon className="h-5 w-5" />
              </Button>
              {/* <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-purple-600"
                onClick={() => setShowPaymentOptions(!showPaymentOptions)}
              >
                <DollarSign className="h-5 w-5" />
              </Button> */}
            </div>

            <div className="flex items-center gap-2">
              {payType !== "free" && (
                <Badge
                  variant="outline"
                  className={`${getPayTypeColor(
                    payType
                  )} text-xs flex items-center gap-1`}
                >
                  {getPayTypeIcon(payType)}
                  {payType.toUpperCase()}
                  {payType === "ppv" && price > 0 && (
                    <span className="ml-1">${price}</span>
                  )}
                </Badge>
              )}

              {mentionedUsers.length > 0 && (
                <Badge
                  variant="outline"
                  className="bg-purple-100 text-purple-800 border-purple-200 text-xs"
                >
                  {mentionedUsers.length}{" "}
                  {mentionedUsers.length === 1 ? "mention" : "mentions"}
                </Badge>
              )}

              {mediaFiles.length > 0 && (
                <Badge
                  variant="outline"
                  className="bg-gray-100 text-gray-800 border-gray-200 text-xs"
                >
                  {mediaFiles.length}{" "}
                  {mediaFiles.length === 1 ? "file" : "files"}
                </Badge>
              )}

              <Button
                onClick={handlePost}
                disabled={isPending || !content.trim()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isPending ? "Posting..." : "Post"}
              </Button>
            </div>
          </div>

          {isError && (
            <div className="text-red-500 text-sm mt-2">
              {(error as AxiosError<{ message?: string }>)?.response?.data
                ?.message ||
                "Failed to create post. Check console for details."}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { ImageIcon, Link2Icon, SmileIcon, X } from "lucide-react";
import { useState, useRef } from "react";
import { useCreatePost } from "@/services/post/use-create-post";
import type { AxiosError } from "axios";
import Image from "next/image";

export function MakePost() {
  const [content, setContent] = useState("");
  const [media, setMedia] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate, isPending, isError, error } = useCreatePost();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith("image/") || file.type.startsWith("video/")) {
        setMedia(file);
        const previewUrl = URL.createObjectURL(file);
        setMediaPreview(previewUrl);
      } else {
        alert("Please select an image or video file");
      }
    }
  };

  const removeMedia = () => {
    setMedia(null);
    setMediaPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handlePost = async () => {
    if (!content.trim()) return;

    const formData = new FormData();
    formData.append("content", content);
    formData.append("payType", "free");

    if (media) {
      formData.append("media", media);
      formData.append(
        "type",
        media.type.startsWith("video/") ? "video" : "image"
      );
    } else {
      formData.append("type", "text");
    }

    mutate(formData, {
      onSuccess: () => {
        setContent("");
        removeMedia();
      },
      onError: (err) => {
        console.error("Post creation failed:", err);
      },
    });
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Avatar>
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Create a post..."
              className="min-h-[100px] resize-none rounded-xl"
            />
          </div>

          {mediaPreview && (
            <div className="relative w-full">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full"
                onClick={removeMedia}
              >
                <X className="h-4 w-4" />
              </Button>
              {media?.type.startsWith("image/") ? (
                <div className="relative h-[300px] w-full rounded-lg overflow-hidden">
                  <Image
                    src={mediaPreview}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                </div>
              ) : media?.type.startsWith("video/") ? (
                <video
                  src={mediaPreview}
                  controls
                  className="w-full rounded-lg max-h-[300px]"
                />
              ) : null}
            </div>
          )}

          <div className="flex items-center justify-between border-t pt-4">
            <div className="flex gap-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="image/*,video/*"
                className="hidden"
              />
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground"
                onClick={() => fileInputRef.current?.click()}
              >
                <ImageIcon className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground"
              >
                <Link2Icon className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground"
              >
                <SmileIcon className="h-5 w-5" />
              </Button>
            </div>
            <Button
              onClick={handlePost}
              disabled={isPending || !content.trim()}
            >
              {isPending ? "Posting..." : "Post"}
            </Button>
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

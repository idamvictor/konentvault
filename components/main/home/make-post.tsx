import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { ImageIcon, Link2Icon, SmileIcon } from "lucide-react";
import { useState } from "react";
import { useCreatePost } from "@/services/post/use-create-post";
import type { AxiosError } from "axios";

export function MakePost() {
  const [content, setContent] = useState("");
  const [media, setMedia] = useState<string | null>(null);
  const { mutate, isPending, isError, error } = useCreatePost();

  console.log(media, "media");

  const handlePost = () => {
    if (!content.trim()) return;

    mutate(
      {
        content,
        type: media ? (media.includes("video") ? "video" : "image") : "text",
        payType: "free", // Default to free, you can add UI controls to change this
        ...(media && { media }),
      },
      {
        onError: (err) => {
          console.error("Post creation failed:", err);
        },
      }
    );

    // Reset form
    setContent("");
    setMedia(null);
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
          <div className="flex items-center justify-between border-t pt-4">
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground"
                onClick={() => {
                  // Here you would typically open a file picker
                  // For now, we'll just simulate adding an image
                  setMedia("uploads/media/example.jpg");
                }}
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

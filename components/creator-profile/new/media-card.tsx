"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lock, Play, Eye } from "lucide-react";
import { usePayForMedia } from "@/hooks/use-subscription-plans";
import type { Media } from "@/types/creator-profile/index";

interface MediaCardProps {
  media: Media;
}

export function MediaCard({ media }: MediaCardProps) {
  const payForMediaMutation = usePayForMedia();

  const getImageUrl = (path: string | null) => {
    if (!path) return null;
    return path.startsWith("http")
      ? path
      : `https://sp.konentvault.net.ng${path}`;
  };

  const handlePayForMedia = () => {
    payForMediaMutation.mutate(media.id);
  };

  const isLocked =
    media.status === "locked" || (media.isPaid && media.payType === "ppv");

  return (
    <Card className="group overflow-hidden">
      <div className="relative aspect-square">
        <Image
          src={getImageUrl(media.file) || "/placeholder.svg"}
          alt={media.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {media.type === "video" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <Play className="h-8 w-8 text-white" />
          </div>
        )}

        {media.isPaid && (
          <Badge
            variant={media.payType === "ppv" ? "destructive" : "secondary"}
            className="absolute top-2 right-2"
          >
            {media.payType === "ppv" ? `$${media.price}` : "Premium"}
          </Badge>
        )}

        {isLocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="text-center text-white space-y-2">
              <Lock className="h-8 w-8 mx-auto" />
              <p className="text-sm font-medium">Locked</p>
              {media.payType === "ppv" && (
                <Button
                  size="sm"
                  onClick={handlePayForMedia}
                  disabled={payForMediaMutation.isPending}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {payForMediaMutation.isPending
                    ? "Processing..."
                    : `Pay $${media.price}`}
                </Button>
              )}
            </div>
          </div>
        )}
      </div>

      <CardContent className="p-3">
        <h4 className="font-medium text-sm line-clamp-1">{media.title}</h4>
        {media.description && (
          <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
            {media.description}
          </p>
        )}
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-muted-foreground capitalize">
            {media.type}
          </span>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Eye className="h-3 w-3" />
            {media.views}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

"use client"

import Image from "next/image"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Share, Lock, Play } from "lucide-react"
import { usePayForMedia } from "@/hooks/use-subscription-plans"
import type { Post } from "@/types/creator-profile/index"

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  const payForMediaMutation = usePayForMedia()

  const getImageUrl = (path: string | null) => {
    if (!path) return null
    return path.startsWith("http") ? path : `https://sp.konentvault.net.ng${path}`
  }

  const handlePayForPost = () => {
    if (post.media.length > 0) {
      payForMediaMutation.mutate(post.media[0].mediaId)
    }
  }

  const isLocked = post.status === "locked" || (post.isPaid && post.payType === "ppv")

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={getImageUrl(post.user.profilePicture) || "/placeholder.svg"} alt={post.user.name} />
            <AvatarFallback>
              {post.user.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-sm">{post.user.name}</h4>
              <span className="text-xs text-muted-foreground">@{post.user.username}</span>
            </div>
            <p className="text-xs text-muted-foreground">{new Date(post.createdAt).toLocaleDateString()}</p>
          </div>
          {post.isPaid && (
            <Badge variant={post.payType === "ppv" ? "destructive" : "secondary"}>
              {post.payType === "ppv" ? `$${post.price}` : "Premium"}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm">{post.content}</p>

        {post.media.length > 0 && (
          <div className="relative">
            <div
              className={`grid gap-2 ${
                post.media.length === 1
                  ? "grid-cols-1"
                  : post.media.length === 2
                    ? "grid-cols-2"
                    : post.media.length === 3
                      ? "grid-cols-2"
                      : "grid-cols-2"
              }`}
            >
              {post.media.slice(0, 4).map((media, index) => (
                <div key={media.id} className="relative aspect-square overflow-hidden rounded-lg">
                  <Image
                    src={getImageUrl(media.mediaPath) || "/placeholder.svg"}
                    alt="Post media"
                    fill
                    className="object-cover"
                  />
                  {media.mediaPath.includes(".mp4") && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <Play className="h-8 w-8 text-white" />
                    </div>
                  )}
                  {index === 3 && post.media.length > 4 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-white font-semibold">
                      +{post.media.length - 4}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {isLocked && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-lg backdrop-blur-sm">
                <div className="text-center text-white space-y-3">
                  <Lock className="h-12 w-12 mx-auto" />
                  <div>
                    <p className="font-semibold">Locked Content</p>
                    <p className="text-sm opacity-90">
                      {post.payType === "ppv" ? `Pay $${post.price} to unlock` : "Subscribe to view"}
                    </p>
                  </div>
                  {post.payType === "ppv" && (
                    <Button
                      onClick={handlePayForPost}
                      disabled={payForMediaMutation.isPending}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      {payForMediaMutation.isPending ? "Processing..." : `Pay $${post.price}`}
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2 text-muted-foreground hover:text-red-500"
            >
              <Heart className="h-4 w-4" />
              <span className="text-xs">{post.reactions.filter((r) => r.type === "like").length}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2 text-muted-foreground hover:text-blue-500"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="text-xs">{post.reactions.filter((r) => r.type === "comment").length}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2 text-muted-foreground hover:text-green-500"
            >
              <Share className="h-4 w-4" />
              <span className="text-xs">{post.reactions.filter((r) => r.type === "share").length}</span>
            </Button>
          </div>
          <span className="text-xs text-muted-foreground">{post.views} views</span>
        </div>
      </CardContent>
    </Card>
  )
}

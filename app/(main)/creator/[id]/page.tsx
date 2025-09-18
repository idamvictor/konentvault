"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useCreators } from "@/hooks/use-creators-1";
import { useCreatorPosts } from "@/hooks/use-creator-posts";
import { useCreatorMedia } from "@/hooks/use-creator-media";
import {
  useSubscriptionPlans,
  useSubscribe,
} from "@/hooks/use-subscription-plans";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  // MessageCircle,
  Calendar,
  MapPin,
  Verified,
  Heart,
  ImageIcon,
  Lock,
} from "lucide-react";
import { PostCard } from "@/components/creator-profile/new/post-card";
import { MediaCard } from "@/components/creator-profile/new/media-card";

export default function CreatorDetailPage() {
  const params = useParams();
  const creatorId = Number.parseInt(params.id as string);
  const [activeTab, setActiveTab] = useState("posts");

  const { data: creatorsData } = useCreators();
  const { data: postsData, isLoading: postsLoading } =
    useCreatorPosts(creatorId);
  const { data: mediaData, isLoading: mediaLoading } =
    useCreatorMedia(creatorId);
  const { data: plansData } = useSubscriptionPlans(creatorId);
  const subscribeMutation = useSubscribe();

  const creator = creatorsData?.creators?.find((c) => c.id === creatorId);

  const getImageUrl = (path: string | null) => {
    if (!path) return null;
    return path.startsWith("http")
      ? path
      : `https://sp.konentvault.net.ng/${path}`;
  };

  const handleSubscribe = (planId: number) => {
    subscribeMutation.mutate({ creatorId, subscriptionPlanId: planId });
  };

  // const handleChatClick = () => {
  //   console.log("Chat button clicked for creator:", creator?.name);
  // };

  if (!creator) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert>
          <AlertDescription>Creator not found.</AlertDescription>
        </Alert>
      </div>
    );
  }

  const freePosts =
    postsData?.posts?.filter(
      (post) => !post.isPaid || post.payType === "free"
    ) || [];
  const paidPosts =
    postsData?.posts?.filter(
      (post) => post.isPaid && post.payType !== "free"
    ) || [];
  const freeMedia =
    mediaData?.media?.filter(
      (media) => !media.isPaid || media.payType === "free"
    ) || [];
  const paidMedia =
    mediaData?.media?.filter(
      (media) => media.isPaid && media.payType !== "free"
    ) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50">
      {/* Cover Image */}
      <div className="relative h-64 md:h-80 bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
        {creator.coverImage && (
          <Image
            src={getImageUrl(creator.coverImage) || "/placeholder.svg"}
            alt={`${creator.name} cover`}
            fill
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="container mx-auto px-4 -mt-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Creator Info Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <Avatar className="h-32 w-32 mx-auto border-4 border-white shadow-lg">
                    <AvatarImage
                      src={
                        getImageUrl(creator.profilePicture) ||
                        "/placeholder.svg"
                      }
                      alt={creator.name}
                    />
                    <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                      {creator.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <h1 className="text-2xl font-bold">{creator.name}</h1>
                      {creator.isVerified && (
                        <Verified className="h-6 w-6 text-blue-500 fill-current" />
                      )}
                    </div>
                    <p className="text-muted-foreground">@{creator.username}</p>
                  </div>

                  {creator.bio && (
                    <p className="text-sm text-gray-600">{creator.bio}</p>
                  )}

                  <div className="flex flex-wrap gap-2 justify-center">
                    {creator.isCreator && (
                      <Badge
                        variant="secondary"
                        className="bg-purple-100 text-purple-700"
                      >
                        Creator
                      </Badge>
                    )}
                    {creator.country && (
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <MapPin className="h-3 w-3" />
                        {creator.country}
                      </Badge>
                    )}
                  </div>

                  <div className="text-sm text-muted-foreground space-y-1">
                    <div className="flex items-center justify-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Joined {new Date(creator.createdAt).toLocaleDateString()}
                    </div>
                    {creator.country && (
                      <div className="flex items-center justify-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {creator.country}
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    {/* <Button
                      onClick={handleChatClick}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Chat
                    </Button> */}

                    {plansData?.plans && plansData.plans.length > 0 && (
                      <div className="space-y-2">
                        <h3 className="font-semibold text-sm">
                          Subscription Plans
                        </h3>
                        {plansData.plans.map((plan) => (
                          <Card key={plan.id} className="p-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium text-sm">
                                  {plan.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {plan.duration} days
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-bold text-sm">
                                  ${plan.price}
                                </p>
                                <Button
                                  size="sm"
                                  onClick={() => handleSubscribe(plan.id)}
                                  disabled={subscribeMutation.isPending}
                                  className="mt-1"
                                >
                                  {subscribeMutation.isPending
                                    ? "Processing..."
                                    : "Subscribe"}
                                </Button>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="space-y-6"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="posts" className="flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  Posts
                </TabsTrigger>
                <TabsTrigger value="media" className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" />
                  Media
                </TabsTrigger>
              </TabsList>

              <TabsContent value="posts" className="space-y-6">
                {postsLoading ? (
                  <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <Card key={i}>
                        <CardContent className="p-6">
                          <div className="flex items-center gap-3 mb-4">
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <div className="space-y-2">
                              <Skeleton className="h-4 w-32" />
                              <Skeleton className="h-3 w-24" />
                            </div>
                          </div>
                          <Skeleton className="h-4 w-full mb-2" />
                          <Skeleton className="h-4 w-3/4 mb-4" />
                          <Skeleton className="h-48 w-full rounded-lg" />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {freePosts.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold my-4 flex items-center gap-2">
                          <Heart className="h-5 w-5 text-green-500" />
                          Free Posts
                        </h3>
                        <div className="space-y-4">
                          {freePosts.map((post) => (
                            <PostCard key={post.id} post={post} />
                          ))}
                        </div>
                      </div>
                    )}

                    {paidPosts.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                          <Lock className="h-5 w-5 text-purple-500" />
                          Premium Posts
                        </h3>
                        <div className="space-y-4">
                          {paidPosts.map((post) => (
                            <PostCard key={post.id} post={post} />
                          ))}
                        </div>
                      </div>
                    )}

                    {postsData?.posts?.length === 0 && (
                      <div className="text-center py-12">
                        <p className="text-muted-foreground">
                          No posts available.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="media" className="space-y-6">
                {mediaLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="space-y-2">
                        <Skeleton className="aspect-square w-full rounded-lg" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {freeMedia.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                          <ImageIcon className="h-5 w-5 text-green-500" />
                          Free Media
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {freeMedia.map((media) => (
                            <MediaCard key={media.id} media={media} />
                          ))}
                        </div>
                      </div>
                    )}

                    {paidMedia.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                          <Lock className="h-5 w-5 text-purple-500" />
                          Premium Media
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {paidMedia.map((media) => (
                            <MediaCard key={media.id} media={media} />
                          ))}
                        </div>
                      </div>
                    )}

                    {mediaData?.media?.length === 0 && (
                      <div className="text-center py-12">
                        <p className="text-muted-foreground">
                          No media available.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

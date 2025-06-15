"use client";

import { ArrowLeft, MoreVertical, Heart, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { VerificationBadge } from "../ui/verification-badge";
import { useRouter, useParams } from "next/navigation";
import { useGetCreators } from "@/services/creator/get-creators";
import Image from "next/image";

export function ProfileHeader() {
  const router = useRouter();
  const params = useParams();
  const username = params.username as string;
  const { data: creators = [], isLoading } = useGetCreators();
  const creator = creators.find((c) => c.username === username);
  const imageBaseUrl = process.env.NEXT_PUBLIC_API_URL;
  const defaultCoverImage =
    "https://res.cloudinary.com/dyp8gtllq/image/upload/v1739222053/Mothers_20and_20their_20children_20_20at_20ANC_20clinic_20in_20Homa_20Bay_i25atg.jpg";

  if (isLoading) {
    return (
      <div className="h-48 bg-gray-100 animate-pulse relative">
        <div className="absolute top-0 left-0 right-0 p-4">
          <div className="w-10 h-10 bg-gray-200 rounded-full" />
        </div>
      </div>
    );
  }

  if (!creator) {
    return (
      <div className="h-48 bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">Creator not found</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Cover Image */}
      <div className="h-48 relative">
        <Image
          src={
            creator.coverImage
              ? `${imageBaseUrl}/${creator.coverImage}`
              : defaultCoverImage
          }
          alt={`${creator.name}'s cover`}
          className="object-cover"
          fill
          priority
          sizes="100vw"
        />
        {/* Navigation Bar */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 text-white">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            {/* <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <span className="text-xs">📷</span>                <span>{creator.postsCount || 0}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs">🎥</span>
                <span>{creator.mediaCount || 0}</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="h-4 w-4" />
                <span>{creator.likesCount || 0}</span>
              </div>
            </div> */}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
          >
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Profile Info */}
      <div className="px-4 pb-4 bg-white">
        <div className="flex items-start gap-4 -mt-8">
          <Avatar className="h-16 w-16 border-4 border-white">
            <AvatarImage
              src={
                creator.profilePicture
                  ? `${imageBaseUrl}/${creator.profilePicture}`
                  : undefined
              }
              alt={creator.name}
            />
            <AvatarFallback>
              {creator.name.slice(0, 1).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 pt-8">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold">{creator.name}</h1>
                  {creator.isVerified && <VerificationBadge />}
                </div>
                <p className="text-gray-500 text-sm">@{creator.username}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="text-blue-400">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-blue-400">
                  <Share className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { ArrowLeft, MoreVertical, Settings, User } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import EmptyState from "./empty-state";
import ProfileTabs from "./profile-tabs";
import { useGetAuthUserProfile } from "@/services/user/get-auth-user-profile";

export default function ProfileView() {
  const [activeTab, setActiveTab] = useState<"posts" | "media">("posts");
  const { data: profile, isLoading, isError } = useGetAuthUserProfile();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 p-4">
        <div className="h-[200px] w-full bg-muted animate-pulse" />
        <div className="h-24 w-24 rounded-full bg-muted animate-pulse" />
        <div className="space-y-2">
          <div className="h-8 w-48 bg-muted animate-pulse rounded" />
          <div className="h-4 w-32 bg-muted animate-pulse rounded" />
        </div>
      </div>
    );
  }

  if (isError || !profile) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] gap-4">
        <p className="text-muted-foreground">Failed to load profile</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 rounded-md bg-primary text-primary-foreground"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Header with cover image */}{" "}
      <div className="relative h-[200px] w-full bg-muted">
        {profile.coverImage && (
          <Image
            src={profile.coverImage}
            alt="Cover image"
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute top-4 left-4 flex items-center gap-4">
          <button className="rounded-full bg-background/80 p-2 backdrop-blur-sm">
            <ArrowLeft className="h-5 w-5" />
          </button>
        </div>
        <div className="absolute top-4 right-4">
          <button className="rounded-full bg-background/80 p-2 backdrop-blur-sm">
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>
      </div>
      {/* Profile info section */}
      <div className="relative px-4 pb-4 pt-16">
        {/* Profile picture */}
        <div className="absolute -top-12 left-4">
          {" "}
          <div className="relative h-24 w-24 rounded-full border-4 border-background overflow-hidden">
            {profile.profilePicture ? (
              <Image
                src={profile.profilePicture}
                alt="Profile picture"
                fill
                className="object-cover"
              />
            ) : (
              <div className="h-full w-full bg-muted flex items-center justify-center">
                <User className="h-12 w-12 text-muted-foreground" />
              </div>
            )}
            <div className="absolute bottom-1 right-1 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></div>
          </div>
        </div>
        {/* Profile actions */}
        <div className="flex justify-end gap-2 mb-4">
          <button className="flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium">
            <Settings className="h-4 w-4" />
            EDIT PROFILE
          </button>
          <button className="flex items-center justify-center rounded-full border border-border bg-background p-2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 17L17 7M17 7H7M17 7V17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        {/* Profile details */}{" "}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">{profile.name}</h1>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>@{profile.username}</span>
            {profile.email && (
              <>
                <span>•</span>
                <span>{profile.email}</span>
              </>
            )}
          </div>
          {profile.bio && <p className="pt-2">{profile.bio}</p>}
        </div>
        {/* Followers info */}
        <div className="flex items-center gap-1 mt-4 text-sm">
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="font-medium">8</span>
        </div>
      </div>
      {/* Tabs */}
      <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {/* Content area */}
      <div className="flex-1 p-4">
        <EmptyState />
      </div>
    </div>
  );
}

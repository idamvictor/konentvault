"use client";

import { ArrowLeft, MoreVertical, Settings } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import EmptyState from "./empty-state";
import ProfileTabs from "./profile-tabs";

export default function ProfileView() {
  const [activeTab, setActiveTab] = useState<"posts" | "media">("posts");

  return (
    <div className="flex flex-col">
      {/* Header with cover image */}
      <div className="relative h-[200px] w-full bg-muted">
        <Image
          src="https://res.cloudinary.com/dyp8gtllq/image/upload/v1737075755/cld-sample.jpg"
          alt="Cover image"
          fill
          className="object-cover"
          priority
        />
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
          <div className="relative h-24 w-24 rounded-full border-4 border-background overflow-hidden">
            <Image
              src="https://res.cloudinary.com/dyp8gtllq/image/upload/v1737075754/samples/smile.jpg"
              alt="Profile picture"
              fill
              className="object-cover"
            />
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

        {/* Profile details */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">zack</h1>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>@u453162462</span>
            <span>•</span>
            <span className="flex items-center">
              Available
              <svg
                className="ml-1 h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 9L12 15L18 9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
          <p className="pt-2">keep it simple</p>
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

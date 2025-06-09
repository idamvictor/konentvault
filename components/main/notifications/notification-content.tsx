"use client";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

type NotificationType =
  | "All"
  | "Comments"
  | "Mentions"
  | "Subscriptions"
  | "Promotions"
  | "Tags";

const NOTIFICATIONS_DATA = {
  notifications: [
    {
      id: "1",
      user: {
        name: "Sky Bri",
        username: "@skybri",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
        verified: true,
      },
      type: "Lists",
      subtype: "New girl",
      isCheckItOut: true,
      additionalText:
        "$4 FOR THE NEXT 10 SUBS ⭐️ DM me #MYWIFEY when you come back and I will send you a FREE BUNDLE 💘",
      timestamp: "May 31",
    },
    {
      id: "2",
      user: {
        name: "trippie bri",
        username: "@trippie_bri",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
        verified: true,
      },
      type: "Add to favorites",
      isCheckItOut: true,
      additionalText:
        "IM WAITING FOR YOU 😘 I'll probably overshare, send you stuff I shouldn't, and lowkey tease you until you can't focus, but that's kinda the point, isn't it? 😈",
      timestamp: "May 29",
    },
    {
      id: "3",
      user: {
        name: "Catherain",
        username: "@catherain",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        verified: true,
      },
      type: "Add to favorites",
      hasLiveStream: true,
      timestamp: "May 26",
    },
  ],
};

export default function NotificationContent() {
  const [activeTab, setActiveTab] = useState<NotificationType>("All");

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-10 flex items-center justify-between bg-background/80 backdrop-blur-sm border-b px-4 py-3">
        <h1 className="text-xl font-semibold">NOTIFICATIONS</h1>
        <div className="flex gap-2">
          <button>
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          <button>
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1 overflow-x-auto border-b px-4 py-2 bg-background">
        {(
          [
            "All",
            "Comments",
            "Mentions",
            "Subscriptions",
            "Promotions",
            "Tags",
          ] as const
        ).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-4 py-1 text-sm whitespace-nowrap rounded-full transition-colors",
              activeTab === tab
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            )}
          >
            {tab}
          </button>
        ))}
        <button className="ml-auto">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 14c-1.66 0-3 1.34-3 3 0 1.31-1.16 2-2 2 .92 1.22 2.49 2 4 2 2.21 0 4-1.79 4-4 0-1.66-1.34-3-3-3zm13.71-9.37l-1.34-1.34a.996.996 0 0 0-1.41 0L9 12.25 11.75 15l8.96-8.96a.996.996 0 0 0 0-1.41z" />
          </svg>
        </button>
      </div>

      {/* Notifications Feed */}
      <div className="divide-y divide-border">
        {NOTIFICATIONS_DATA.notifications.map((notification) => (
          <div
            key={notification.id}
            className="p-4 flex gap-3 hover:bg-muted/50 cursor-pointer transition-colors"
          >
            <Avatar className="h-12 w-12 rounded-full overflow-hidden">
              <Image
                src={notification.user.avatar}
                alt={notification.user.name}
                width={48}
                height={48}
                className="object-cover"
              />
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1 flex-wrap">
                <span className="font-semibold">{notification.user.name}</span>
                {notification.user.verified && (
                  <svg
                    className="w-4 h-4 text-blue-500 flex-shrink-0"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                )}
                <span className="text-muted-foreground">
                  {notification.user.username}
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-xs px-2 py-0.5 rounded-full border">
                    {notification.type}
                  </span>
                  {notification.subtype && (
                    <span className="text-muted-foreground text-sm">
                      • {notification.subtype}
                    </span>
                  )}
                </div>
              </div>
              {notification.isCheckItOut && (
                <p className="mt-1 text-sm">
                  is currently running a promotion,{" "}
                  <span className="text-blue-500">check it out</span>
                </p>
              )}
              {notification.hasLiveStream && (
                <p className="mt-1 text-sm">
                  has started a new{" "}
                  <span className="text-blue-500">live stream</span>
                </p>
              )}
              {notification.additionalText && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {notification.additionalText}
                </p>
              )}
              <p className="mt-2 text-xs text-muted-foreground">
                {notification.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

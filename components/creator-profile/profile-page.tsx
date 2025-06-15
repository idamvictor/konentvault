"use client";

import { useState } from "react";
import { ProfileBio } from "./profile/profile-bio";
import { ProfileHeader } from "./profile/profile.header";
import { SubscriptionSection } from "./subscription/subscription-section";
import { ContentStats } from "./content/content-stats";
import { ContentFilters } from "./content/content-filters";
import { PostsFeed } from "./content/posts-feed";
import { ContentGrid } from "./content/content-grid";
import { SubscriptionSidebar } from "./sidebar/subscription-sidebar";

// Mock data for demonstration
const profileData = {
  valery: {
    coverImage:
      "https://res.cloudinary.com/dyp8gtllq/image/upload/v1739222257/For_20banner_cr9sav.jpg",
    avatar: "/placeholder.svg?height=64&width=64",
    name: "valery anastassya VIP",
    handle: "babyxvalvip",
    lastSeen: "Seen Jun 11",
    bio: "🔞 ENJOY ALL MY UNCENSORED CONTENT 🔞",
    features: ["NO PPV NO ADS"],
    stats: { posts: 141, media: 142, likes: 4100 },
    contentStats: { posts: 273, media: 283 },
    monthlyPrice: "10",
    bundles: [
      { duration: "3 MONTHS", discount: "(5% off)", price: "28.50" },
      { duration: "6 MONTHS", discount: "(20% off)", price: "48" },
      { duration: "12 MONTHS", discount: "(50% off)", price: "60" },
    ],
  },
  blackcheese: {
    coverImage:
      "https://res.cloudinary.com/dyp8gtllq/image/upload/v1739222257/For_20banner_cr9sav.jpg",
    avatar: "/placeholder.svg?height=64&width=64",
    name: "Blackcheese",
    handle: "blackcheesevibes",
    lastSeen: "Seen Yesterday",
    bio: "Freaky fun entertainment wit thick chocolate drops",
    features: [], // Added features array
    stats: { posts: 36, media: 28, likes: 462 },
    contentStats: { posts: 62, media: 64 },
    monthlyPrice: "25",
  },
};

const mockPosts = [
  {
    id: "post-1",
    author: {
      name: "Blackcheese",
      handle: "blackcheesevibes",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    timestamp: "Jun 4",
    locked: true,
    likes: 3,
  },
  {
    id: "post-2",
    author: {
      name: "Blackcheese",
      handle: "blackcheesevibes",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    timestamp: "May 31",
    content: "Can I ride it 😘",
    locked: true,
    likes: 0,
  },
];

const contentItems = Array.from({ length: 6 }, (_, i) => ({
  id: `item-${i}`,
  type: Math.random() > 0.5 ? "image" : "video",
  locked: true,
  duration: Math.random() > 0.5 ? "0:59" : undefined,
})) as ContentItem[];

type ContentItem = {
  id: string;
  type: "image" | "video";
  locked: boolean;
  duration?: string;
};

export default function ProfilePage({
  params: { username },
}: {
  params: { username: string };
}) {
  const [activeTab, setActiveTab] = useState<"posts" | "media">("posts");
  const [activeFilter, setActiveFilter] = useState("All");

  // Use username to get profile data, fallback to blackcheese if not found
  const profile =
    profileData[username as keyof typeof profileData] ||
    profileData.blackcheese;

  const postsFilters = [
    { label: "All", count: 62, active: activeFilter === "All" },
    {
      label: "Blackcheesevibes",
      count: 1,
      active: activeFilter === "Blackcheesevibes",
    },
  ];

  const mediaFilters = [
    { label: "All", count: 64, active: activeFilter === "All" },
    { label: "Photo", count: 36, active: activeFilter === "Photo" },
    { label: "Video", count: 28, active: activeFilter === "Video" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="flex-1 max-w-2xl border border-l-border bg-white">
        <ProfileHeader
          coverImage={profile.coverImage}
          avatar={profile.avatar}
          name={profile.name}
          handle={profile.handle}
          lastSeen={profile.lastSeen}
          stats={profile.stats}
        />

        <ProfileBio bio={profile.bio} features={profile.features} />

        <SubscriptionSection
          monthlyPrice={profile.monthlyPrice}
          bundles={profileData.valery.bundles}
        />

        <ContentStats
          posts={profile.contentStats.posts}
          media={profile.contentStats.media}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <ContentFilters
          filters={activeTab === "posts" ? postsFilters : mediaFilters}
          onFilterChange={setActiveFilter}
          activeTab={activeTab}
        />

        {activeTab === "posts" ? (
          <PostsFeed posts={mockPosts} />
        ) : (
          <ContentGrid items={contentItems} />
        )}
      </div>

      <SubscriptionSidebar price={profile.monthlyPrice} />
    </div>
  );
}

"use client";

interface ProfileTabsProps {
  activeTab: "posts" | "media";
  setActiveTab: (tab: "posts" | "media") => void;
}

export default function ProfileTabs({
  activeTab,
  setActiveTab,
}: ProfileTabsProps) {
  return (
    <div className="border-b border-border">
      <div className="flex">
        <button
          className={`flex-1 py-3 text-center font-medium ${
            activeTab === "posts"
              ? "border-b-2 border-foreground"
              : "text-muted-foreground"
          }`}
          onClick={() => setActiveTab("posts")}
        >
          NO POSTS
        </button>
        <button
          className={`flex-1 py-3 text-center font-medium ${
            activeTab === "media"
              ? "border-b-2 border-foreground"
              : "text-muted-foreground"
          }`}
          onClick={() => setActiveTab("media")}
        >
          NO MEDIA
        </button>
      </div>
    </div>
  );
}

"use client";

interface ContentStatsProps {
  posts: number;
  media: number;
  activeTab: "posts" | "media";
  onTabChange: (tab: "posts" | "media") => void;
}

export function ContentStats({
  posts,
  media,
  activeTab,
  onTabChange,
}: ContentStatsProps) {
  return (
    <div className="flex border-b border-gray-200 bg-white">
      <button
        onClick={() => onTabChange("posts")}
        className={`flex-1 text-center py-4 ${
          activeTab === "posts" ? "border-b-2 border-primary" : ""
        }`}
      >
        <div className="font-bold text-lg">{posts}</div>
        <div className="text-gray-500 text-sm">POSTS</div>
      </button>
      <button
        onClick={() => onTabChange("media")}
        className={`flex-1 text-center py-4 ${
          activeTab === "media" ? "border-b-2 border-primary" : ""
        }`}
      >
        <div className="font-bold text-lg">{media}</div>
        <div className="text-gray-500 text-sm">MEDIA</div>
      </button>
    </div>
  );
}

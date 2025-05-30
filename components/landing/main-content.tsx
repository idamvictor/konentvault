import PostCard from "@/components/landing/post-card";
import { Card, CardContent } from "@/components/ui/card";
import { getLandingPostsData } from "@/lib/landing/getLandingPostData";
import { Badge } from "../ui/badge";

export default async function MainContent() {
  const data = await getLandingPostsData();

  return (
    <div className="p-4 space-y-4 bg-gray-50 min-h-screen">
      {/* Feed Header */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">OnlyFans</h2>
              <p className="text-sm text-gray-500">@onlyfans</p>
            </div>
            <Badge variant="secondary" className="bg-blue-50 text-blue-600">
              Featuring videos by OnlyFans Creators
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Posts Feed */}
      <div className="space-y-4" role="feed" aria-label="Social media posts">
        {data.posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {/* Load More */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4 text-center">
          <p className="text-sm text-gray-500">
            You&apos;ve reached the end of the feed
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

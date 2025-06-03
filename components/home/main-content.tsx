import PostCard from "@/components/home/post-card";
import { Card, CardContent } from "@/components/ui/card";
import { getHomeFeeds } from "@/services/getHomeFeeds";
import { MakePost } from "./make-post";

export default async function MainContent() {
  const data = await getHomeFeeds();

  return (
    <div className="px-4 space-y-4 bg-muted min-h-screen">
      <div className="sticky top-0 z-10 -mx-4 px-4 py-3 bg-background/80 backdrop-blur-sm border-b">
        <h1 className="text-2xl text-foreground">Home</h1>
      </div>

      {/* Make Post */}
      <MakePost />

      {/* Posts Feed */}
      <div className="space-y-4" role="feed" aria-label="Social media posts">
        {data.posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {/* Load More */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4 text-center">
          <p className="text-sm text-muted-foreground">
            You&apos;ve reached the end of the feed
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

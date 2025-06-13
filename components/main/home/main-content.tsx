import PostCard from "@/components/main/home/post-card";
import { Card, CardContent } from "@/components/ui/card";
import { MakePost } from "./make-post";
import { useGetAllPost } from "@/services/post/get-all-post";

export default function MainContent() {
  const { data: posts, isLoading, isError } = useGetAllPost();

  return (
    <div className="px-4 space-y-4 bg-muted min-h-screen">
      <div className="sticky top-0 z-10 -mx-4 px-4 py-3 bg-background/80 backdrop-blur-sm border-b">
        <h1 className="text-2xl text-foreground">Home</h1>
      </div>

      {/* Make Post */}
      <MakePost />

      {/* Posts Feed */}
      <div className="space-y-4" role="feed" aria-label="Social media posts">
        {isLoading && <p>Loading...</p>}
        {isError && <p>Failed to load posts.</p>}
        {posts && posts.length === 0 && <p>No posts found.</p>}
        {posts && posts.map((post) => <PostCard key={post.id} post={post} />)}
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

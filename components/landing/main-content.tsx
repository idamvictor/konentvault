import PostCard from "@/components/landing/post-card";
import { getLandingPostsData } from "@/lib/landing/getLandingPostData";

export default async function MainContent() {
  const data = await getLandingPostsData();

  return (
    <div className="p-4 space-y-6">
      <header className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Feed</h2>
        <p className="text-gray-600">
          Discover amazing content from creators you follow
        </p>
      </header>

      <div className="space-y-6" role="feed" aria-label="Social media posts">
        {data.posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

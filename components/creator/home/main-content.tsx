import { CreatePostForm } from "./right-panel/new/create-post-form";
import { PostsFeed } from "./right-panel/new/post-feed";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-8">
          <CreatePostForm />
          <PostsFeed />
        </div>
      </div>
    </div>
  );
}

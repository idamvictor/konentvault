import { CreatePostForm } from "./right-panel/new/create-post-form";
import { PostsFeed } from "./right-panel/new/post-feed";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Social Media Dashboard
          </h1>
          <p className="text-gray-600">
            Create, manage, and engage with your posts
          </p>
        </div>

        <div className="space-y-8">
          <CreatePostForm />
          <PostsFeed />
        </div>
      </div>
    </div>
  );
}

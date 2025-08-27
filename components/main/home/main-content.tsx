import { CreatePostForm } from "./main-content/create-post-form";
import { PostsFeed } from "./main-content/post-feed";

export default function MainContent() {
  return (
    <div className="px-4 space-y-4 bg-muted min-h-screen">
      <div className="sticky top-0 z-10 -mx-4 px-4 py-3 bg-background/80 backdrop-blur-sm border-b">
        <h1 className="text-2xl text-foreground">Homeee</h1>
      </div>

      <div className="space-y-8">
        <CreatePostForm />
        <PostsFeed />
      </div>
    </div>
  );
}

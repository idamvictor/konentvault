import PostCard from "@/components/creator/home/post-card";
import { Card, CardContent } from "@/components/ui/card";
import { MakePost } from "./make-post";

const POSTS_DATA = {
  posts: [
    {
      id: "1",
      author: {
        name: "Sarah Johnson",
        username: "@sarahj",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
        verified: true,
      },
      content:
        "Just launched my new photography portfolio! Check out my latest urban landscape series - a deep dive into city architecture and its impact on modern life. 📸 #Photography #UrbanArt",
      image:
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop",
      timestamp: "1 hour ago",
      likes: 231,
      comments: 45,
      shares: 12,
      mediaCount: 1,
    },
    {
      id: "2",
      author: {
        name: "Alex Chen",
        username: "@alexc_tech",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        verified: true,
      },
      content:
        "Just released a new open-source project! A lightweight framework for building responsive web apps. Star it on GitHub if you find it useful! 🚀 #coding #opensource",
      image:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop",
      timestamp: "3 hours ago",
      likes: 892,
      comments: 124,
      shares: 56,
      mediaCount: 2,
    },
    {
      id: "3",
      author: {
        name: "Maria Garcia",
        username: "@m_garcia",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
        verified: false,
      },
      content:
        "Spent the weekend exploring local coffee shops and discovering hidden gems in the city. Found this amazing spot with the best cold brew I've ever had! ☕️ #CoffeeLover #LocalFinds",
      image:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop",
      timestamp: "5 hours ago",
      likes: 156,
      comments: 28,
      shares: 4,
      mediaCount: 1,
    },
  ],
};

export default function MainContent() {
  return (
    <div className="px-4 space-y-4 bg-muted min-h-screen">
      <div className="sticky top-0 z-10 -mx-4 px-4 py-3 bg-background/80 backdrop-blur-sm border-b">
        <h1 className="text-2xl text-foreground">Home</h1>
      </div>

      {/* Make Post */}
      <MakePost />

      {/* Posts Feed */}
      <div className="space-y-4" role="feed" aria-label="Social media posts">
        {POSTS_DATA.posts.map((post) => (
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

import { PostCard } from "./post-card";

interface Post {
  id: string;
  author: {
    name: string;
    handle: string;
    avatar: string;
    verified?: boolean;
  };
  timestamp: string;
  content?: string;
  locked: boolean;
  likes: number;
  comments?: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
}

interface PostsFeedProps {
  posts: Post[];
}

export function PostsFeed({ posts }: PostsFeedProps) {
  return (
    <div className="bg-white">
      {posts.map((post) => (
        <PostCard key={post.id} {...post} />
      ))}
    </div>
  );
}

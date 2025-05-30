import Image from "next/image";
import {
  Heart,
  MessageCircle,
  Share,
  MoreHorizontal,
  CheckCircle,
} from "lucide-react";

interface Author {
  name: string;
  username: string;
  avatar: string;
  verified: boolean;
}

interface Post {
  id: string;
  author: Author;
  content: string;
  image: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
}

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Post Header */}
      <header className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Image
            src={post.author.avatar || "/placeholder.svg"}
            alt={`${post.author.name}'s profile picture`}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <div className="flex items-center space-x-1">
              <h3 className="font-semibold text-gray-900">
                {post.author.name}
              </h3>
              {post.author.verified && (
                <CheckCircle
                  className="w-4 h-4 text-blue-500"
                  aria-label="Verified account"
                />
              )}
            </div>
            <p className="text-sm text-gray-500">{post.author.username}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">{post.timestamp}</span>
          <button
            className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
            aria-label="More options"
          >
            <MoreHorizontal className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </header>

      {/* Post Content */}
      <div className="px-4 pb-4">
        <p className="text-gray-900 mb-4 leading-relaxed">{post.content}</p>

        {post.image && (
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <Image
              src={post.image || "/placeholder.svg"}
              alt="Post content"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
      </div>

      {/* Post Actions */}
      <footer className="px-4 py-3 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <button
              className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors duration-200"
              aria-label={`Like post, ${post.likes} likes`}
            >
              <Heart className="w-5 h-5" />
              <span className="text-sm font-medium">{post.likes}</span>
            </button>

            <button
              className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors duration-200"
              aria-label={`Comment on post, ${post.comments} comments`}
            >
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm font-medium">{post.comments}</span>
            </button>

            <button
              className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors duration-200"
              aria-label={`Share post, ${post.shares} shares`}
            >
              <Share className="w-5 h-5" />
              <span className="text-sm font-medium">{post.shares}</span>
            </button>
          </div>
        </div>
      </footer>
    </article>
  );
}

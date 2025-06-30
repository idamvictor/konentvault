"use client";

import { usePosts } from "@/hooks/use-posts";
import { PostCard } from "./post-card";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, FileText } from "lucide-react";

export function PostsFeed() {
  const { data, isLoading, error } = usePosts();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Failed to load posts</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const posts = data?.posts || [];

  if (posts.length === 0) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No posts yet</p>
            <p className="text-sm text-gray-500 mt-2">
              Create your first post to get started!
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post: post) => (
        <PostCard key={post.id} post={post} currentUserId={1} />
      ))}
    </div>
  );
}

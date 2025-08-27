"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  useCreateReaction,
  useUpdateReaction,
  useDeleteReaction,
} from "@/hooks/use-reactions";
import { type Reaction, getImageUrl } from "@/lib/api";
import { Send, X, ImageIcon, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDistanceToNow } from "date-fns";

interface CommentSectionProps {
  postId: number;
  reactions: Reaction[];
  currentUserId?: number;
}

export function CommentSection({
  postId,
  reactions,
  currentUserId = 1,
}: CommentSectionProps) {
  const [commentText, setCommentText] = useState("");
  const [editingComment, setEditingComment] = useState<number | null>(null);
  const [editText, setEditText] = useState("");
  const [commentImage, setCommentImage] = useState<File | null>(null);
  const [commentImagePreview, setCommentImagePreview] = useState<string | null>(
    null
  );

  const createReaction = useCreateReaction();
  const updateReaction = useUpdateReaction();
  const deleteReaction = useDeleteReaction();

  const comments = reactions.filter((r) => r.type === "comment");

  const handleCommentImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCommentImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setCommentImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeCommentImage = () => {
    setCommentImage(null);
    setCommentImagePreview(null);
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    createReaction.mutate({
      type: "comment",
      postId,
      text: commentText,
      media: commentImage ? `uploads/media/${commentImage.name}` : undefined,
    });

    setCommentText("");
    setCommentImage(null);
    setCommentImagePreview(null);
  };

  const handleEditComment = (comment: Reaction) => {
    setEditingComment(comment.id);
    const parsedContent = parseCommentContent(comment.content);
    setEditText(parsedContent);
  };

  const handleUpdateComment = (commentId: number) => {
    if (!editText.trim()) return;

    updateReaction.mutate({
      id: commentId,
      data: {
        type: "comment",
        text: editText,
      },
    });

    setEditingComment(null);
    setEditText("");
  };

  const handleDeleteComment = (commentId: number) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      deleteReaction.mutate(commentId);
    }
  };

  const parseCommentContent = (content: string) => {
    try {
      const parsed = JSON.parse(content);
      return parsed.text || content;
    } catch {
      return content;
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmitComment} className="space-y-3">
        <div className="flex gap-2">
          <Textarea
            placeholder="Write a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="flex-1 min-h-[80px] resize-none"
          />
          <div className="flex flex-col gap-2">
            <input
              type="file"
              accept="image/*"
              onChange={handleCommentImageSelect}
              className="hidden"
              id="comment-image-upload"
            />
            <label
              htmlFor="comment-image-upload"
              className="cursor-pointer p-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center justify-center"
            >
              <ImageIcon className="w-4 h-4 text-gray-500" />
            </label>
            <Button
              type="submit"
              size="sm"
              disabled={!commentText.trim() || createReaction.isPending}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {commentImagePreview && (
          <div className="relative inline-block">
            <Image
              src={commentImagePreview || "/placeholder.svg"}
              alt="Comment preview"
              width={80}
              height={80}
              className="h-20 w-20 object-cover rounded-lg"
            />
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={removeCommentImage}
              className="absolute -top-2 -right-2 h-6 w-6 p-0 bg-red-500 hover:bg-red-600 text-white rounded-full"
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        )}
      </form>

      <div className="space-y-3">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="flex gap-3 p-3 bg-gray-50 rounded-lg group"
          >
            <Avatar className="w-8 h-8">
              <AvatarImage
                src={
                  comment.user.profilePicture
                    ? getImageUrl(comment.user.profilePicture)
                    : undefined
                }
                alt={comment.user.name}
              />
              <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
                {comment.user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-sm">{comment.user.name}</span>
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(comment.createdAt), {
                    addSuffix: true,
                  })}
                </span>
                {comment.userId === currentUserId && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <MoreHorizontal className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => handleEditComment(comment)}
                      >
                        <Edit className="mr-2 h-3 w-3" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteComment(comment.id)}
                        className="text-red-600 focus:text-red-600"
                      >
                        <Trash2 className="mr-2 h-3 w-3" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>

              {editingComment === comment.id ? (
                <div className="space-y-2">
                  <Textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="text-sm min-h-[60px] resize-none"
                  />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleUpdateComment(comment.id)}
                      disabled={!editText.trim() || updateReaction.isPending}
                      className="h-7 text-xs"
                    >
                      {updateReaction.isPending ? "Saving..." : "Save"}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditingComment(null);
                        setEditText("");
                      }}
                      className="h-7 text-xs"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-700">
                  {parseCommentContent(comment.content)}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

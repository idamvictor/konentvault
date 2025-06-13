import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Post } from "@/types/post-types";

export interface Comment {
  type: "comment";
  text: string;
  media: "image" | "video" | "text";
  postId: number;
}

export const useAddComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newComment: Comment) => {
      const response = await axiosInstance.post(`/reaction`, newComment);
      return response.data.reaction.postId as string;
    },
    onSuccess: (_, variables) => {
      // Invalidate both the specific post and the posts list queries
      queryClient.invalidateQueries({
        queryKey: ["post", variables.postId],
      });
      queryClient.invalidateQueries({
        queryKey: ["posts"], // This will refresh the main feed
      });

      // Optimistically update the post's comment count
      const postKey = ["post", variables.postId];
      queryClient.setQueryData<Post>(postKey, (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          reactions: [
            ...(oldData.reactions || []),
            {
              id: Math.random(), // temporary ID for optimistic update
              userId: -1, // temporary userId for optimistic update
              postId: variables.postId,
              content: variables.text,
              type: "comment",
            },
          ],
        };
      });
    },
    onError: (error) => {
      let message = "Failed to create comment";
      if (error instanceof AxiosError) {
        message = error.response?.data?.error || error.message;
      }
      console.error(message);
    },
  });
};

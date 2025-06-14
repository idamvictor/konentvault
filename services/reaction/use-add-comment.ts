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
      return response.data.reaction;
    },
    onSuccess: (data, variables) => {
      // Invalidate the specific post's reactions
      queryClient.invalidateQueries({
        queryKey: ["post-reactions", variables.postId.toString()],
      });

      // Invalidate the general posts list
      queryClient.invalidateQueries({
        queryKey: ["posts"],
        exact: true,
      });

      // Invalidate any post-specific queries
      queryClient.invalidateQueries({
        queryKey: ["post", variables.postId.toString()],
      });

      // Optimistically update the post's comment count
      const postKey = ["post", variables.postId.toString()];
      queryClient.setQueryData<Post>(postKey, (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          reactions: [
            ...(oldData.reactions || []),
            {
              ...data, // Use the actual returned reaction data
              type: "comment",
              content: variables.text,
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

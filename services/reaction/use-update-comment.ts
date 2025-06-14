import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export interface UpdateCommentPayload {
  text: string;
  file: string;
}

interface UpdateComment {
  commentData: UpdateCommentPayload;
  commentId: string;
  postId: string;
}

export const useUpdateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ commentData, commentId }: UpdateComment) => {
      const response = await axiosInstance.put(`/reaction/${commentId}`, {
        text: commentData.text,
        file: commentData.file,
      });
      return response.data.reaction;
    },
    onSuccess: (_data, variables) => {
      // Invalidate the post's reactions query to refresh the comments
      queryClient.invalidateQueries({
        queryKey: ["post-reactions", variables.postId],
      });
    },
    onError: (error) => {
      let message = "Failed to update comment";
      if (error instanceof AxiosError) {
        message = error.response?.data?.error || error.message;
      }
      console.error(message);
    },
  });
};

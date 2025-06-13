import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

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
    onSuccess: (_data, postId) => {
      // Invalidate the post's comments or the post itself if needed
      queryClient.invalidateQueries({
        queryKey: ["post", postId],
      });
    },
    onError: (error) => {
      let message = "Failed to create post";
      if (error instanceof AxiosError) {
        message = error.response?.data?.error || error.message;
      }
      // Handle error here (e.g., show a toast or log)
      console.error(message);
    },
  });
};

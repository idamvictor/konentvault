import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export interface LikePostData {
  type: "like";
  postId: number;
}

export const useLikePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (likeValue: LikePostData) => {
      const response = await axiosInstance.post(`/reaction`, likeValue);
      return response.data.reaction;
    },
    onSuccess: (_data, { postId }) => {
      // Invalidate the specific post's reactions
      queryClient.invalidateQueries({
        queryKey: ["post-reactions", postId.toString()],
      });

      // Invalidate the general posts list
      queryClient.invalidateQueries({
        queryKey: ["posts"],
        exact: true,
      });

      // Invalidate any post-specific queries
      queryClient.invalidateQueries({
        queryKey: ["post", postId.toString()],
      });
    },
    onError: (error) => {
      let message = "Failed to like post";
      if (error instanceof AxiosError) {
        message = error.response?.data?.error || error.message;
      }
      // Handle error here (e.g., show a toast or log)
      console.error(message);
    },
  });
};

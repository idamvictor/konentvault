import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export interface ShareData {
  type: "share";
  text: string;
  postId: number;
}

export const useSharePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newShareData: ShareData) => {
      const response = await axiosInstance.post(`/reaction`, newShareData);
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

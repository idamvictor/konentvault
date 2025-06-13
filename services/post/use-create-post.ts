import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export interface CreatePostData {
  content: string;
  media?: string;
  type: "text" | "image" | "video";
  price?: number;
  payType: "free" | "ppv" | "subscription";
}

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newPost: CreatePostData) =>
      axiosInstance.post("/post", newPost),
    onSuccess: () => {
      // Handle success here (e.g., show a toast or log)
      queryClient.invalidateQueries({ queryKey: ["posts"] });
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

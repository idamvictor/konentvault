import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface CreatePostData {
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
      // Invalidate and refetch queries after mutation
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

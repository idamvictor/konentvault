import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newPost) =>
      axiosInstance.post("/api/posts", {
        newPost,
      }),
    onSuccess: () => {
      // Invalidate and refetch queries after mutation
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

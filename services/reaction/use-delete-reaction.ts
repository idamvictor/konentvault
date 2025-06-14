import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Post } from "@/types/post-types";

const deleteReaction = async (id: string) => {
  try {
    await axiosInstance.delete(`/reaction/${id}`);
  } catch (error) {
    const newError =
      error instanceof AxiosError
        ? error.response?.data?.error
        : "failed to fetch posts";
    throw new Error(newError);
  }
};

export const useDeleteReaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteReaction(id),
    onSuccess: (_data, id) => {
      // Get the post ID from the cache to invalidate specific queries
      const postId = queryClient
        .getQueryData<Post[]>(["posts"])
        ?.find((post: Post) =>
          post.reactions?.some((r) => r.id.toString() === id)
        )?.id;

      // Invalidate specific post reactions if we found the post
      if (postId) {
        queryClient.invalidateQueries({
          queryKey: ["post", postId.toString()],
        });
      }

      // Invalidate the general posts list
      queryClient.invalidateQueries({
        queryKey: ["posts"],
        exact: true,
      });

      // Invalidate any post-reactions queries
      queryClient.invalidateQueries({
        queryKey: ["post-reactions", postId?.toString()],
        exact: false,
      });
    },
    onError: (error) => {
      // Handle error here (e.g., show a toast or log)
      console.error("Failed to delete reaction:", error);
    },
  });
};

import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

const deletePost = async (id: string) => {
  try {
    await axiosInstance.delete(`/post/${id}`);
  } catch (error) {
    const newError =
      error instanceof AxiosError
        ? error.response?.data?.error
        : "failed to fetch posts";
    throw new Error(newError);
  }
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deletePost(id),
    onSuccess: () => {
      // Handle success here (e.g., show a toast or log)
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      // Handle error here (e.g., show a toast or log)
      console.error("Failed to delete post:", error);
    },
  });
};

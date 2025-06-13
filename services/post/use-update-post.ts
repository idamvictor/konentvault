import axiosInstance from "@/lib/axios";
import { UpdatePostData } from "@/types/post-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface UpdatePost {
  id: string;
  editedPost: UpdatePostData;
}

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ editedPost, id }: UpdatePost) =>
      axiosInstance.put(`/post/${id}`, editedPost),
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

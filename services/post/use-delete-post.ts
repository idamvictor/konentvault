import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeletePost = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => await axiosInstance.delete(`/post/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

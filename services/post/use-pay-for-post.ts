import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const usePayForPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstance.post(`post/pay/${id}`);
      return response.data as string;
    },
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: ["post", id] });
    },
    onError: (error) => {
      const message =
        error instanceof AxiosError
          ? error.response?.data?.error ||
            "Could not process payment, try again later"
          : "Could not process payment, try again later";
      console.log(message);
    },
  });
};

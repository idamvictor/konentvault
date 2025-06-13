import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useToggleSubPlanStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await axiosInstance.patch(
        `/subscription-plans/status/${id}/toggle`
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscription-plans"] });
    },
    onError: (error) => {
      let message = "Failed to change subscription plan status";
      if (error instanceof AxiosError) {
        message = error.response?.data?.error || error.message;
      }
      throw new Error(message);
    },
  });
};

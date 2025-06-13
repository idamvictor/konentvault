import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useDeleteSubPlan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (planId: number) => {
      const response = await axiosInstance.delete(
        `/subscription-plans/delete/${planId}`
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscription-plans"] });
    },
    onError: (error) => {
      let message = "Failed to delete subscription plan";
      if (error instanceof AxiosError) {
        message = error.response?.data?.error || error.message;
      }
      // Handle error here (e.g., show a toast or log)
      console.error(message);
    },
  });
};

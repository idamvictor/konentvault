import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export interface CreateSubPlanPayload {
  price: number;
  type: string; // e.g., "monthly" | "yearly" | "quarterly"
}

export const useCreateSubPlan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateSubPlanPayload) => {
      const response = await axiosInstance.post(
        "/subscription-plans/create",
        payload
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscription-plans"] });
    },
    onError: (error) => {
      let message = "Failed to create subscription plan";
      if (error instanceof AxiosError) {
        message = error.response?.data?.error || error.message;
      }
      // Handle error here (e.g., show a toast or log)
      console.error(message);
    },
  });
};

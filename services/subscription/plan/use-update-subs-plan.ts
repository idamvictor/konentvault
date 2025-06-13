import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export interface UpdateSubPlanPayload {
  price: number;
  type: string; // e.g.,"30" = "monthly" | "90" = "quarterly" | "360" = "yearly"
}

interface UpdateSubPlan {
  planId: string;
  updateData: UpdateSubPlanPayload;
}

export const useUpdateSubPlan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ planId, updateData }: UpdateSubPlan) => {
      const res = await axiosInstance.put(
        `/subscription-plans/update/${planId}`,
        updateData
      );
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscription-plans"] });
    },
    onError: (error) => {
      let message = "Failed to update subscription plan";
      if (error instanceof AxiosError) {
        message = error.response?.data?.error || error.message;
      }
      // Handle error here (e.g., show a toast or log)
      console.error(message);
    },
  });
};

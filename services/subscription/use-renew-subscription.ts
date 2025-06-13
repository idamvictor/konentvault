import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export interface RenewSubsPayload {
  creatorId: number;
  subscriptionPlanId: number; // optional
}

export const useRenewSubscription = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (renewPayload: RenewSubsPayload) =>
      await axiosInstance.post("/subscription/renew", renewPayload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-subscriptions"] });
    },
    onError: (error) => {
      let message = "Failed to renew subscription";
      if (error instanceof AxiosError) {
        message = error.response?.data?.error || error.message;
      }
      // Handle error here (e.g., show a toast or log)
      console.error(message);
    },
  });
};

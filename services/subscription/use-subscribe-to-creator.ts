// subscription/subscribe

import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export interface SubscribeToCreator {
  creatorId: number;
  subscriptionPlanId: number;
}

export const useSubscribeToUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: SubscribeToCreator) => {
      const res = await axiosInstance.post("subscription/subscribe", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      let message = "Failed to cancel subscription";
      if (error instanceof AxiosError) {
        message = error.response?.data?.error || error.message;
      }
      // Handle error here (e.g., show a toast or log)
      console.error(message);
    },
  });
};

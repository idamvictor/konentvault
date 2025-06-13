import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface changeAutoRenewProp {
  success: boolean;
  message: string;
}

export const useChangeAutoRenewStatus = () => {
  const queryClient = useQueryClient();
  return useMutation<changeAutoRenewProp, unknown, number>({
    mutationFn: async (creatorId: number) => {
      const response = await axiosInstance.post("/subscription/auto-renew", {
        creatorId,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-subscriptions"] });
    },
    onError: (error) => {
      let message = "Failed to change auto-renew status";
      if (error instanceof AxiosError) {
        message = error.response?.data?.error || error.message;
      }
      // Handle error here (e.g., show a toast or log)
      console.error(message);
    },
  });
};

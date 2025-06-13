import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface CreatePayoutRequestData {
  start_date: string;
  end_date: string;
  payment_method: string; //eg : "bank"
}

export const useCreatePayoutRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreatePayoutRequestData) => {
      const response = await axiosInstance.post(
        "/payout/create-request",
        payload
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-payout-requests"] });
    },
    onError: (error) => {
      let message = "Failed to create payout request";
      if (error instanceof AxiosError) {
        message = error.response?.data?.error || error.message;
      }
      // Handle error here (e.g., show a toast or log)
      console.error(message);
    },
  });
};

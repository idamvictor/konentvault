import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export interface UpdatePayoutRequestPayload {
  payoutRequestId: number;
  start_date: string;
  end_date: string;
  payment_method: string; // eg: "bank"
}

export const useUpdatePayoutRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: UpdatePayoutRequestPayload) => {
      const { payoutRequestId } = payload;
      const response = await axiosInstance.put(
        `/payout/update-request/${payoutRequestId}`,
        payload
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-payout-requests"] });
    },
    onError: (error) => {
      let message = "Failed to update payout request.";
      if (error instanceof AxiosError) {
        message = error.response?.data?.error || error.message;
      }
      // Handle error here (e.g., show a toast or log)
      console.error(message);
    },
  });
};

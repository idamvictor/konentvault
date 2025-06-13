import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface PaymentDetails {
  bankName: string;
  "Account No": string;
  Name: string;
}

interface PaymentDetailsResponse {
  paymentDetails: PaymentDetails;
}

export const useSubmitPaymentDetails = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: PaymentDetailsResponse) => {
      const response = await axiosInstance.post(
        "/user/payment-details/submit",
        payload
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-payment-details"] });
    },
    onError: (error) => {
      let message = "Failed to submit payment details";
      if (error instanceof AxiosError) {
        message = error.response?.data?.error || error.message;
      }
      // Handle error here (e.g., show a toast or log)
      console.error(message);
    },
  });
};

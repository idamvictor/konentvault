import axiosInstance from "@/lib/axios";
import { PayoutRequestResponse } from "@/types/creators";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const getSinglePayoutRequest = async (
  id: number
): Promise<PayoutRequestResponse> => {
  try {
    const res = await axiosInstance.get(`/payout/request//${id}`);
    return res.data?.payoutRequest || [];
  } catch (error) {
    const newError =
      error instanceof AxiosError
        ? error.response?.data?.error || "Failed to fetch payout request"
        : "Failed to fetch payout request";
    throw new Error(newError);
  }
};

export const useGetSinglePayoutRequest = (id: number) => {
  return useQuery<PayoutRequestResponse>({
    queryKey: ["payout-request", id],
    queryFn: () => getSinglePayoutRequest(id),
  });
};

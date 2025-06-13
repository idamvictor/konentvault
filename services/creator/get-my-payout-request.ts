import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const getMyPayoutRequests = async () => {
  try {
    const res = await axiosInstance.get("/payout/my-requests");
    return res.data?.payoutRequests || null;
  } catch (error) {
    const newError =
      error instanceof AxiosError
        ? error.response?.data?.error || "Failed to fetch payout requests"
        : "Failed to fetch payout requests";
    throw new Error(newError);
  }
};

export const useGetMyPayoutRequests = () => {
  return useQuery({
    queryKey: ["my-payout-requests"],
    queryFn: getMyPayoutRequests,
  });
};

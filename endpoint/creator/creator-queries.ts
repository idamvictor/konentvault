import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { EarningsResponse } from "./creator-types";

//==================================== Get my Earnings ========================================//
const getEarnings = async (): Promise<EarningsResponse> => {
  const response = await axiosInstance.get("/user/my/earnings");
  return response.data;
};

export const useEarnings = () => {
  return useQuery<EarningsResponse>({
    queryKey: ["earnings"],
    queryFn: getEarnings,
  });
};

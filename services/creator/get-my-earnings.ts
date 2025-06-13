import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const getMyEarnings = async () => {
  try {
    const res = await axiosInstance.get("/user/my/earnings");
    return res.data || null;
  } catch (error) {
    const newError =
      error instanceof AxiosError
        ? error.response?.data?.error || "Failed to fetch earnings"
        : "Failed to fetch earnings";
    throw new Error(newError);
  }
};

export const useGetMyEarnings = () => {
  return useQuery({
    queryKey: ["my-earnings"],
    queryFn: getMyEarnings,
  });
};

import axiosInstance from "@/lib/axios";
import { Subscriptions } from "@/types/subscription";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const getMySubscriptions = async (): Promise<Subscriptions | null> => {
  try {
    const res = await axiosInstance.get("/subscription/me");
    return res.data || null;
  } catch (error) {
    const newError =
      error instanceof AxiosError
        ? error.response?.data?.error || "failed to fetch subscriptions"
        : "failed to fetch subscriptions";
    throw new Error(newError);
  }
};

export const GetMySubscription = () => {
  return useQuery<Subscriptions | null>({
    queryKey: ["my-subscriptions"],
    queryFn: getMySubscriptions,
  });
};

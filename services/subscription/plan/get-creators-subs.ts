import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface SubscriptionPlan {
  name: string; //e.g. "monthly plan"
  price: number;
  duration: string; //30, 90, 360
}

export const useGetCreatorsSubs = (creatorId: number) => {
  return useQuery<SubscriptionPlan[]>({
    queryKey: ["subscription-plans", creatorId],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get(
          `/subscription-plans/creator/${creatorId}`
        );
        return res.data;
      } catch (error) {
        const newError =
          error instanceof AxiosError
            ? error.response?.data?.error ||
              "Failed to fetch creator's subscription plans"
            : "Failed to fetch creator's subscription plans";
        throw new Error(newError);
      }
    },
  });
};

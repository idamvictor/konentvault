import {
  fetchCreatorSubscriptions,
  fetchMySubscriptions,
} from "@/services/SubscriptionService";
import { MySubscription, SubscriptionPlan } from "@/types/subscription copy";
import { useQuery } from "@tanstack/react-query";

export const useSubscriptionQuery = (id?: number) => {
  return useQuery<SubscriptionPlan[]>({
    queryKey: ["subscription", id],
    queryFn: async () => {
      if (!id) throw new Error("No ID provided");
      return fetchCreatorSubscriptions(id!);
    },
    enabled: !!id, // don't run until id is available
  });
};

export const useFetchMySubscriptions = () => {
  return useQuery<MySubscription[]>({
    queryKey: ["my-subscriptions"],
    queryFn: fetchMySubscriptions,
    refetchInterval: 100000, // Auto-refetch every 10s
  });
};

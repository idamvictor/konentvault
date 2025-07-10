import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { SubscriptionPlansResponse } from "@/types/creator-profile/index";
import apiClient from "@/lib/axios";

export const useSubscriptionPlans = (creatorId: number) => {
  return useQuery({
    queryKey: ["subscription-plans", creatorId],
    queryFn: async () => {
      const response = await apiClient.get<SubscriptionPlansResponse>(
        `/subscription-plans/creator/${creatorId}`
      );
      return response.data;
    },
    enabled: !!creatorId,
  });
};

export const useSubscribe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      creatorId,
      subscriptionPlanId,
    }: {
      creatorId: number;
      subscriptionPlanId: number;
    }) => {
      const response = await apiClient.post("/subscription/subscribe", {
        creatorId,
        subscriptionPlanId,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscription-plans"] });
    },
  });
};

export const usePayForMedia = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (mediaId: number) => {
      const response = await apiClient.post(`/media/pay/${mediaId}`, {});
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["creator-media"] });
      queryClient.invalidateQueries({ queryKey: ["creator-posts"] });
    },
  });
};

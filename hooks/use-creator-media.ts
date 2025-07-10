import { useQuery } from "@tanstack/react-query";
import type { MediaResponse } from "@/types/creator-profile/index";
import apiClient from "@/lib/axios";

export const useCreatorMedia = (creatorId: number) => {
  return useQuery({
    queryKey: ["creator-media", creatorId],
    queryFn: async () => {
      const response = await apiClient.get<MediaResponse>(
        `/media/user/${creatorId}`
      );
      return response.data;
    },
    enabled: !!creatorId,
  });
};

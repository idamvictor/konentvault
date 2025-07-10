import { useQuery } from "@tanstack/react-query";
// import { apiClient as api } from "@/lib/apiClient";
import type { PostsResponse } from "@/types/creator-profile/index";
import apiClient from "@/lib/axios";

export const useCreatorPosts = (creatorId: number) => {
  return useQuery({
    queryKey: ["creator-posts", creatorId],
    queryFn: async () => {
      const response = await apiClient.get<PostsResponse>(`/post/user/${creatorId}`);
      return response.data;
    },
    enabled: !!creatorId,
  });
};

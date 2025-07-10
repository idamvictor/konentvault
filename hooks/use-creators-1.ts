import { useQuery } from "@tanstack/react-query";
// import { api } from "@/lib/api"
import type { CreatorsResponse } from "@/types/creator-profile/index";
import apiClient from "@/lib/apiClient";

export const useCreators = () => {
  return useQuery({
    queryKey: ["creators"],
    queryFn: async () => {
      const response = await apiClient.get<CreatorsResponse>("/creators");
      return response.data;
    },
  });
};

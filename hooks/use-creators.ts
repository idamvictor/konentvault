import { useQuery } from "@tanstack/react-query";
import { creatorsApi } from "@/lib/api";

export const useCreators = () => {
  return useQuery({
    queryKey: ["creators"],
    queryFn: creatorsApi.getAll,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

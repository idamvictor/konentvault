import axiosInstance from "@/lib/axios";
import { ReactionsResponse } from "@/types/post-reactions";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const getPostReactions = async (
  id: string
): Promise<ReactionsResponse | null> => {
  try {
    const res = await axiosInstance.get(`/reaction/post/${id}`);
    return res.data || null;
  } catch (error) {
    const newError =
      error instanceof AxiosError
        ? error.response?.data?.error || "failed to fetch post"
        : "failed to fetch post";
    throw new Error(newError);
  }
};

export const useGetPostReactions = (id: string) => {
  return useQuery<ReactionsResponse | null>({
    queryKey: ["post-reactions", id],
    queryFn: async () => getPostReactions(id),
  });
};

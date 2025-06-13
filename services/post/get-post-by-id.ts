import axiosInstance from "@/lib/axios";
import { Post } from "@/types/post-types";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const GetPostById = async (id: string): Promise<Post | null> => {
  try {
    const res = await axiosInstance.get(`/post/${id}`);
    return res.data?.post || null;
  } catch (error) {
    const newError =
      error instanceof AxiosError
        ? error.response?.data?.error || "failed to fetch post"
        : "failed to fetch post";
    throw new Error(newError);
  }
};

export const useGetPostById = (id: string) => {
  return useQuery<Post | null>({
    queryKey: ["post", id],
    queryFn: async () => GetPostById(id),
  });
};

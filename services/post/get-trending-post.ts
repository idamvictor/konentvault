import axiosInstance from "@/lib/axios";
import { TrendingPostsResponse } from "@/types/trending-post";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const GetTrendingPost = async () => {
  try {
    const posts = await axiosInstance.get("/post/trending");
    return posts.data?.posts || [];
  } catch (error) {
    const newError =
      error instanceof AxiosError
        ? error.response?.data?.error
        : "failed to fetch posts";
    throw new Error(newError);
  }
};

export const useGetTrendingPost = () => {
  return useQuery<TrendingPostsResponse>({
    queryKey: ["trending-posts"],
    queryFn: GetTrendingPost,
  });
};

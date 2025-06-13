import axiosInstance from "@/lib/axios";
import { PostFeedsResponse } from "@/types/post-feed";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const GetFeeds = async () => {
  try {
    const res = await axiosInstance.get("/post/feed");
    return res.data?.posts || [];
  } catch (error) {
    const newError =
      error instanceof AxiosError
        ? error.response?.data?.error
        : "failed to fetch posts";
    throw new Error(newError);
  }
};

export const useGetFeeds = () => {
  return useQuery<PostFeedsResponse>({
    queryKey: ["feeds"],
    queryFn: GetFeeds,
  });
};

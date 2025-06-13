import axiosInstance from "@/lib/axios";
import { PostsResponse } from "@/types/post-types";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const GetUserPost = async () => {
  try {
    const res = await axiosInstance.get("/post/my");
    return res.data.posts || [];
  } catch (error) {
    const newError =
      error instanceof AxiosError
        ? error.response?.data?.error
        : "failed to fetch posts";
    throw new Error(newError);
  }
};

export const useGetUserPost = () => {
  return useQuery<PostsResponse>({
    queryKey: ["user-posts"],
    queryFn: GetUserPost,
  });
};

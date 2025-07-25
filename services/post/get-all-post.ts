import axiosInstance from "@/lib/axios";
import { PostsResponse } from "@/types/post-types";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const GetAllPost = async () => {
  try {
    const res = await axiosInstance.get("/post");
    return res.data?.posts || [];
  } catch (error) {
    const newError =
      error instanceof AxiosError
        ? error.response?.data?.error
        : "failed to fetch posts";
    throw new Error(newError);
  }
};

export const useGetAllPost = () => {
  return useQuery<PostsResponse>({
    queryKey: ["posts"],
    queryFn: GetAllPost,
  });
};

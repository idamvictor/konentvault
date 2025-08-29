import axiosInstance from "@/lib/axios";
import { CreatorApiResponse } from "@/types/creator-response";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const getCreators = async (): Promise<CreatorApiResponse> => {
  try {
    const res = await axiosInstance.get("/creators");
    return res.data;
  } catch (error) {
    const newError =
      error instanceof AxiosError
        ? error.response?.data?.error || "Failed to fetch creators"
        : "Failed to fetch creators";
    throw new Error(newError);
  }
};

export const useGetCreators = () => {
  return useQuery<CreatorApiResponse>({
    queryKey: ["creators"],
    queryFn: getCreators,
  });
};

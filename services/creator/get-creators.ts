import axiosInstance from "@/lib/axios";
import { Creators } from "@/types/creators";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const getCreators = async (): Promise<Creators> => {
  try {
    const res = await axiosInstance.get("/creators");
    return res.data?.creators || [];
  } catch (error) {
    const newError =
      error instanceof AxiosError
        ? error.response?.data?.error || "Failed to fetch creators"
        : "Failed to fetch creators";
    throw new Error(newError);
  }
};

export const useGetCreators = () => {
  return useQuery<Creators>({
    queryKey: ["creators"],
    queryFn: getCreators,
  });
};

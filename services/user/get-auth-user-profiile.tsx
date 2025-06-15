import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export interface AuthUserProfile {
  id: number;
  name: string;
  email: string;
  username: string;
  bio: string;
  profilePicture: string | null;
  coverImage: string | null;
}

const getAuthUserProfile = async (): Promise<AuthUserProfile> => {
  try {
    const res = await axiosInstance.get("/user/profile/me");
    return res.data;
  } catch (error) {
    const newError =
      error instanceof AxiosError
        ? error.response?.data?.error || "Failed to fetch user profile"
        : "Failed to fetch user profile";
    throw new Error(newError);
  }
};

export const useGetAuthUserProfile = () => {
  return useQuery<AuthUserProfile>({
    queryKey: ["authUserProfile"],
    queryFn: getAuthUserProfile,
  });
};

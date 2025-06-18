import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export interface AuthUserProfile {
  id: number;
  name: string;
  username: string;
  displayName: string | null;
  email: string;
  userType: string;
  profilePicture: string | null;
  coverImage: string | null;
  phone: string | null;
  country: string | null;
  gender: string | null;
  age: number | null;
  bio: string | null;
  welcomeMessage: string | null;
  emailVerified: boolean;
  isCreator: boolean;
  dateOfBirth: string | null;
  balance: string;
  isVerified: boolean;
  subscriptionPrice: string | null;
  paymentDetails: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  user: AuthUserProfile;
}

const getAuthUserProfile = async (): Promise<AuthUserProfile> => {
  try {
    const res = await axiosInstance.get<ApiResponse>("/user/profile/me");
    return res.data.user; // Return the user object from the response
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

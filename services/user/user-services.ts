/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  CreatorsApiResponse,
  dataApiResponse,
  defaultApiResponse,
  UpdateProfileResponse,
  UserApiResponse,
} from "@/types/api";
import { PaymentDetails, User } from "@/types/user";
import { axiosInstance as apiClient } from "@/lib/axios";

type RawPaymentDetails = {
  bankName: string;
  "Account No": string;
  Name: string;
};

export const fetchUserProfile = async (): Promise<any> => {
  try {
    const response = await apiClient.get<any>("user/profile/me");
    return response.data?.user;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(
        error.response.data.error || "Failed to fetch user profile."
      );
    }
    throw new Error("Network error, please try again.");
  }
};

export const updateUser = async (user: User): Promise<User> => {
  try {
    const response = await apiClient.put<User>("user/profile/me", user);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.error || "Failed to update profile.");
    }
    throw new Error("Network error, please try again.");
  }
};

export const followUser = async (userId: string): Promise<User> => {
  try {
    const response = await apiClient.put<User>(`user/profile/${userId}/follow`);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.error || "Failed to follow user.");
    }
    throw new Error("Network error, please try again.");
  }
};

export const unfollowUser = async (userId: string): Promise<User> => {
  try {
    const response = await apiClient.put<User>(
      `user/profile/${userId}/unfollow`
    );
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.error || "Failed to unfollow user.");
    }
    throw new Error("Network error, please try again.");
  }
};

/* {{base_url}}/api/user/resend-verify-email */

export const resendVerifyEmail = async (): Promise<any> => {
  try {
    const response = await apiClient.post<any>("user/resend-verify-email");
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(
        error.response.data.error || "Failed to resend verification email."
      );
    }
    throw new Error("Network error, please try again.");
  }
};

/* {{base_url}}/api/user/profile PUT */

export const updateProfile = async (
  user: Partial<User>
): Promise<UpdateProfileResponse> => {
  try {
    const response = await apiClient.put<UpdateProfileResponse>(
      "user/profile",
      user
    );
    // Return both the updated user data and the success message
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.error || "Failed to update profile.");
    }
    throw new Error("Network error, please try again.");
  }
};

/* {{base_url}}/api/user/profile/password*/
export const updatePassword = async (
  currentPassword: string,
  newPassword: string
): Promise<defaultApiResponse> => {
  try {
    const response = await apiClient.put<defaultApiResponse>(
      "user/profile/password",
      { currentPassword, newPassword }
    );
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(
        error.response.data.error || "Failed to update password."
      );
    }
    throw new Error("Network error, please try again.");
  }
};

// {{base_url}}/api/user/cosmasnoni
export const fetchUser = async (username: string): Promise<User> => {
  try {
    const response = await apiClient.get<UserApiResponse>(`user/${username}`);
    return response.data.user;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.error || "Failed to fetch user.");
    }
    throw new Error("Network error, please try again.");
  }
};

// subscribe to a user
export const subscribeToUser = async (
  creatorId: number,
  subscriptionPlanId: string
): Promise<dataApiResponse> => {
  try {
    const response = await apiClient.post<dataApiResponse>(
      `subscription/subscribe`,
      { creatorId, subscriptionPlanId }
    );
    return response.data.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      // toast.error(error.response.data.error || "Failed to subscribe to user.");
      throw new Error(
        error.response.data.error || "Failed to subscribe to user."
      );
    }
    throw new Error("Network error, please try again.");
  }
};

export const uploadProfileImage = async (
  formData: FormData
): Promise<defaultApiResponse> => {
  try {
    const response = await apiClient.post<defaultApiResponse>(
      `user/upload/profile-picture`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } } // Optional, usually not needed
    );
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      // toast.error(error.response.data.error || "Failed to subscribe to user.");
      throw new Error(error.response.data.error || "Failed to upload user.");
    }
    throw new Error("Network error, please try again.");
  }
};

export const uploadCoverImage = async (
  formData: FormData
): Promise<defaultApiResponse> => {
  try {
    const response = await apiClient.post<defaultApiResponse>(
      `user/upload/cover-image`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } } // Optional, usually not needed
    );
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      // toast.error(error.response.data.error || "Failed to subscribe to user.");
      throw new Error(error.response.data.error || "Failed to upload user.");
    }
    throw new Error("Network error, please try again.");
  }
};

export const uploadIdDocument = async (
  formData: FormData
): Promise<defaultApiResponse> => {
  try {
    const response = await apiClient.post<defaultApiResponse>(
      `creator-verification/document/upload`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } } // Optional, usually not needed
    );
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      // toast.error(error.response.data.error || "Failed to subscribe to user.");
      throw new Error(
        error.response.data.error || "Failed to upload document."
      );
    }
    throw new Error("Network error, please try again.");
  }
};

export const fetchCreators = async (filters: {
  status?: string;
  gender?: string;
  subscriptionType?: string;
}): Promise<User[]> => {
  try {
    const response = await apiClient.get<CreatorsApiResponse>(`creators`, {
      params: filters,
    });
    return response.data.creators;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.error || "Failed to fetch creators.");
    }
    throw new Error("Network error, please try again.");
  }
};

// verify creator account
export const verifyCreatorAccount = async (
  formData: FormData
): Promise<defaultApiResponse> => {
  try {
    const response = await apiClient.post<defaultApiResponse>(
      `creator-verification/submit`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } } // Optional, usually not needed
    );
    // Check for success property in the response
    if (!response.data.success) {
      throw new Error(response.data.message || "Verification request failed.");
    }
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      console.log(error.response.data);
      throw new Error(
        error.response.data.error ||
          error.response.data.message ||
          "Failed to verify creator account."
      );
    }
    throw new Error("Network error, please try again.");
  }
};

// {{base_url}}/api/user/payment-details/submit
// {
//     "paymentDetails": {
//         "bankName": "Union Bank",
//         "Account No": "0035774856",
//         "Name": "Orogwu Chinonso Pascal"
//     }
// }
export const submitPaymentDetails = async (
  paymentDetails: PaymentDetails
): Promise<defaultApiResponse> => {
  try {
    const response = await apiClient.post<defaultApiResponse>(
      `user/payment-details/submit`,
      { paymentDetails } // Body payload
    );
    return response.data;
  } catch (error: any) {
    if (error.response?.data) {
      throw new Error(
        error.response.data.message || "Failed to submit payment details."
      );
    }
    throw new Error("Network error, please try again.");
  }
};

// block user
// {{base_url}}/api/user/block-user/3
export const blockUser = async (
  userId: number
): Promise<defaultApiResponse> => {
  try {
    const response = await apiClient.post<defaultApiResponse>(
      `user/block-user/${userId}`
    );
    return response.data;
  } catch (error: any) {
    if (error.response?.data) {
      throw new Error(error.response.data.message || "Failed to block user.");
    }
    throw new Error("Network error, please try again.");
  }
};

// {{base_url}}/api/user/give-tip
export const giveTip = async (
  userId: number,
  amount: number
): Promise<defaultApiResponse> => {
  try {
    const response = await apiClient.post<defaultApiResponse>(`user/give-tip`, {
      userId,
      amount,
    });
    return response.data;
  } catch (error: any) {
    if (error.response?.data) {
      throw new Error(error.response.data.error || "Failed to give tip.");
    }
    throw new Error("Network error, please try again.");
  }
};

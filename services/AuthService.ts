import { useUserStore } from "@/store/use-user-store";
import { User } from "@/types/user";
import { axiosInstance as apiClient } from "@/lib/axios";
import { format } from "date-fns";
import { AxiosError } from "axios";

interface LoginResponse {
  message: string;
  token: string;
  user: User;
}

interface RegistrationResponse {
  message: string;
  user: User;
  token: string;
}

export async function login(
  email: string,
  password: string
): Promise<LoginResponse> {
  try {
    const response = await apiClient.post<LoginResponse>("auth/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.data) {
      throw new Error(
        error.response.data.error || "An unexpected error occurred"
      );
    }
    throw new Error("Network error, please try again");
  }
}

export const registerUser = async (
  name: string,
  email: string,
  password: string
): Promise<RegistrationResponse> => {
  try {
    const response = await apiClient.post<RegistrationResponse>(
      "auth/register",
      { name, email, password }
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.data) {
      throw new Error(
        error.response.data.error || "Registration failed. Please try again."
      );
    }
    throw new Error("Network error, please check your connection.");
  }
};

export const vendorRegister = async (
  firstName: string,
  lastName: string,
  displayName: string,
  username: string,
  email: string,
  country: string,
  gender: string,
  dateOfBirth: Date,
  phone: string,
  password: string,
  userType: string
): Promise<RegistrationResponse> => {
  try {
    const NewDateOfBirth = format(dateOfBirth, "yyyy-MM-dd");
    const response = await apiClient.post<RegistrationResponse>(
      "auth/register",
      {
        name: firstName + " " + lastName,
        username,
        email,
        country,
        gender,
        dateOfBirth: NewDateOfBirth,
        phone,
        password,
        userType,
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.data) {
      throw new Error(
        error.response.data.error || "Registration failed. Please try again."
      );
    }
    throw new Error("Network error, please check your connection.");
  }
};

interface ForgotPasswordResponse {
  message: string;
  success: boolean;
}

export const requestForgotPassword = async (
  email: string
): Promise<ForgotPasswordResponse> => {
  try {
    const response = await apiClient.post<ForgotPasswordResponse>(
      "auth/request-password-reset",
      {
        email,
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.data) {
      throw new Error(
        error.response.data.error || "Failed to send password reset request."
      );
    }
    throw new Error("Network error, please check your connection.");
  }
};

interface ResetPasswordResponse {
  message: string;
  success: boolean;
}

export const resetForgotPassword = async (
  token: string,
  newPassword: string
): Promise<ResetPasswordResponse> => {
  try {
    const response = await apiClient.post<ResetPasswordResponse>(
      "auth/reset-password",
      {
        token,
        newPassword,
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.data) {
      throw new Error(error.response.data.error || "Failed to reset password.");
    }
    throw new Error("Network error, please check your connection.");
  }
};

interface VerifyEmailResponse {
  message: string;
  success: boolean;
}

export const verifyEmailToken = async (
  token: string
): Promise<VerifyEmailResponse> => {
  try {
    const response = await apiClient.post<VerifyEmailResponse>(
      "auth/verify-email",
      {
        token,
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.data) {
      throw new Error(error.response.data.error || "Failed to verify email.");
    }
    throw new Error("Network error, please check your connection.");
  }
};

export function logout(): void {
  useUserStore.getState().clearStore(); // Clear both user and token
}

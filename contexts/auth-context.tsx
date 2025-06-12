"use client";

import { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";
import { ApiError, AuthError } from "@/lib/errors";
import { useUserStore } from "@/store/use-user-store";
import type { User } from "@/store/use-user-store";

interface RegisterData {
  name: string;
  email: string;
  password: string;
  userType: "fan" | "creator";
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { user, setUser, setToken } = useUserStore();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const storedToken = useUserStore.getState().token;
      if (storedToken) {
        const response = await axiosInstance.get("/user/profile/me");
        setUser(response.data.user);
      }
    } catch (error: unknown) {
      console.error("Auth check failed:", error);
      useUserStore.getState().clearStore();
    } finally {
      setLoading(false);
    }
  };
  const login = async (email: string, password: string) => {
    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      const { token, user } = response.data;
      setToken(token);
      setUser(user);

      // Redirect based on user role if it exists in the response
      const redirectPath = user.role === "creator" ? "/creator/home" : "/home";
      router.push(redirectPath);
    } catch (error) {
      const apiError = error as ApiError;
      throw new AuthError(
        apiError.response?.data?.message ||
          apiError.message ||
          "Login failed. Please try again."
      );
    }
  };
  const register = async (data: RegisterData) => {
    try {
      const response = await axiosInstance.post("/auth/register", data);

      const { user, token } = response.data;

      setUser(user);

      let redirectPath;

      if (token) {
        setToken(token);
        // Redirect based on user type
        redirectPath = user.userType === "creator" ? "/creator/home" : "/home";
      } else {
        redirectPath = "/auth/login";
      }

      router.push(redirectPath);
    } catch (error) {
      const apiError = error as ApiError;
      throw new AuthError(
        apiError.response?.data?.message ||
          apiError.message ||
          "Registration failed. Please try again."
      );
    }
  };

  const logout = () => {
    useUserStore.getState().clearStore();
    router.push("/auth/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

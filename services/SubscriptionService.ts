import { defaultApiResponse, SubscriptionPlanResponse } from "@/types/api";
import {
  MySubscription,
  MySubscriptionResponse,
  SubscriptionPlan,
} from "@/types/subscription copy";
import { axiosInstance as apiClient } from "@/lib/axios";
import { AxiosError } from "axios";

export const fetchCreatorSubscriptions = async (
  id: number
): Promise<SubscriptionPlan[]> => {
  try {
    const response = await apiClient.get<SubscriptionPlanResponse>(
      "subscription-plans/creator/" + id
    );
    return response.data.plans;
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response?.data) {
      throw new Error(
        error.response.data.error || "Failed to fetch subscriptions."
      );
    }
    throw new Error("Network error, please try again.");
  }
};

// create subscription plan
export const createSubscriptionPlan = async (data: {
  type: string;
  price: string;
}): Promise<defaultApiResponse> => {
  try {
    const response = await apiClient.post<defaultApiResponse>(
      "subscription-plans/create",
      data
    );
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response?.data) {
      throw new Error(
        error.response.data.message || "Failed to create subscription plan."
      );
    }
    throw new Error("Network error, please try again.");
  }
};

// update subscription plan
export const updateSubscriptionPlan = async (
  id: number,
  data: {
    type: string;
    price: string;
  }
): Promise<defaultApiResponse> => {
  try {
    const response = await apiClient.put<defaultApiResponse>(
      `subscription-plans/update/${id}`,
      data
    );
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response?.data) {
      throw new Error(
        error.response.data.error || "Failed to update subscription plan."
      );
    }
    throw new Error("Network error, please try again.");
  }
};

// delete subscription plan
export const deleteSubscriptionPlan = async (
  id: number
): Promise<defaultApiResponse> => {
  try {
    const response = await apiClient.delete<defaultApiResponse>(
      `subscription-plans/delete/${id}`
    );
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response?.data) {
      throw new Error(
        error.response.data.error || "Failed to delete subscription plan."
      );
    }
    throw new Error("Network error, please try again.");
  }
};

// fetch my subscriptions
export const fetchMySubscriptions = async (): Promise<MySubscription[]> => {
  try {
    const response = await apiClient.get<MySubscriptionResponse>(
      "subscription/me"
    );
    return response.data.subscriptions;
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response?.data) {
      throw new Error(
        error.response.data.error || "Failed to fetch subscriptions."
      );
    }
    throw new Error("Network error, please try again.");
  }
};

// cancel subscription
export const cancelSubscription = async (
  id: number
): Promise<defaultApiResponse> => {
  try {
    const response = await apiClient.post<defaultApiResponse>(
      `subscription/cancel`,
      { creatorId: id }
    );
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response?.data) {
      throw new Error(
        error.response.data.error || "Failed to cancel subscription."
      );
    }
    throw new Error("Network error, please try again.");
  }
};

// renew subscription
export const renewSubscription = async (
  creatorId: number,
  subscriptionPlanId?: number
): Promise<defaultApiResponse> => {
  try {
    const response = await apiClient.post<defaultApiResponse>(
      `subscription/renew`,
      { creatorId, subscriptionPlanId }
    );
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response?.data) {
      throw new Error(
        error.response.data.error || "Failed to renew subscription."
      );
    }
    throw new Error("Network error, please try again.");
  }
};

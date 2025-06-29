import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance as apiClient } from "@/lib/axios";
import type {
  SendMessageRequest,
  SendMessageResponse,
  ConversationsResponse,
  MessagesResponse,
} from "@/types/message";

// Send message
export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      data: SendMessageRequest
    ): Promise<SendMessageResponse> => {
      const response = await apiClient.post("/messages/send", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
  });
};

// Get conversations
export const useConversations = () => {
  return useQuery({
    queryKey: ["conversations"],
    queryFn: async (): Promise<ConversationsResponse> => {
      const response = await apiClient.get("/messages/conversations");
      return response.data;
    },
  });
};

// Get messages with specific user
export const useMessages = (userId: number) => {
  return useQuery({
    queryKey: ["messages", userId],
    queryFn: async (): Promise<MessagesResponse> => {
      const response = await apiClient.get(`/messages/conversation/${userId}`);
      return response.data;
    },
    enabled: !!userId,
  });
};

// Mark message as seen
export const useMarkMessageSeen = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      messageId,
    }: {
      userId: number;
      messageId: number;
    }) => {
      const response = await apiClient.put(`/messages/seen/${userId}`, {
        messageId,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
  });
};

// Delete message
export const useDeleteMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      messageId,
    }: {
      userId: number;
      messageId: number;
    }) => {
      const response = await apiClient.delete(`/messages/delete/${userId}`, {
        data: { messageId },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
  });
};

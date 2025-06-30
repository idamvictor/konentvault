import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { reactionApi, type CreateReactionData } from "@/lib/api";
import { toast } from "@/hooks/use-toast";
import type { AxiosError } from "axios";

export const usePostReactions = (postId: number) => {
  return useQuery({
    queryKey: ["reactions", postId],
    queryFn: () => reactionApi.getPostReactions(postId),
    enabled: !!postId,
  });
};

export const useCreateReaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateReactionData) => reactionApi.create(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["reactions", variables.postId],
      });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error: AxiosError) => {
      const message =
        typeof error.response?.data === "object" &&
        error.response?.data &&
        "message" in error.response.data
          ? (error.response.data.message as string)
          : undefined;
      toast({
        title: "Error",
        description: message || "Failed to add reaction",
        variant: "destructive",
      });
    },
  });
};

export const useUpdateReaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: Partial<CreateReactionData>;
    }) => reactionApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reactions"] });
      toast({
        title: "Success",
        description: "Reaction updated successfully!",
      });
    },
    onError: (error: AxiosError) => {
      const message =
        typeof error.response?.data === "object" &&
        error.response?.data &&
        "message" in error.response.data
          ? (error.response.data.message as string)
          : undefined;
      toast({
        title: "Error",
        description: message || "Failed to update reaction",
        variant: "destructive",
      });
    },
  });
};

export const useDeleteReaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => reactionApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reactions"] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast({
        title: "Success",
        description: "Reaction deleted successfully!",
      });
    },
    onError: (error: AxiosError) => {
      const message =
        typeof error.response?.data === "object" &&
        error.response?.data &&
        "message" in error.response.data
          ? (error.response.data.message as string)
          : undefined;
      toast({
        title: "Error",
        description: message || "Failed to delete reaction",
        variant: "destructive",
      });
    },
  });
};

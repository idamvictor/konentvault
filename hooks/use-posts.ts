import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { postApi, type CreatePostData, type UpdatePostData } from "@/lib/api";
import { toast } from "@/hooks/use-toast";
import type { AxiosError } from "axios";

export const usePosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: postApi.getUserPosts,
  });
};

export const usePost = (id: number) => {
  return useQuery({
    queryKey: ["post", id],
    queryFn: () => postApi.getById(id),
    enabled: !!id,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FormData | CreatePostData) => postApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast({
        title: "Success",
        description: "Post created successfully!",
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
        description: message || "Failed to create post",
        variant: "destructive",
      });
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdatePostData }) =>
      postApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast({
        title: "Success",
        description: "Post updated successfully!",
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
        description: message || "Failed to update post",
        variant: "destructive",
      });
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => postApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast({
        title: "Success",
        description: "Post deleted successfully!",
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
        description: message || "Failed to delete post",
        variant: "destructive",
      });
    },
  });
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tipApi, type CreateTipData } from "@/lib/api";
import { toast } from "@/hooks/use-toast";

export const useSendTip = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTipData) => tipApi.sendTip(data),
    onSuccess: (response, variables) => {
      // Invalidate relevant queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({
        queryKey: ["post", variables.creatorId],
      });

      toast({
        title: "Tip Sent Successfully! 🎉",
        description:
          response.message || `Tip of $${variables.amount} sent successfully!`,
        variant: "default",
      });
    },
    onError: (error: unknown) => {
      toast({
        title: "Failed to Send Tip",
        description:
          (error &&
          typeof error === "object" &&
          "response" in error &&
          error.response &&
          typeof error.response === "object" &&
          "data" in error.response &&
          error.response.data &&
          typeof error.response.data === "object" &&
          "message" in error.response.data &&
          typeof error.response.data.message === "string"
            ? error.response.data.message
            : undefined) || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });
};

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteSubscriptionPlan } from "@/services/SubscriptionService";
import { SubscriptionPlan } from "@/types/subscription";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ShowDeleteSubscriptionModalProps {
  plan: SubscriptionPlan;
  trigger: React.ReactNode;
}

export function DeleteSubscriptionModal({
  trigger,
  plan,
}: ShowDeleteSubscriptionModalProps) {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      setLoading(true);
      const { message } = await deleteSubscriptionPlan(plan.id);
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["subscription"] });
      setTimeout(() => {
        setOpen(false);
      }, 1000);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.message ||
            "An error occurred while deleting the plan"
        );
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild onClick={() => setOpen(true)}>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:mx-auto max-w-[95%] sm:max-w-xl mx-auto bg-bgColor p-4 rounded">
        <DialogHeader className="text-left">
          <DialogTitle> Delete Plan</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p className="text-foreground">
            Are you sure you want to delete this plan?
            <div className="text-primary">{plan.name}</div>{" "}
          </p>
          <p className="text-foreground">This action cannot be undone.</p>
        </div>
        {/* footer */}
        <DialogFooter className="flex gap-2">
          <DialogClose asChild>
            <Button type="button" variant={"outline"} className="px-4">
              Cancel
            </Button>
          </DialogClose>

          <Button
            type="submit"
            className="px-4 flex gap-1"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Proceed
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

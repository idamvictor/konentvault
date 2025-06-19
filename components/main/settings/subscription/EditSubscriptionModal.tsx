import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SubscriptionPriceForm from "./SubscriptionPriceForm";
import { useUserStore } from "@/store/use-user-store";
import { SubscriptionPlan } from "@/types/subscription";
import { useState } from "react";

interface ShowEditSubscriptionModalProps {
  plan: SubscriptionPlan;
  trigger: React.ReactNode;
}

export function EditSubscriptionModal({
  trigger,
  plan,
}: ShowEditSubscriptionModalProps) {
  const { user } = useUserStore((state) => state);
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild onClick={() => setOpen(true)}>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:mx-auto max-w-[95%] sm:max-w-xl mx-auto bg-bgColor p-4 rounded">
        <DialogHeader className="text-left">
          <DialogTitle>Edit Subscription Plan</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {user && (
            <SubscriptionPriceForm
              setOpen={setOpen}
              user={user}
              plan={plan}
              mode="edit"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

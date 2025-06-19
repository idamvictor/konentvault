import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import SubscriptionPriceForm from "./SubscriptionPriceForm";
import { useUserStore } from "@/store/use-user-store";
// import { User } from "@/types/user"

interface ShowCreateSubscriptionModalProps {
  // user: User,
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function CreateSubscriptionModal({
  open,
  setOpen,
}: ShowCreateSubscriptionModalProps) {
  const { user } = useUserStore((state) => state);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:mx-auto max-w-[95%] sm:max-w-xl mx-auto bg-bgColor p-4 rounded">
        <DialogHeader className="text-left">
          <DialogTitle>Create Subscription Plan</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {user && (
            <SubscriptionPriceForm
              setOpen={setOpen}
              user={user}
              mode="create"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

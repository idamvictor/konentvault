import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { useForm } from "react-hook-form";
import { verifyEmailSchema } from "@/schema/auth";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { User } from "@/types/user";
import { requestForgotPassword } from "@/services/AuthService";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { fetchUserProfile } from "@/services/user/user-services";
import { AxiosError } from "axios";
import { toast } from "sonner";

interface ForgotPasswordDialogProps {
  open: boolean;
  setOpen?: (open: boolean) => void;
  children: React.ReactNode;
}
const ForgotPasswordDialog = ({
  open,
  setOpen,
  children,
}: ForgotPasswordDialogProps) => {
  const [loading, setLoading] = useState(false);

  const {
    data: user,
    error,
    isLoading,
  } = useQuery<User>({
    queryKey: ["userProfile"],
    queryFn: fetchUserProfile,
  });

  const form = useForm<z.infer<typeof verifyEmailSchema>>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      email: user ? user.email : "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof verifyEmailSchema>) => {
    try {
      setLoading(true);
      const { email } = values;
      const { message } = await requestForgotPassword(email);
      toast.success(message);
    } catch (error) {
      console.error("error", error);
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.message ||
            "Failed to process password reset request"
        );
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) return <p className="text-muted-foreground">Loading...</p>;
  if (error && !user) {
    const errorMessage =
      error instanceof AxiosError
        ? error.response?.data?.message || "Failed to load user profile"
        : "An unexpected error occurred";
    return <p>Error: {errorMessage}</p>;
  }

  console.log("user", user?.email);

  return (
    <Dialog open={open}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-foreground uppercase mb-4">
            Restore Access
          </DialogTitle>
          <DialogDescription>
            Please enter the email you used to register your{" "}
            <span className="text-primary font-bold">APP</span> account and we
            will send an email to restore your account.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Enter Email address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <DialogFooter className="flex gap-2">
          <Button
            type="button"
            variant={"outline"}
            className="px-4"
            onClick={() => setOpen && setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={form.handleSubmit(onSubmit)}
            className="px-4 flex gap-1"
            disabled={loading}
          >
            {loading && <Loader2 className=" animate-spin" />}
            Send
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ForgotPasswordDialog;

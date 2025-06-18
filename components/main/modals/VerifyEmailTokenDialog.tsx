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
import { verifyTokenSchema } from "@/schema/auth";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { verifyEmailToken } from "@/services/AuthService";
import { AxiosError } from "axios";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "@/store/use-user-store";

interface VerifyEmailTokenDialog {
  open: boolean;
  setOpen: (open: boolean) => void;
  children?: React.ReactNode;
}
const VerifyEmailTokenDialog = ({
  open,
  setOpen,
  children,
}: VerifyEmailTokenDialog) => {
  const { user, setUser } = useUserStore();

  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof verifyTokenSchema>>({
    resolver: zodResolver(verifyTokenSchema),
    defaultValues: {
      token: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof verifyTokenSchema>) => {
    // console.log("values", values);
    try {
      setLoading(true);
      const { token } = values;
      const { message } = await verifyEmailToken(token);
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });

      // ✅ update user in the store with emailVerified: true
      if (user) {
        setUser({
          ...user,
          emailVerified: true,
        });
      }

      // reset the form
      form.reset();
      // setOpen(false)
      setTimeout(() => {
        setOpen(false);
      }, 1000);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  // console.log("user", user?.email);

  return (
    <Dialog open={open}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:mx-auto max-w-[95%] sm:max-w-xl mx-auto bg-bgColor p-4 rounded">
        <DialogHeader>
          <DialogTitle className="text-foreground uppercase mb-4">
            Email Verification
          </DialogTitle>
          <DialogDescription>
            <p className="text-muted-foreground">
              Please check your email for a verification token.
            </p>
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="token"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Enter token" {...field} />
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
            type="submit"
            className="px-4 flex gap-1"
            onClick={form.handleSubmit(onSubmit)}
            disabled={loading}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Verify Email
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VerifyEmailTokenDialog;

"use client";

import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { verifyEmailSchema } from "@/schema/auth";
import { z } from "zod";
import { Input } from "@/components/ui/input";
// import { resendVerifyEmail, } from '@/services/UserService';
import { toast } from "sonner";
import { useUserStore } from "@/store/use-user-store";
import { resendVerifyEmail } from "@/services/user/user-services";
import { AxiosError } from "axios";
import VerifyEmailTokenDialog from "@/components/main/modals/VerifyEmailTokenDialog";

const EmailSetting = () => {
  const { user } = useUserStore();

  const [loading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof verifyEmailSchema>>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      email: user?.email ? user?.email : "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({ email: user.email });
    }
  }, [user, form]);

  const resendVerificationEmail = async () => {
    try {
      setResendLoading(true);
      const { message } = await resendVerifyEmail();
      toast.success(message);
      setOpen(true);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <>
      <div className="relative">
        <div className="flex gap-4 items-center p-4">
          <Button
            variant="link"
            asChild
            className="text-primary p-0 h-auto hover:text-primary hover:bg-transparent"
          >
            <Link href={"/settings/security"}>
              <ArrowLeft size={25} />
            </Link>
          </Button>
          <h3 className="text-sm sm:text-base uppercase font-medium text-foreground">
            Email Account
          </h3>
        </div>
      </div>

      <div className="w-full px-4 rounded-none mt-4">
        {/* email form */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(resendVerificationEmail)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-0">Current Email</FormLabel>
                  <FormControl>
                    <Input
                      readOnly
                      placeholder="Enter Email address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4 w-full justify-center flex-col sm:flex-row  sm:justify-end">
              <Button
                disabled={loading}
                variant={"outline"}
                type="submit"
                className="w-full text-primary rounded-[20px] uppercase hover:opacity-70"
              >
                {loading ? "Please wait..." : "Update Email Address"}
              </Button>

              <Button
                disabled={resendLoading}
                className="w-full bg-primary rounded-[20px] uppercase hover:opacity-70 hover:bg-primary"
              >
                {resendLoading ? "Please wait..." : "Send Confirmation"}
              </Button>
            </div>
          </form>
        </Form>
      </div>

      <VerifyEmailTokenDialog open={open} setOpen={setOpen} />
    </>
  );
};

export default EmailSetting;

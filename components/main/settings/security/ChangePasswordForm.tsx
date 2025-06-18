"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AxiosError } from "axios";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { changePasswordFormSchema } from "@/schema/account";
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { updatePassword } from "@/services/user/user-services";
import ForgotPasswordDialog from "./ForgotPasswordDialog";

const ChangePasswordForm = () => {
  // Separate state for each password field
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const toggleShowPassword = (field: keyof typeof showPassword) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const form = useForm<z.infer<typeof changePasswordFormSchema>>({
    resolver: zodResolver(changePasswordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof changePasswordFormSchema>) => {
    try {
      setLoading(true);
      const { currentPassword, newPassword } = values;
      const { message } = await updatePassword(currentPassword, newPassword);
      toast.success(message);

      // reset the form
      form.reset();
    } catch (error) {
      console.error("error", error);
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.message || "Failed to change password"
        );
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const openForgotPasswordDialog = () => {
    setOpenDialog(true);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Current Password */}
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <div>
                <FormItem>
                  <FormControl>
                    <div className="relative flex items-center">
                      <Input
                        type={
                          showPassword.currentPassword ? "text" : "password"
                        }
                        placeholder="Enter current password"
                        {...field}
                      />
                      <div
                        onClick={() => toggleShowPassword("currentPassword")}
                        className="absolute right-2 cursor-pointer text-primary"
                      >
                        {showPassword.currentPassword ? (
                          <EyeOffIcon size={25} />
                        ) : (
                          <EyeIcon size={25} />
                        )}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
                <ForgotPasswordDialog open={openDialog} setOpen={setOpenDialog}>
                  <Button
                    type="button"
                    variant={"link"}
                    className="underline text-xs py-0 text-primary font-medium"
                    onClick={openForgotPasswordDialog}
                  >
                    Forgot password?
                  </Button>
                </ForgotPasswordDialog>
              </div>
            )}
          />

          {/* New Password */}
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative flex items-center">
                    <Input
                      type={showPassword.newPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      {...field}
                    />
                    <div
                      onClick={() => toggleShowPassword("newPassword")}
                      className="absolute right-2 cursor-pointer text-primary"
                    >
                      {showPassword.newPassword ? (
                        <EyeOffIcon size={25} />
                      ) : (
                        <EyeIcon size={25} />
                      )}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm Password */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative flex items-center">
                    <Input
                      type={showPassword.confirmPassword ? "text" : "password"}
                      placeholder="Enter confirm password"
                      {...field}
                    />
                    <div
                      onClick={() => toggleShowPassword("confirmPassword")}
                      className="absolute right-2 cursor-pointer text-primary"
                    >
                      {showPassword.confirmPassword ? (
                        <EyeOffIcon size={25} />
                      ) : (
                        <EyeIcon size={25} />
                      )}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={loading}
            className="px-6 flex gap-1 justify-end bg-primary rounded-3xl hover:opacity-70 hover:bg-primary"
          >
            {loading && <Loader2 className="mr animate-spin" />}
            Save password
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ChangePasswordForm;

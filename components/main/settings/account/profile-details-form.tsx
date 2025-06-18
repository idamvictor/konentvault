"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { profileFormSchema } from "@/schema/account";
import { User } from "@/types/user";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { updateProfile } from "@/services/user/user-services";

type ProfileDetailsFormProps = {
  user?: User;
};

const ProfileDetailsForm = ({ user }: ProfileDetailsFormProps) => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user?.name || "",
      bio: user?.bio || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof profileFormSchema>) => {
    try {
      setLoading(true);
      const { message } = await updateProfile(values);
      toast.success(message);
      queryClient.invalidateQueries({
        queryKey: ["userProfile"],
        exact: false,
      });
    } catch (error) {
      const newError =
        error instanceof Error
          ? error
          : new Error("An unexpected error occurred");
      console.log("error", error);
      toast.error(newError.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 mt-14">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-0">Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-0">Biography</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter biography" rows={5} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={loading}
            className="px-6 flex justify-end bg-primary gap-1 rounded-2xl hover:opacity-70 hover:bg-primary"
          >
            {loading && <Loader2 className="animate-spin" size={16} />}
            Save Profile
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ProfileDetailsForm;

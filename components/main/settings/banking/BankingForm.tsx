"use client";

import React, { useEffect } from "react";
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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { submitPaymentDetails } from "@/services/user/user-services";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { User } from "@/types/user";

interface BankingFormProps {
  user?: User;
}

const bankingFormSchema = z.object({
  bankName: z.string().min(1, "Bank name is required"),
  accountNo: z.string().min(6, "Enter a valid account number"),
  name: z.string().min(1, "Account name is required"),
});

const BankingForm = ({ user }: BankingFormProps) => {
  const queryClient = useQueryClient();
  const [isLoading, setLoading] = React.useState(false);

  const form = useForm<z.infer<typeof bankingFormSchema>>({
    resolver: zodResolver(bankingFormSchema),
    defaultValues: {
      bankName: "",
      accountNo: "",
      name: "",
    },
  });

  useEffect(() => {
    if (user?.paymentDetails) {
      try {
        // @ts-expect-error - paymentDetails is stored as a JSON string
        const parsedDetails = JSON.parse(user.paymentDetails);
        form.reset({
          bankName: parsedDetails.bankName || "",
          accountNo: parsedDetails.accountNumber || "",
          name: parsedDetails.name || "",
        });
      } catch (error) {
        console.error("Failed to parse paymentDetails", error);
      }
    }
  }, [user, form]);

  const onSubmit = async (values: z.infer<typeof bankingFormSchema>) => {
    try {
      setLoading(true);
      const { message } = await submitPaymentDetails({
        bankName: values.bankName,
        accountNumber: values.accountNo,
        name: values.name,
      });
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      toast.success(message);
    } catch (error) {
      console.error("error", error);
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Something went wrong";
        toast.error(errorMessage);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-0">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="bankName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bank Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter bank name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="accountNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter account number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter account name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex w-full justify-end">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </span>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default BankingForm;

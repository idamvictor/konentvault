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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MinimalUser } from "@/types/user";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { subscriptionPriceFormSchema } from "@/schema/subscription";
import Link from "next/link";
import { subscriptionPlans } from "@/constants";
import { useSubscriptionQuery } from "@/hooks/useSubscriptionQuery";
import {
  createSubscriptionPlan,
  updateSubscriptionPlan,
} from "@/services/SubscriptionService";
import { toast } from "sonner";
import { SubscriptionPlan } from "@/types/subscription";

interface SubscriptionPriceFormProps {
  user: MinimalUser;
  setOpen: (open: boolean) => void;
  plan?: SubscriptionPlan;
  mode: "create" | "edit";
}

const SubscriptionPriceForm = ({
  plan,
  setOpen,
  mode,
  user,
}: SubscriptionPriceFormProps) => {
  // fetch user subcription
  const { data } = useSubscriptionQuery(user.id);

  const subscriptionPlan = data || [];

  console.log("subscriptionPlan", subscriptionPlan);

  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof subscriptionPriceFormSchema>>({
    resolver: zodResolver(subscriptionPriceFormSchema),
    defaultValues: {
      type: plan ? plan.name : "",
      price: plan ? plan.price : "",
      // duration: plan ? plan.duration : 0,
    },
  });

  const onSubmit = async (
    values: z.infer<typeof subscriptionPriceFormSchema>
  ) => {
    try {
      setLoading(true);
      if (mode === "edit" && plan?.id) {
        const { message } = await updateSubscriptionPlan(plan.id, values);
        toast.success(message);
      } else {
        const { message } = await createSubscriptionPlan(values);
        toast.success(message);
      }

      queryClient.invalidateQueries({ queryKey: ["subscription"] });
      setTimeout(() => {
        setOpen(false);
      }, 1000);
    } catch (error) {
      console.error("error", error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "An error occurred");
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
          {/* select */}
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-0">Select Plan</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a plan" />
                  </SelectTrigger>
                  <SelectContent>
                    {subscriptionPlans.map(({ value, label }) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <FormField
						control={form.control}
						name="duration"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="mb-0">Duration</FormLabel>
								<FormControl>
									<Input
										type="number"
										placeholder="Enter Duration"
										{...field}
										onChange={(e) => field.onChange(Number(e.target.value))} // Convert to number
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/> */}

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-0">Price per month</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Enter Price" {...field} />
                </FormControl>
                <FormDescription>
                  Minimum 0 NGN or free You must{" "}
                  <Link href={"/settings/bank"} className="text-primary">
                    {" "}
                    Add a Bank Account or Payment Information
                  </Link>{" "}
                  before you can set your price or accept tips.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex w-full justify-end">
            <Button
              type="submit"
              disabled={loading}
              className="px-6 flex justify-end bg-primary gap-1 rounded-2xl hover:opacity-70 hover:bg-primary"
            >
              {loading && <Loader2 className="animate-spin" size={16} />}
              {mode === "edit" ? "Update" : "Save"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SubscriptionPriceForm;

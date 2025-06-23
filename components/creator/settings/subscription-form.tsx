"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar, Edit, Trash2 } from "lucide-react";
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
import * as z from "zod";

const formSchema = z.object({
  duration: z.string().min(1, "Please select a duration"),
  baseAmount: z.string().min(1, "Base amount is required"),
  dollarAmount: z.string().min(1, "Dollar amount is required"),
  discount: z.string().min(0, "Discount must be 0 or greater"),
  expiryDate: z.string().min(1, "Expiry date is required"),
});

interface SubscriptionPlan {
  id: number;
  duration: string;
  baseAmount: string;
  dollarAmount: string;
  discount: string;
  expiryDate: string;
}

export default function SubscriptionForm() {
  const [subscriptionPlans, setSubscriptionPlans] = useState<
    SubscriptionPlan[]
  >([
    {
      id: 1,
      duration: "1-month Subscription Plan",
      baseAmount: "₦0.00",
      dollarAmount: "$0.00",
      discount: "80",
      expiryDate: "30th May, 2025",
    },
    {
      id: 2,
      duration: "2-month Subscription Plan",
      baseAmount: "₦40,000.00",
      dollarAmount: "$40.00",
      discount: "0",
      expiryDate: "21st Jul, 2025",
    },
  ]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      duration: "",
      baseAmount: "",
      dollarAmount: "",
      discount: "0",
      expiryDate: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newPlan: SubscriptionPlan = {
      id: subscriptionPlans.length + 1,
      duration: values.duration,
      baseAmount: `₦${Number.parseFloat(values.baseAmount).toFixed(2)}`,
      dollarAmount: `$${Number.parseFloat(values.dollarAmount).toFixed(2)}`,
      discount: values.discount,
      expiryDate: new Date(values.expiryDate).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    };
    setSubscriptionPlans([...subscriptionPlans, newPlan]);
    form.reset();
  }

  const handleDelete = (id: number) => {
    setSubscriptionPlans(subscriptionPlans.filter((plan) => plan.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Create Subscription Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-red-600">
            Create Subscription
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium text-gray-700">
                      Select Duration
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="1-month Subscription Plan" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1-month Subscription Plan">
                          1-month Subscription Plan
                        </SelectItem>
                        <SelectItem value="2-month Subscription Plan">
                          2-month Subscription Plan
                        </SelectItem>
                        <SelectItem value="3-month Subscription Plan">
                          3-month Subscription Plan
                        </SelectItem>
                        <SelectItem value="6-month Subscription Plan">
                          6-month Subscription Plan
                        </SelectItem>
                        <SelectItem value="12-month Subscription Plan">
                          12-month Subscription Plan
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="baseAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium text-gray-700">
                        Base amount (₦) (Max: 50,000)
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter price"
                          type="number"
                          max="50000"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dollarAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium text-gray-700">
                        Dollar amount ($) (Min: 3 and Max: 50)
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter price"
                          type="number"
                          min="3"
                          max="50"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="discount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium text-gray-700">
                        Attach Discount
                      </FormLabel>
                      <FormControl>
                        <Input type="number" min="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="expiryDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium text-gray-700">
                        Expiry Date
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="mm/dd/yyyy"
                            type="date"
                            {...field}
                          />
                          <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-2"
                >
                  Create
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Subscription Plans Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-red-600">
            Subscription plans
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="font-semibold text-gray-700">
                  Duration
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  Base Amount
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  Dollar Amount
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  Discount
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  Expiry Date
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscriptionPlans.map((plan) => (
                <TableRow key={plan.id}>
                  <TableCell className="font-medium">{plan.duration}</TableCell>
                  <TableCell>{plan.baseAmount}</TableCell>
                  <TableCell>{plan.dollarAmount}</TableCell>
                  <TableCell>{plan.discount}</TableCell>
                  <TableCell>{plan.expiryDate}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Edit className="h-4 w-4 text-red-600" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => handleDelete(plan.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

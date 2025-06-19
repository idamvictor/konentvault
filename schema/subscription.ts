import { z } from "zod";

export const subscriptionPriceFormSchema = z.object({
	type: z.string().min(1, "Name is required"),
	price: z.string(),
	// duration: z.number().min(1, "Duration is required"),
});

export const fundWalletFormSchema = z.object({
	amount: z.string().min(1, "Amount is required"),
	paymentMethod: z.string().min(1, "Payment method is required"),
});

export const verifyPaymentFormSchema = z.object({
	reference: z.string().min(1, "Reference is required"),
});


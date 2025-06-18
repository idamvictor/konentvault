import { z } from "zod";

export const loginFormSchema = z.object({
	email: z.string().email("Invalid email"),
	password: z.string().min(6, "Password must be at least 6 characters"),
});

export const forgotPasswordSchema = z.object({
	email: z.string().email("Invalid email"),
});

export const registerFormSchema = z.object({
	name: z.string(),
	email: z.string().email("Invalid email"),
	password: z.string().min(6, "Password must be at least 6 characters"),
});

export const vendorRegisterFormSchema = z.object({
	firstName: z.string(),
	lastName: z.string(),
	username: z.string(),
	displayName: z.string(),
	email: z.string().email("Invalid email"),
	country: z.string(),
	dateOfBirth: z.date(),
	gender: z.string(),
	phone: z.string(),
	password: z.string().min(6, "Password must be at least 6 characters"),
});

export const verifyEmailSchema = z.object({
	email: z.string().email("Invalid email"),
});

export const verifyTokenSchema = z.object({
	token: z.string().max(6, "Invalid token"),
});

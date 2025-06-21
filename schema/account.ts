import { z } from "zod";

export const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  // displayName: z.string(),
  // dob: z.date(),
  // gender: z.enum(["male", "female", "other"]),
  // location: z
  // 	.string()
  // 	.min(3, "Location must be at least 3 characters")
  // 	.max(100, "Location must be at most 100 characters"),
  bio: z.string().max(500, "Bio must be at most 500 characters"),
  // website: z.string().url("Invalid website URL"),
});

export const changePasswordFormSchema = z
  .object({
    currentPassword: z.string(),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // This will attach the error message to confirmPassword
  });

export const resetPasswordFormSchema = z
  .object({
    token: z.string(),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // This will attach the error message to confirmPassword
  });

// 	First name
// Middle name
// last name
// Country
// State/Province
// Address
// City
// Zip/Postal code
// Instagram
// X(Twitter)
// Date of birth
// Document Type -- passport, ID card, driver's license
// PHOTO OF YOUR ID -- upload
// PHOTO OF HOLDING YOUR ID  --- Please upload a photo holding your ID (i.e. a selfie, ensuring your face is visible)
// VIDEO OF YOU HOLD A CLEAN PAPER WITH TODAYS DATE IN THE FORMAT DD/MM/YYYY --- Please upload a video holding a clean paper with today's date on it (i.e. a selfie, ensuring your face is visible)
export const identityVerificationFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  middleName: z.string().optional(),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  country: z.string().min(2, "Country must be at least 2 characters"),
  instagram: z.string().optional(),
  xTwitter: z.string().optional(),
  dateOfBirth: z.date(),
  documentType: z.enum(["passport", "id_card", "drivers_license"]),
  // idPhoto: z.optional().instanceof(File),
  // selfieWithIdPhoto: z.instanceof(File),
  // videoWithDatePhoto: z.instanceof(File),
});

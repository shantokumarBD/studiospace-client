import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please provide a valid email address"),
  password: z
    .string()
    .min(1, "Password is required"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const signUpSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please provide a valid email address"),
  image: z
    .string()
    .url("Please provide a valid image URL")
    .optional()
    .or(z.literal("")),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});

export type SignUpFormValues = z.infer<typeof signUpSchema>;

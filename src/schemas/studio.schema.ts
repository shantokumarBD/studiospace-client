import { z } from "zod";

export const studioSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters"),
  category: z
    .string()
    .min(1, "Please select a category"),
  badge: z
    .string()
    .default("Verified Stage"),
  location: z
    .string()
    .min(3, "Location is required"),
  hourlyRate: z.coerce
    .number()
    .positive("Hourly rate must be greater than 0"),
  securityDeposit: z.coerce
    .number()
    .nonnegative("Security deposit cannot be negative")
    .default(0),
  maxCapacity: z.coerce
    .number()
    .positive("Capacity must be at least 1 person")
    .default(10),
  image: z
    .string()
    .url("Please provide a valid image URL"),
  features: z
    .string()
    .min(1, "Please enter at least one feature"),
  overview: z
    .string()
    .min(10, "Overview must be at least 10 characters"),
});

export type StudioFormValues = z.infer<typeof studioSchema>;

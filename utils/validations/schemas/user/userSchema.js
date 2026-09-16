import { z } from "zod";

const locationSchema = z.object({
  type: z.literal("Point"),

  coordinates: z
    .array(z.number())
    .length(2, "Coordinates must contain longitude and latitude"),
});

const addressSchema = z.object({
  addressLine1: z
    .string()
    .trim()
    .max(150, "Address line 1 cannot exceed 150 characters")
    .optional(),

  addressLine2: z
    .string()
    .trim()
    .max(150, "Address line 2 cannot exceed 150 characters")
    .optional(),

  city: z
    .string()
    .trim()
    .max(100, "City cannot exceed 100 characters")
    .optional(),

  state: z
    .string()
    .trim()
    .max(100, "State cannot exceed 100 characters")
    .optional(),

  country: z
    .string()
    .trim()
    .max(100, "Country cannot exceed 100 characters")
    .default("India")
    .optional(),

  postalCode: z
    .string()
    .trim()
    .max(20, "Postal code cannot exceed 20 characters")
    .optional(),

  location: locationSchema.optional(),
});

export const registerSchema = z.object({
  body: z.object({
    userName: z
      .string()
      .trim()
      .min(2, "Username must contain at least 2 characters")
      .max(50, "Username cannot exceed 50 characters"),

    email: z
      .string()
      .trim()
      .toLowerCase()
      .email("Please enter a valid email address"),

    password: z
      .string()
      .min(8, "Password must contain at least 8 characters")
      .max(72, "Password cannot exceed 72 characters"),

    address: z
      .array(addressSchema)
      .max(5, "You cannot add more than 5 addresses")
      .optional(),
  }),
});

export const loginUserSchema = z.object({
  body: z.object({
    email: z
      .string()
      .trim()
      .toLowerCase()
      .email("Please enter a valid email address"),

    password: z
      .string()
      .min(8, "Password must contain at least 8 characters")
      .max(72, "Password cannot exceed 72 characters"),
  }),
});

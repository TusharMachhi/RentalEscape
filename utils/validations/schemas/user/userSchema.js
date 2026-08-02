import { z } from "zod";
const registerSchema = z.object({
  body: z.object({
    userName: z
      .string()
      .trim()
      .min(1, "name is required")
      .min(3, "minimum 3 character require "),
    email: z.string().email("email is require"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(32, "Password must not exceed 32 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character",
      ),
  }),
});

export { registerSchema };

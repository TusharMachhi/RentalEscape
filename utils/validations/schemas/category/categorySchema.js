import { z } from "zod";

const createCategorySchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(2, "Category name must be at least 2 characters")
      .max(50, "Category name cannot exceed 50 characters"),

    description: z
      .string()
      .trim()
      .min(1, "Description cannot be empty")
      .max(500, "Description cannot exceed 500 characters"),
  }),

  params: z.object({}),

  query: z.object({}),
});

const updateCategorySchema = z.object({
  body: z
    .object({
      name: z
        .string()
        .trim()
        .min(1, "category name is required")
        .max(50, "category name must not exceed 50 characters")
        .optional(),

      description: z
        .string()
        .trim()
        .min(1, "category description is required")
        .max(500, "category description must not exceed 500 characters")
        .optional(),
    })
    .refine(
      (data) => data.name !== undefined || data.description !== undefined,
      {
        message: "at least one field is required",
      },
    ),

  params: z.object({
    id: z.string().min(1, "category id is required"),
  }),

  query: z.object({}),
});

export { createCategorySchema, updateCategorySchema };

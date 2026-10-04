import { z } from "zod";

const objectIdSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "invalid object id");

const coordinatesSchema = z
  .array(z.number())
  .length(2, "coordinates must contain longitude and latitude")
  .refine(
    ([longitude, latitude]) =>
      longitude >= -180 &&
      longitude <= 180 &&
      latitude >= -90 &&
      latitude <= 90,
    {
      message: "invalid longitude or latitude",
    },
  );

const locationSchema = z
  .object({
    type: z.literal("Point"),
    coordinates: coordinatesSchema,
  })
  .strict();

const guestsSchema = z
  .object({
    maxGuests: z
      .number()
      .int("maxGuests must be an integer")
      .min(1, "maxGuests must be at least 1"),

    bedrooms: z
      .number()
      .int("bedrooms must be an integer")
      .min(0, "bedrooms cannot be negative"),

    beds: z
      .number()
      .int("beds must be an integer")
      .min(1, "beds must be at least 1"),

    bathrooms: z.number().min(1, "bathrooms must be at least 1"),

    allowsPets: z.boolean().default(false),
  })
  .strict();

const pricingSchema = z
  .object({
    pricePerNight: z.number().min(0, "price per night cannot be negative"),

    cleaningFee: z
      .number()
      .min(0, "cleaning fee cannot be negative")
      .default(0),

    currency: z
      .string()
      .trim()
      .length(3, "currency must be a 3-letter code")
      .toUpperCase()
      .default("INR"),
  })
  .strict();

const bookingRulesSchema = z
  .object({
    instantBooking: z.boolean().default(false),

    minimumNights: z
      .number()
      .int("minimumNights must be an integer")
      .min(1, "minimumNights must be at least 1")
      .default(1),

    maximumNights: z
      .number()
      .int("maximumNights must be an integer")
      .min(1, "maximumNights must be at least 1")
      .default(30),
  })
  .strict()
  .refine((data) => data.maximumNights >= data.minimumNights, {
    message: "maximumNights must be greater than or equal to minimumNights",
    path: ["maximumNights"],
  });

const basePropertyFields = {
  category: objectIdSchema,

  title: z
    .string()
    .trim()
    .min(5, "title must be at least 5 characters")
    .max(150, "title must not exceed 150 characters"),

  description: z
    .string()
    .trim()
    .min(20, "description must be at least 20 characters")
    .max(5000, "description must not exceed 5000 characters"),

  roomType: z.enum(["entire_place", "private_room", "shared_room"]),

  address: z
    .string()
    .trim()
    .min(5, "address must be at least 5 characters")
    .max(300, "address must not exceed 300 characters"),

  city: z
    .string()
    .trim()
    .min(2, "city is required")
    .max(100, "city must not exceed 100 characters"),

  state: z
    .string()
    .trim()
    .min(2, "state is required")
    .max(100, "state must not exceed 100 characters"),

  country: z
    .string()
    .trim()
    .min(2, "country is required")
    .max(100, "country must not exceed 100 characters")
    .default("India"),

  postalCode: z
    .string()
    .trim()
    .min(3, "postal code is required")
    .max(20, "postal code is too long"),

  location: locationSchema,

  guests: guestsSchema,

  amenities: z
    .array(z.string().trim().min(1, "amenity cannot be empty"))
    .max(50, "maximum 50 amenities allowed")
    .default([]),

  pricing: pricingSchema,

  bookingRules: bookingRulesSchema,

  houseRules: z
    .array(z.string().trim().min(1, "house rule cannot be empty"))
    .max(50, "maximum 50 house rules allowed")
    .default([]),

  checkIn: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "checkIn must use HH:mm format")
    .default("14:00"),

  checkOut: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "checkOut must use HH:mm format")
    .default("11:00"),

  cancellationPolicy: z
    .enum(["flexible", "moderate", "strict"])
    .default("moderate"),
};

const createPropertySchema = z.object({
  body: z.object(basePropertyFields).strict(),

  params: z.object({}),

  query: z.object({}),
});

const updatePropertySchema = z.object({
  body: z
    .object(basePropertyFields)
    .partial()
    .strict()
    .refine((data) => Object.keys(data).length > 0, {
      message: "at least one field is required",
    }),

  params: z.object({
    id: objectIdSchema,
  }),

  query: z.object({}),
});

export { createPropertySchema, updatePropertySchema };

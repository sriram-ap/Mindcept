import { z } from "zod";

/**
 * Lead-capture schemas shared by the client forms and the /api/enquiry route.
 * A single endpoint receives every lead type, discriminated by `kind`, so a
 * CRM/webhook integration only needs to be wired in one place.
 */

const phone = z
  .string()
  .trim()
  .regex(/^[+]?[\d][\d\s-]{7,14}$/, "Enter a valid mobile number");

/** URLs of files already uploaded to R2 via /api/upload (never raw bytes). */
const attachments = z
  .array(z.string().url())
  .max(10, "Too many attachments")
  .optional();

export const enquirySchema = z.object({
  kind: z.literal("enquiry"),
  name: z.string().trim().min(2, "Please enter your name"),
  mobile: phone,
  email: z.string().trim().email("Enter a valid email"),
  requirement: z.string().trim().min(5, "Please describe your requirement"),
  attachments,
});

export const listingSchema = z.object({
  kind: z.literal("listing"),
  propertyType: z.enum([
    "Industrial",
    "Warehouse",
    "Land",
    "Commercial / Office",
    "Retail",
    "Other",
  ]),
  listingFor: z.enum(["Lease", "Sale", "Lease or Sale"]),
  location: z.string().trim().min(2, "Please enter the location"),
  area: z.string().trim().min(1, "Please enter the area"),
  areaUnit: z.enum(["sq ft", "acres", "sq m"]),
  expectedPrice: z.string().trim().optional(),
  name: z.string().trim().min(2, "Please enter your name"),
  mobile: phone,
  email: z.string().trim().email("Enter a valid email"),
  details: z.string().trim().optional(),
  attachments,
});

export const leadSchema = z.discriminatedUnion("kind", [
  enquirySchema,
  listingSchema,
]);

export type Lead = z.infer<typeof leadSchema>;

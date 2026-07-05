import { z } from "zod";

// Shared sub-schema for Organizers
const organizerSchema = z.object({
  _id: z.string().optional(),
  name: z.string().optional(),
  contactNumber: z.string().optional(),
  address: z.string().optional(),
  description: z.string().optional(),
  photo: z.string().optional(), // Can be URL or "NEW_FILE"
});

// Shared sub-schema for Performers
const performerSchema = z.object({
  _id: z.string().optional(),
  name: z.string().optional(),
  contactNumber: z.string().optional(),
  address: z.string().optional(),
  passion: z.string().optional(),
  bio: z.string().optional(),
  description: z.string().optional(),
  profilePhoto: z.string().optional(), // Can be URL or "NEW_FILE"
});

const createEvent = z.object({
  title: z.string({ message: "Title is required" }),
  description: z.string({ message: "Description is required" }),
  categoryId: z.string({ message: "Category ID is required" }),
  date: z.string({ message: "Date is required" }),
  location: z.string({ message: "Location is required" }),
  isPremium: z.boolean().optional(),
  price: z.preprocess((val) => (val ? parseFloat(val as string) : 0), z.number().optional()),
  totalTickets: z.preprocess((val) => parseInt(val as string, 10), z.number().min(1)),
  organizers: z.array(organizerSchema).optional(),
  performers: z.array(performerSchema).optional(),
});

const updateEvent = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  categoryId: z.string().optional(),
  date: z.string().optional(),
  location: z.string().optional(),
  isPremium: z.boolean().optional(),
  price: z.preprocess((val) => (val ? parseFloat(val as string) : undefined), z.number().optional()),
  totalTickets: z.preprocess((val) => (val ? parseInt(val as string, 10) : undefined), z.number().optional()),
  organizers: z.array(organizerSchema).optional(),
  performers: z.array(performerSchema).optional(),
});

export const eventValidation = {
  createEvent,
  updateEvent,
};
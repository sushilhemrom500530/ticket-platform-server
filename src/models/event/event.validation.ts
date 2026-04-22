import { z } from "zod";

const createEvent = z.object({
  body: z.object({
    title: z.string({ required_error: "Title is required" }),
    description: z.string({ required_error: "Description is required" }),
    categoryId: z.string({ required_error: "Category ID is required" }),
    date: z.string({ required_error: "Date is required" }),
    location: z.string({ required_error: "Location is required" }),
    isPremium: z.boolean().optional(),
    price: z.number().optional(),
    totalTickets: z.number({ required_error: "Total tickets is required" }).min(1),
  }).refine((data) => !data.isPremium || (data.price && data.price > 0), {
    message: "Price is required and must be greater than 0 for premium events",
    path: ["price"],
  }),
});

const updateEvent = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    categoryId: z.string().optional(),
    date: z.string().optional(),
    location: z.string().optional(),
    isPremium: z.boolean().optional(),
    price: z.number().optional(),
    totalTickets: z.number().min(1).optional(),
  }),
});

export const eventValidation = {
  createEvent,
  updateEvent,
};

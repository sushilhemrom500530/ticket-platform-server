import { z } from "zod";

const createMenubarZodSchema = z.object({
  label: z.string({
    message: "Label is required",
  }),
  href: z.string({
    message: "Href is required",
  }),
  icon: z.string().optional(),
  order: z.number({
    message: "Order is required",
  }).optional(),
  isActive: z.boolean().optional(),
});

const updateMenubarZodSchema = z.object({
  label: z.string().optional(),
  href: z.string().optional(),
  icon: z.string().optional(),
  order: z.number().optional(),
  isActive: z.boolean().optional(),
});

export const MenubarValidation = {
  createMenubarZodSchema,
  updateMenubarZodSchema,
};


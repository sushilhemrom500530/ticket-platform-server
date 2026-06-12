import { z } from "zod";

const createMenubarZodSchema = z.object({
  body: z.object({
    label: z.string({
      required_error: "Label is required",
    }),
    href: z.string({
      required_error: "Href is required",
    }),
    icon: z.string().optional(),
    order: z.number().optional(),
    isActive: z.boolean().optional(),
  }),
});

const updateMenubarZodSchema = z.object({
  body: z.object({
    label: z.string().optional(),
    href: z.string().optional(),
    icon: z.string().optional(),
    order: z.number().optional(),
    isActive: z.boolean().optional(),
  }),
});

export const MenubarValidation = {
  createMenubarZodSchema,
  updateMenubarZodSchema,
};

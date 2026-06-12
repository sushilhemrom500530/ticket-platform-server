import { z } from "zod";

const createBannerZodSchema = z.object({
  body: z.object({
    title: z.string({
      message: "Title is required",
    }),
    description: z.string().optional(),
    category: z.string({
      message: "Category is required",
    }),
    coverImage: z.string({
      message: "Cover image is required",
    }),
    isActive: z.boolean().optional(),
  }),
});

const updateBannerZodSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    category: z.string().optional(),
    coverImage: z.string().optional(),
    isActive: z.boolean().optional(),
  }),
});

export const BannerValidation = {
  createBannerZodSchema,
  updateBannerZodSchema,
};

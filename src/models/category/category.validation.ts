import { z } from "zod";

const createCategory = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
  }),
});

export const categoryValidation = {
  createCategory,
};

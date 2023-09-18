import { z } from "zod";

export const createInput = z.object({
  title: z
    .string()
    .min(1, "todo must be at least 1 letter")
    .max(250, "todo must be 250 letters or less"),
  isArchive: z.boolean(),
  categoryId: z.number(),
});

export const toggleInput = z.object({
  id: z.number(),
  isArchive: z.boolean(),
});

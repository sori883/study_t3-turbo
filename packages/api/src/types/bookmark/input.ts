import { z } from "zod";

export const createInput = z.object({
  url: z.string().url("URLを入力してください"),
  categoryId: z.number().nullable(),
});

export const toggleInput = z.object({
  id: z.number(),
  isArchive: z.boolean(),
});

import { z } from "zod";

export const createInput = z.object({
  url: z.string().url("URLを入力してください"),
  categoryId: z.number().nullable(),
});

export const updateInput = z.object({
  id: z.number(),
  title: z.string().max(256).min(1),
  categoryId: z.number().nullable(),
});

export const toggleInput = z.object({
  id: z.number(),
  isArchive: z.boolean(),
});

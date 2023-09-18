import { and, desc, eq, schema } from "@sori/db";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";
import { createInput, updateInput } from "../types/category";

export const bookmarkRouter = createTRPCRouter({
  all: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.categories.findMany({
      where: eq(schema.categories.userId, ctx.session.user.id),
      orderBy: desc(schema.categories.id),
    });
  }),

  byId: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.categories.findFirst({
        where: and(
          eq(schema.categories.id, input.id),
          eq(schema.categories.userId, ctx.session.user.id),
        ),
      });
    }),

  create: protectedProcedure.input(createInput).mutation(({ ctx, input }) => {
    return ctx.db.insert(schema.categories).values({
      ...input,
      userId: ctx.session.user.id,
    });
  }),

  update: protectedProcedure.input(updateInput).mutation(({ ctx, input }) => {
    const { id, title } = input;
    return ctx.db
      .update(schema.categories)
      .set({ title: title })
      .where(eq(schema.categories.id, id));
  }),

  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(schema.categories)
      .where(eq(schema.categories.id, input));
  }),
});

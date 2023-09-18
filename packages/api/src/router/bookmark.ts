import { and, desc, eq, schema } from "@sori/db";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";
import { createInput, toggleInput } from "../types/bookmark";

export const bookmarkRouter = createTRPCRouter({
  all: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.bookmarks.findMany({
      where: eq(schema.bookmarks.userId, ctx.session.user.id),
      orderBy: desc(schema.bookmarks.id),
    });
  }),

  byId: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.bookmarks.findFirst({
        where: and(
          eq(schema.bookmarks.id, input.id),
          eq(schema.bookmarks.userId, ctx.session.user.id),
        ),
      });
    }),

  create: protectedProcedure.input(createInput).mutation(({ ctx, input }) => {
    return ctx.db.insert(schema.bookmarks).values({
      ...input,
      userId: ctx.session.user.id,
    });
  }),

  /**
   * Archiveを切り替える
   */
  toggleArchive: protectedProcedure
    .input(toggleInput)
    .mutation(({ ctx, input }) => {
      const { id, isArchive } = input;
      return ctx.db
        .update(schema.bookmarks)
        .set({ isArchive: isArchive })
        .where(eq(schema.bookmarks.id, id));
    }),

  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(schema.bookmarks)
      .where(eq(schema.bookmarks.id, input));
  }),
});

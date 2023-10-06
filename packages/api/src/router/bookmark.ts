import { and, desc, eq, schema } from "@sori/db";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";
import { createInput, toggleInput } from "../types/bookmark";

export const bookmarkRouter = createTRPCRouter({
  /*
    カテゴリ関係なし
   */
  all: protectedProcedure
    .input(z.object({ isArchive: z.boolean() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.bookmarks.findMany({
        with: {
          category: true,
          user: true,
        },
        where: and(
          eq(schema.bookmarks.userId, ctx.session.user.id),
          eq(schema.bookmarks.isArchive, input.isArchive),
        ),
        orderBy: desc(schema.bookmarks.id),
      });
    }),

  /*
    特定のカテゴリのみ取得
   */
  byCategory: protectedProcedure
    .input(z.object({ slug: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db
        .select()
        .from(schema.bookmarks)
        .leftJoin(
          schema.categories,
          eq(schema.bookmarks.categoryId, schema.categories.id),
        )
        .where(
          and(
            eq(schema.bookmarks.isArchive, false),
            eq(schema.bookmarks.userId, ctx.session.user.id),
            eq(schema.categories.title, input.slug),
          ),
        )
        .orderBy(desc(schema.bookmarks.id));
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

  create: protectedProcedure
    .input(createInput)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.insert(schema.bookmarks).values({
        ...input,
        title: "",
        isArchive: false,
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
        .set({ isArchive: !isArchive })
        .where(eq(schema.bookmarks.id, id));
    }),

  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(schema.bookmarks)
      .where(eq(schema.bookmarks.id, input));
  }),
});

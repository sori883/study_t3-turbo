import { relations, sql } from "drizzle-orm";
import {
  boolean,
  int,
  serial,
  timestamp,
  unique,
  varchar,
} from "drizzle-orm/mysql-core";

import { mySqlTable } from "./_table";
import { users } from "./auth";

export const bookmarks = mySqlTable("bookmarks", {
  id: serial("id").primaryKey().autoincrement(),
  title: varchar("title", { length: 256 }).notNull(),
  url: varchar("url", { length: 2083 }).notNull(),
  isArchive: boolean("is_archive").default(false).notNull(),
  categoryId: int("category_id"),
  userId: varchar("user_id", { length: 255 }).notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt").onUpdateNow(),
});

export const bookmarkRelations = relations(bookmarks, ({ one }) => ({
  user: one(users, { fields: [bookmarks.userId], references: [users.id] }),
  category: one(categories, {
    fields: [bookmarks.categoryId],
    references: [categories.id],
  }),
}));

export const categories = mySqlTable(
  "categories",
  {
    id: serial("id").primaryKey().autoincrement(),
    title: varchar("title", { length: 256 }).notNull(),
    slug: varchar("slug", { length: 50 }).notNull(),
    userId: varchar("user_id", { length: 255 }).notNull(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt").onUpdateNow(),
  },
  (t) => ({
    unqName: unique().on(t.slug, t.userId),
  }),
);

export const categoriesRelations = relations(categories, ({ one, many }) => ({
  user: one(users, { fields: [categories.userId], references: [users.id] }),
  bookmarks: many(bookmarks),
}));

export type Bookmark = typeof bookmarks.$inferSelect;
export type InsertBookmark = typeof bookmarks.$inferInsert;
export type Category = typeof categories.$inferSelect;
export type InsertCategory = typeof categories.$inferInsert;

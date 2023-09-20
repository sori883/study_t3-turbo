import { relations, sql } from "drizzle-orm";
import {
  boolean,
  int,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

import { mySqlTable } from "./_table";
import { users } from "./auth";

export const bookmarks = mySqlTable("bookmarks", {
  id: serial("id").primaryKey().autoincrement(),
  title: varchar("title", { length: 256 }).notNull(),
  url: varchar("url", { length: 2083 }).notNull(),
  isArchive: boolean("is_archive").default(false),
  categoryId: int("category_id"),
  userId: varchar("user_id", { length: 255 }).notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt").onUpdateNow(),
});

export const bookmarksRelations = relations(bookmarks, ({ one }) => ({
  author: one(users, {
    fields: [bookmarks.userId],
    references: [users.id],
  }),
}));

export const categories = mySqlTable("categories", {
  id: serial("id").primaryKey().autoincrement(),
  title: varchar("title", { length: 256 }).notNull(),
  userId: varchar("user_id", { length: 255 }).notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt").onUpdateNow(),
});

export const categoriesRelations = relations(categories, ({ one }) => ({
  author: one(users, {
    fields: [categories.userId],
    references: [users.id],
  }),
}));

export type Bookmark = typeof bookmarks.$inferSelect;
export type InsertBookmark = typeof bookmarks.$inferInsert;
export type Category = typeof categories.$inferSelect;
export type InsertCategory = typeof categories.$inferInsert;

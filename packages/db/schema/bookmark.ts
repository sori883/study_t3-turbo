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
  isArchive: boolean("isArchive").default(false),
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
  userId: varchar("user_id", { length: 255 }),
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

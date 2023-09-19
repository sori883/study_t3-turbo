import { Client } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";

import * as auth from "./schema/auth";
import * as bookmark from "./schema/bookmark";

export const schema = { ...auth, ...bookmark };

export { mySqlTable as tableCreator } from "./schema/_table";

export * from "drizzle-orm";

export type User = typeof auth.users.$inferSelect;
export type InsertUser = typeof auth.users.$inferInsert;
export type Bookmark = typeof bookmark.bookmarks.$inferSelect;
export type InsertBookmark = typeof bookmark.bookmarks.$inferInsert;
export type Category = typeof bookmark.categories.$inferSelect;
export type InsertCategory = typeof bookmark.categories.$inferInsert;

export const db = drizzle(
  new Client({
    url: process.env.DATABASE_URL,
  }).connection(),
  { schema },
);

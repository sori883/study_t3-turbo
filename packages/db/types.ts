import type * as auth from "./schema/auth";
import type * as bookmark from "./schema/bookmark";

export type User = typeof auth.users.$inferSelect;
export type InsertUser = typeof auth.users.$inferInsert;
export type Bookmark = typeof bookmark.bookmarks.$inferSelect;
export type InsertBookmark = typeof bookmark.bookmarks.$inferInsert;
export type Category = typeof bookmark.categories.$inferSelect;
export type InsertCategory = typeof bookmark.categories.$inferInsert;

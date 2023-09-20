import { Client } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";

import * as auth from "./schema/auth";
import * as bookmark from "./schema/bookmark";

export const schema = { ...auth, ...bookmark };

export { mySqlTable as tableCreator } from "./schema/_table";

export * from "drizzle-orm";
// schemaの型定義
export * from "./types";

export const db = drizzle(
  new Client({
    url: process.env.DATABASE_URL,
  }).connection(),
  { schema },
);

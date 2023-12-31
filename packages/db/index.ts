import { Client } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";

import * as auth from "./schema/auth";
import * as bookmark from "./schema/bookmark";

export const schema = { ...auth, ...bookmark };

export { mySqlTable as tableCreator } from "./schema/_table";

export * from "drizzle-orm";
export type * from "./schema/auth";
export type * from "./schema/bookmark";

export const db = drizzle(
  new Client({
    url: process.env.DATABASE_URL,
  }).connection(),
  { schema },
);

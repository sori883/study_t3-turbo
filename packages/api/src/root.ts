import { authRouter } from "./router/auth";
import { bookmarkRouter } from "./router/bookmark";
import { categoryRouter } from "./router/category";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  bookmark: bookmarkRouter,
  category: categoryRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

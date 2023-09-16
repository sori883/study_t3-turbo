import { createTRPCReact } from "@trpc/react-query";

import type { AppRouter } from "@sori/api";

export const api = createTRPCReact<AppRouter>();

export { type RouterInputs, type RouterOutputs } from "@sori/api";
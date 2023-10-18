import type { AppRouter } from "@sori/api";
import { createTRPCReact } from "@trpc/react-query";

export const api = createTRPCReact<AppRouter>();

export { type RouterInputs, type RouterOutputs } from "@sori/api";

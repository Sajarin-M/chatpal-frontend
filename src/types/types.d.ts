import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import type { AppRouter } from '$context/trpc';

type RouterInput = inferRouterInputs<AppRouter>;
type RouterOutput = inferRouterOutputs<AppRouter>;

declare global {
  interface FCWithChildren {
    children?: ReactNode;
  }
}

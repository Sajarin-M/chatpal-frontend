import type {
  infer,
  inferRouterContext,
  inferRouterInputs,
  inferRouterOutputs,
} from '@trpc/server';
import type { AppRouter } from '$context/trpc';

type RouterInput = inferRouterInputs<AppRouter>;
type RouterOutput = inferRouterOutputs<AppRouter>;
type RouterContext = inferRouterContext<AppRouter>;

declare global {
  interface FCWithChildren {
    children?: ReactNode;
  }

  type TokenDecoded = {
    exp: number;
  };
}

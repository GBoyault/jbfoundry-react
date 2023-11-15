import { QueryClient } from '@tanstack/react-query';
import { ONE_HOUR } from '../utils';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: ONE_HOUR,
    },
  },
});

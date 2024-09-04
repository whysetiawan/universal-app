import { QueryClient } from '@tanstack/react-query';
import { ZodError } from 'zod';

import logger from '#/shared/utils/logger';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnMount: true,
      staleTime: 0,
      gcTime: 1000 * 60 * 5, // 5 minutes,
      throwOnError: (err, _) => {
        if (err instanceof ZodError) {
          logger.log({
            id: '[QueryError]',
            message: JSON.stringify(err.errors, null, 2),
          });
          return false;
        }
        return false;
      },
    },
    mutations: {
      retry: false,
      throwOnError: (err) => {
        return err instanceof ZodError;
      },
    },
  },
});

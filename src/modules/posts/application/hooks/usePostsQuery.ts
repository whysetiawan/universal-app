import { useInfiniteQuery } from '@tanstack/react-query';

import postRepositoryImpl from '#/modules/posts/data/postRepositoryImpl';
import { queryKeys } from '#/shared/lib/react-query/queryKeys';

export type PostType = 'fresh' | 'trending' | undefined;

export const usePostsQuery = (type: PostType) => {
  return useInfiniteQuery({
    initialPageParam: 1,
    queryFn: ({ pageParam }) => {
      return postRepositoryImpl.getPosts(pageParam, 10);
    },
    getNextPageParam: (lastPage, _, lastPageParam) => {
      return lastPage.length < 10 ? undefined : lastPageParam + 1;
    },
    queryKey: queryKeys.getPosts(type),
  });
};

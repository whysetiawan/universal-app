import { useInfiniteQuery } from '@tanstack/react-query';

import postRepositoryImpl from '#/modules/posts/data/postRepositoryImpl';

export const usePostsQuery = () => {
  return useInfiniteQuery({
    initialPageParam: 1,
    queryFn: ({ pageParam }) => {
      return postRepositoryImpl.getPosts(pageParam, 10);
    },
    getNextPageParam: (lastPage, _, lastPageParam) => {
      return lastPage.length < 10 ? undefined : lastPageParam + 1;
    },
    queryKey: ['posts'],
  });
};

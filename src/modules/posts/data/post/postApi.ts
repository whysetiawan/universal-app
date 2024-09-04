import httpClient from '#/shared/lib/httpClient';

import type { PostDto } from './postDto';

export const getPosts = (page: number, limit: number) => {
  return httpClient.get<PostDto.GetPostsResponse>('api/posts', {
    params: {
      page,
      limit,
    },
  });
};

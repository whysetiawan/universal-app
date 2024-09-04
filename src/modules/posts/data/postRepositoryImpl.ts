import { getPosts } from '#/modules/posts/data/post/postApi';
import { mapGetPostsResponseToEntity } from '#/modules/posts/data/post/postMapper';
import type { PostsRepository } from '#/modules/posts/domain/postsRepository';

const postRepositoryImpl = (): PostsRepository => {
  return {
    getPosts: async (page, limit) => {
      const response = await getPosts(page, limit);
      const result = mapGetPostsResponseToEntity(response.data);
      return result;
    },
  };
};

export default postRepositoryImpl();

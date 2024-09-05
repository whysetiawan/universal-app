import type { PostEntity } from '#/modules/posts/domain/entities/postEntity';

export interface PostsRepository {
  getPosts(page: number, limit: number): Promise<PostEntity[]>;
}

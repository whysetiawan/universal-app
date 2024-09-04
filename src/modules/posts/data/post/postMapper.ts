import type { PostDto } from '#/modules/posts/data/post/postDto';
import * as memberEntity from '#/modules/posts/domain/entities/memberEntity';
import * as postEntity from '#/modules/posts/domain/entities/postEntity';
import * as postMedia from '#/modules/posts/domain/valueObjects/postMedia';

export const mapGetPostsResponseToEntity = (
  response: PostDto.GetPostsResponse,
): postEntity.PostEntity[] => {
  return response.postInfos.map((post) => {
    const [mediaType, mediaUri] = post.media.split('-');

    return postEntity.create({
      createdAt: post.createTime,
      id: post.postID,
      media: postMedia.create({
        height: post.mediaHeight,
        type: mediaType as 'image' | 'video',
        uri: mediaUri,
        width: post.mediaWidth,
      }),
      postedBy: memberEntity.create({
        avatar: post.userAvatar,
        username: post.userUsername,
      }),
      title: post.title,
    });
  });
};

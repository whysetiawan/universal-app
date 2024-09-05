import { z } from 'zod';

import { postMedia } from '../valueObjects/postMedia';

import { memberEntity } from './memberEntity';

const postEntity = z.object({
  id: z.string(),
  title: z.string(),
  createdAt: z.number(),
  postedBy: memberEntity,
  media: postMedia,
  tags: z.array(z.string()),
});

type RawPostEntity = z.infer<typeof postEntity>;

const create = (data: RawPostEntity) => {
  return postEntity.parse(data);
};

export type PostEntity = ReturnType<typeof create>;
export { create, postEntity };

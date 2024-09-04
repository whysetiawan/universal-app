import { z } from 'zod';

const postMedia = z.object({
  width: z.number(),
  height: z.number(),
  type: z.enum(['image', 'video']),
  uri: z.string(),
});

type RawPostMedia = z.infer<typeof postMedia>;

const create = (data: RawPostMedia) => {
  return postMedia.parse(data);
};

type PostMedia = ReturnType<typeof create>;

export { create, postMedia, PostMedia };

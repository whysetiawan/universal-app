import { z } from 'zod';

export const memberEntity = z.object({
  username: z.string(),
  avatar: z
    .string()
    .nullable()
    .default(
      'https://static.vecteezy.com/system/resources/previews/019/879/186/original/user-icon-on-transparent-background-free-png.png',
    ),
});

type RawMemberEntity = z.infer<typeof memberEntity>;

export const create = (data: RawMemberEntity) => {
  return memberEntity.parse(data);
};

export type Member = ReturnType<typeof create>;

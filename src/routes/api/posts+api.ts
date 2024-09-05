import { faker } from '@faker-js/faker';

interface GetPostsResponse {
  postInfos: PostInfo[];
  nextPage: number;
  hasMore: boolean;
}

interface PostInfo {
  postID: string;
  userID: string;
  title: string;
  totalUpvotes: number;
  totalDownvotes: number;
  totalComments: number;
  createTime: number;
  feed: number;
  searchVector: string;
  mediaWidth: number;
  mediaHeight: number;
  media: string;
  mediaThumbnail: null | string;
  sensitive: boolean;
  mediaType: number;
  pinCommentID: null;
  hashtags: string[];
  totalCoins: number;
  ageTime: number;
  bindTopicID: null;
  userUsername: string;
  userAvatar: null | string;
  userFrame: null;
  userPrivilege: number;
  userPlusTime: number;
}

export function GET(request: Request) {
  const url = new URL(request.url);
  const page = url.searchParams.get('page');
  const limit = url.searchParams.get('limit');
  const postInfos: PostInfo[] = Array.from({ length: Number(limit) }, () => {
    const width = faker.number.int({ min: 200, max: 800 });
    const height = faker.number.int({ min: 200, max: 1000 });
    const image = faker.image.urlLoremFlickr({
      width: width,
      height: height,
      category: 'meme',
    });

    const info: PostInfo = {
      feed: faker.number.int({ min: 1, max: 3 }),

      postID: faker.database.mongodbObjectId(),
      userID: faker.database.mongodbObjectId(),
      userUsername: faker.internet.userName(),
      bindTopicID: null,
      ageTime: faker.date.recent().getTime(),
      createTime: faker.date.recent().getTime(),
      hashtags: Array.from(
        { length: faker.number.int({ min: 0, max: 5 }) },
        () => faker.lorem.word(),
      ),
      media: `image-${image}`,
      mediaHeight: height,
      mediaWidth: width,
      mediaThumbnail: null,
      mediaType: 1,
      pinCommentID: null,
      searchVector: faker.lorem.sentence(),
      sensitive: false,
      title: faker.lorem.sentence(),
      totalCoins: faker.number.int({ min: 0, max: 100 }),
      totalComments: faker.number.int({ min: 0, max: 100 }),
      totalDownvotes: faker.number.int({ min: 0, max: 100 }),
      totalUpvotes: faker.number.int({ min: 0, max: 100 }),
      userAvatar: faker.image.avatarGitHub(),
      userFrame: null,
      userPlusTime: faker.date.recent().getTime(),
      userPrivilege: faker.number.int({ min: 0, max: 5 }),
    };

    return info;
  });
  const res: GetPostsResponse = {
    hasMore: true,
    nextPage: Number(page) + 1,
    postInfos,
  } as GetPostsResponse;
  return Response.json(res, {
    status: 200,
  });
}

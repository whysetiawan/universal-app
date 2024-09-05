export namespace PostDto {
  export interface GetPostsResponse {
    postInfos: PostInfo[];
    nextPage: number;
    hasMore: boolean;
  }

  export interface PostInfo {
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
}

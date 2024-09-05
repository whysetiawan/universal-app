export interface IGetTopicsResponse {
  topicInfos: TopicInfo[];
  nextPage: number;
  hasMore: boolean;
}

export interface TopicInfo {
  topicID: string;
  userID: string;
  title: string;
  media: string;
  totalMembers: number;
  totalPosts: number;
  createTime: number;
  searchVector: string;
  description: string;
  totalCoins: number;
  activeTime: number;
  userUsername: string;
  userAvatar: null | string;
  userFrame: null;
  userPrivilege: number;
  userPlusTime: number;
}

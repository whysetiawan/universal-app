import { memo } from 'react';
import type { ListRenderItem } from 'react-native';

import FlatList from '@/src/shared/components/FlatList/FlatList';

import FeedListItem from './FeedListItem';
import postDummy from './posts.json';

export type Post = (typeof postDummy.postInfos)[number];

const FeedList: React.FC = () => {
  const _renderItem: ListRenderItem<Post> = ({ item }) => {
    return <FeedListItem item={item} />;
  };

  return (
    <FlatList<Post>
      role="main"
      data={postDummy.postInfos}
      renderItem={_renderItem}
    />
  );
};

export default memo(FeedList);

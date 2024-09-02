import { memo } from 'react';
import { View, type ListRenderItem } from 'react-native';

import FlatList from '#/shared/lib/components/FlatList/FlatList';

import FeedListItem from './FeedListItem';
import postDummy from './posts.json';

export type Post = (typeof postDummy.postInfos)[number];

const FeedList: React.FC = () => {
  const _renderItem: ListRenderItem<Post> = ({ item }) => {
    return <FeedListItem item={item} />;
  };

  return (
    <FlatList<Post>
      showsVerticalScrollIndicator={false}
      role="main"
      data={postDummy.postInfos}
      renderItem={_renderItem}
      ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
    />
  );
};

export default memo(FeedList);

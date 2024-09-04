import { memo } from 'react';
import { View, type ListRenderItem } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import FlatList from '#/shared/lib/components/FlatList/FlatList';
import { s } from '#/shared/lib/styles';

import FeedListItem from './FeedListItem';
import postDummy from './posts.json';

export type Post = (typeof postDummy.postInfos)[number];

const FeedList: React.FC = () => {
  const _renderItem: ListRenderItem<Post> = ({ item }) => {
    return <FeedListItem item={item} />;
  };

  return (
    <SafeAreaView edges={['left']}>
      <FlatList<Post>
        contentContainerStyle={s.pt_lg}
        showsVerticalScrollIndicator={false}
        role="main"
        data={postDummy.postInfos}
        renderItem={_renderItem}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
      />
    </SafeAreaView>
  );
};

export default memo(FeedList);

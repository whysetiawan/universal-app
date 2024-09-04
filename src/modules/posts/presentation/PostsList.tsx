import { memo } from 'react';
import { View, type ListRenderItem } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { usePostsQuery } from '#/modules/posts/application/hooks/usePostsQuery';
import type { PostEntity } from '#/modules/posts/domain/entities/postEntity';
import FlatList from '#/shared/lib/components/FlatList/FlatList';
import { s } from '#/shared/lib/styles';
import logger from '#/shared/utils/logger';

import FeedListItem from './PostListItem';

const PostsList: React.FC = () => {
  const { data, fetchNextPage, error } = usePostsQuery();

  logger.log({
    id: 'FEDLIST',
    message: error?.message,
  });

  console.log('data', data);

  const posts = data?.pages.flat();

  const _renderItem: ListRenderItem<PostEntity> = ({ item }) => {
    return <FeedListItem item={item} />;
  };

  return (
    <SafeAreaView edges={['left']} style={s.flex_1}>
      <FlatList
        contentContainerStyle={[s.pt_lg, s.flex_grow]}
        refreshControl={<RefreshControl refreshing={false} />}
        showsVerticalScrollIndicator={false}
        role="main"
        data={posts ?? []}
        renderItem={_renderItem}
        onEndReached={() => fetchNextPage()}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
      />
    </SafeAreaView>
  );
};

export default memo(PostsList);

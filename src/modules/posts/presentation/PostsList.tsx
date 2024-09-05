import { memo, useCallback } from 'react';
import { Platform, View, type ListRenderItem } from 'react-native';
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

  const posts = data?.pages.flat();

  const _renderItem: ListRenderItem<PostEntity> = useCallback(({ item }) => {
    return <FeedListItem item={item} />;
  }, []);

  const _keyExtractor = useCallback((item: PostEntity) => item.id, []);

  return (
    <SafeAreaView edges={['left']} style={s.flex_1}>
      <FlatList
        removeClippedSubviews
        showsVerticalScrollIndicator={
          Platform.OS === 'android' || Platform.OS === 'ios'
        }
        maxToRenderPerBatch={3}
        keyExtractor={_keyExtractor}
        contentContainerStyle={[s.pt_lg, s.flex_grow]}
        refreshControl={<RefreshControl refreshing={false} />}
        windowSize={5}
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

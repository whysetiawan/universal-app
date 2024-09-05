import { memo, useCallback } from 'react';
import {
  ActivityIndicator,
  Platform,
  View,
  type ListRenderItem,
} from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { usePostsQuery } from '#/modules/posts/application/hooks/usePostsQuery';
import type { PostEntity } from '#/modules/posts/domain/entities/postEntity';
import useBreakpoints from '#/shared/lib/breakpoints/useBreakPoints';
import Divider from '#/shared/lib/components/Divider';
import FlatList from '#/shared/lib/components/FlatList/FlatList';
import { s } from '#/shared/lib/styles';

import PostListItem from './PostListItem';

const PostsList: React.FC = () => {
  const { gtPhone } = useBreakpoints();
  const {
    data,
    fetchNextPage,
    isPending,
    isFetchingNextPage,
    refetch,
    isRefetching,
  } = usePostsQuery();

  const posts = data?.pages.flat();

  const _renderItem: ListRenderItem<PostEntity> = useCallback(({ item }) => {
    return <PostListItem item={item} />;
  }, []);

  const _keyExtractor = useCallback((item: PostEntity) => item.id, []);

  if (isPending) {
    return (
      <View style={[s.flex_1, s.justify_center, s.items_center]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView edges={['left']} style={s.flex_1}>
      <FlatList
        removeClippedSubviews
        role="main"
        showsVerticalScrollIndicator={
          Platform.OS === 'android' || Platform.OS === 'ios'
        }
        maxToRenderPerBatch={10}
        onEndReachedThreshold={1}
        keyExtractor={_keyExtractor}
        contentContainerStyle={[s.pt_lg, s.flex_grow]}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
        windowSize={11}
        data={posts ?? []}
        renderItem={_renderItem}
        onEndReached={() => fetchNextPage()}
        ItemSeparatorComponent={() => {
          if (gtPhone) {
            return <Divider style={s.my_xl} />;
          }
          return <View style={{ height: 16 }} />;
        }}
        ListFooterComponent={() =>
          isFetchingNextPage ? <ActivityIndicator size="large" /> : null
        }
      />
    </SafeAreaView>
  );
};

export default memo(PostsList);

import { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import type { ViewToken } from 'react-native';
import {
  ActivityIndicator,
  Dimensions,
  Platform,
  View,
  type ListRenderItem,
} from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { PostType } from '#/modules/posts/application/hooks/usePostsQuery';
import { usePostsQuery } from '#/modules/posts/application/hooks/usePostsQuery';
import type { PostEntity } from '#/modules/posts/domain/entities/postEntity';
import useBreakpoints from '#/shared/lib/breakpoints/useBreakPoints';
import Divider from '#/shared/lib/components/Divider';
import FlatList from '#/shared/lib/components/FlatList/FlatList';
import { s } from '#/shared/lib/styles';

import PostListItem from './PostListItem';

interface PostsListProps {
  type?: PostType;
}

const PostsList: React.FC<PostsListProps> = ({ type }) => {
  const { gtPhone } = useBreakpoints();
  const {
    data,
    fetchNextPage,
    isPending,
    isFetchingNextPage,
    refetch,
    isRefetching,
  } = usePostsQuery(type);

  const scrollRef = useRef<FlatList>(null);
  const focusedIndex = useRef<number | null>(0);

  const posts = data?.pages.flat();

  const _renderItem: ListRenderItem<PostEntity> = useCallback(({ item }) => {
    return <PostListItem item={item} />;
  }, []);

  const _keyExtractor = useCallback((item: PostEntity) => item.id, []);

  const _renderFooter = useCallback(() => {
    if (isFetchingNextPage) {
      return <ActivityIndicator size="large" />;
    }
    return null;
  }, [isFetchingNextPage]);

  const _renderSeparator = useCallback(() => {
    if (gtPhone) {
      return <Divider style={s.my_xl} />;
    }
    return <View style={{ height: 16 }} />;
  }, [gtPhone]);

  const _onItemViewableItemsChanged = useCallback(
    (info: {
      viewableItems: ViewToken<PostEntity>[];
      changed: ViewToken<PostEntity>[];
    }) => {
      const { changed } = info;
      if (changed.length > 0) {
        for (const item of changed) {
          if (item.isViewable) {
            focusedIndex.current = item.index;
          }
        }
      }
    },
    [focusedIndex],
  );

  const viewabilityConfig = useMemo(() => {
    return {
      itemVisiblePercentThreshold: 40,
      minimumViewTime: 100,
    };
  }, []);

  const _onEndReached = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  useEffect(() => {
    if (Platform.OS === 'web') {
      return;
    }
    const dimChange = Dimensions.addEventListener('change', () => {
      if (focusedIndex.current) {
        scrollRef.current?.scrollToIndex({
          index: focusedIndex.current,
          animated: false,
        });
      }
    });

    return () => {
      dimChange.remove();
    };
  }, []);

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
        ref={scrollRef}
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
        onEndReached={_onEndReached}
        ItemSeparatorComponent={_renderSeparator}
        ListFooterComponent={_renderFooter}
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={_onItemViewableItemsChanged}
      />
    </SafeAreaView>
  );
};

export default memo(PostsList);

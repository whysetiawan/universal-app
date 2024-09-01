import { MaterialIcons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { memo } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { s } from '#/shared/lib/styles';

import type { Post } from './FeedList';
dayjs.extend(relativeTime);

const FeedListItem: React.FC<{ item: Post }> = ({ item }) => {
  console.log(' item.title', item.title);
  console.log('item.width', item.mediaWidth);
  console.log('item.mediaHeight', item.mediaHeight);
  return (
    <View style={s.gap_md}>
      <View style={s.px_lg}>
        <View style={[s.flex_row, s.justify_between, s.items_center]}>
          <View style={[s.flex_row, s.gap_sm, s.items_center]}>
            <AnonymousAvatar />
            <Text style={{ color: 'white' }}>{item.userUsername}</Text>
            <Text style={{ color: 'white' }}>
              · {dayjs(item.createTime).fromNow()}
            </Text>
          </View>
          <MaterialIcons name="more-horiz" color="white" size={24} />
        </View>
        <Text style={[{ color: 'white' }, s.my_sm]}>{item.title}</Text>
      </View>
      <View
        style={{
          width: '100%',
          aspectRatio: item.mediaWidth / item.mediaHeight,
          maxHeight: 720,
          maxWidth: 500,
        }}>
        <Image
          source={{
            uri: `https://cache.lahelu.com/${item.media}`,
          }}
          style={s.flex_1}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const AnonymousAvatar = () => {
  return (
    <View
      style={[styles.avatar, s.rounded_full, s.items_center, s.justify_center]}>
      <Text>😀</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 32,
    height: 32,
    backgroundColor: '#f0f0f0',
  },
});

export default memo(FeedListItem);

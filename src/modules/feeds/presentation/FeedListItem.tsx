import { MaterialIcons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Image } from 'expo-image';
import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useBreakpoints } from '#/shared/lib/breakpoints';
import { flatten, s } from '#/shared/lib/styles';

import type { Post } from './FeedList';
dayjs.extend(relativeTime);

const FeedListItem: React.FC<{ item: Post }> = ({ item }) => {
  const { gtPhone, gtMobile, gtTablet } = useBreakpoints();
  const aspectRatio =
    (gtPhone ? 20 + item.mediaWidth : item.mediaWidth) / item.mediaHeight;

  let spacing = 16;
  if (gtPhone) {
    spacing = 24;
  }
  if (gtMobile) {
    spacing = 32;
  }
  if (gtTablet) {
    spacing = 40;
  }

  return (
    <View style={s.gap_md}>
      <View
        style={{
          paddingHorizontal: spacing,
        }}>
        <View style={[s.flex_row, s.justify_between, s.items_center]}>
          <View style={[s.flex_row, s.gap_sm, s.items_center]}>
            <Avatar />
            <Text style={{ color: 'white' }}>{item.userUsername}</Text>
            <Text style={{ color: 'white' }}>
              · {dayjs(item.createTime).fromNow()}
            </Text>
          </View>
          <MaterialIcons name="more-horiz" color="white" size={24} />
        </View>
        <Text style={[{ color: 'white' }, s.my_sm]}>{item.title}</Text>
      </View>
      <Image
        source={{
          uri: `https://cache.lahelu.com/${item.media}`,
        }}
        style={{
          aspectRatio: aspectRatio,
          borderRadius: gtPhone ? 16 : 0,
          objectFit: 'contain',
          marginHorizontal: !gtPhone ? 0 : spacing,
        }}
      />
    </View>
  );
};

const Avatar = memo(() => {
  return (
    <View style={styles.avatar}>
      <Text>😀</Text>
    </View>
  );
});

Avatar.displayName = 'Avatar';

const styles = StyleSheet.create({
  avatar: flatten([
    {
      width: 32,
      height: 32,
      backgroundColor: '#f0f0f0',
    },
    s.rounded_full,
    s.items_center,
    s.justify_center,
  ]),
});

export default memo(FeedListItem);

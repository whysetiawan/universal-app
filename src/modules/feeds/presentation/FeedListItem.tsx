import { MaterialIcons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Image } from 'expo-image';
import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import useBreakpoints from '#/shared/lib/breakpoints';
import { s } from '#/shared/lib/styles';
import { useAppTheme } from '#/shared/lib/styles/theme';

import type { Post } from './FeedList';
dayjs.extend(relativeTime);

const FeedListItem: React.FC<{ item: Post }> = ({ item }) => {
  const { gtPhone, gtMobile, gtTablet } = useBreakpoints();
  const t = useAppTheme();
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
    spacing = 48;
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
            <Text style={t.utils.text}>{item.userUsername}</Text>
            <Text style={t.utils.text}>
              · {dayjs(item.createTime).fromNow()}
            </Text>
          </View>
          <MaterialIcons name="more-horiz" color={t.colors.text} size={24} />
        </View>
        <Text style={[t.utils.text, s.my_sm]}>{item.title}</Text>
      </View>
      <Image
        source={{
          uri: `https://cache.lahelu.com/${item.media}`,
        }}
        style={{
          aspectRatio: aspectRatio,
          borderRadius: gtPhone ? 8 : 0,
          objectFit: 'contain',
          marginHorizontal: !gtPhone ? 0 : spacing,
        }}
      />
    </View>
  );
};

const Avatar = memo(() => {
  const theme = useAppTheme();
  return (
    <View
      style={[
        styles.avatar,
        s.rounded_full,
        s.items_center,
        s.justify_center,
        theme.utils.background2,
      ]}>
      <Text>😀</Text>
    </View>
  );
});

Avatar.displayName = 'Avatar';

const styles = StyleSheet.create({
  avatar: {
    width: 32,
    height: 32,
  },
});

export default memo(FeedListItem);

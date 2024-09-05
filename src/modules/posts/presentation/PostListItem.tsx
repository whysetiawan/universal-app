import { MaterialIcons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Image } from 'expo-image';
import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import type { PostEntity } from '#/modules/posts/domain/entities/postEntity';
import TagList from '#/modules/posts/presentation/TagList';
import useBreakpoints from '#/shared/lib/breakpoints';
import Chip from '#/shared/lib/components/Chip';
import { s } from '#/shared/lib/styles';
import { useAppTheme } from '#/shared/lib/styles/theme';

dayjs.extend(relativeTime);

const PostListItem: React.FC<{ item: PostEntity }> = ({ item }) => {
  const { gtPhone, gtMobile, gtTablet } = useBreakpoints();
  const t = useAppTheme();
  const aspectRatio =
    (gtPhone ? 20 + item.media.width : item.media.width) / item.media.height;

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
            <Text style={t.utils.text}>{item.postedBy.username}</Text>
            <Text style={t.utils.text}>
              · {dayjs(item.createdAt).fromNow()}
            </Text>
          </View>
          <MaterialIcons name="more-horiz" color={t.colors.text} size={24} />
        </View>
        <Text style={[t.utils.text, s.my_sm]}>{item.title}</Text>
      </View>
      <Image
        source={{
          uri: item.media.uri,
        }}
        style={{
          aspectRatio: aspectRatio,
          borderRadius: gtPhone ? 8 : 0,
          objectFit: 'contain',
          marginHorizontal: !gtPhone ? 0 : spacing,
          backgroundColor: t.colors.background,
        }}
      />
      <View
        style={{
          paddingHorizontal: spacing,
        }}>
        <View style={[s.flex_row, s.gap_md, s.flex_wrap]}>
          <Chip
            style={{
              backgroundColor: '#dd952a',
              borderColor: '#dd952a',
            }}>
            <View style={[s.flex_row, s.items_center, s.gap_sm]}>
              <Text style={t.utils.text}>$</Text>
              <Text style={[t.utils.text, s.font_bold]}>Sawer</Text>
            </View>
          </Chip>
          <TagList tags={item.tags} />
        </View>
      </View>
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

export default memo(PostListItem);

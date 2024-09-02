import { useTheme } from '@react-navigation/native';
import { Image } from 'expo-image';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { useBreakpoints } from '#/shared/lib/breakpoints';
import Divider from '#/shared/lib/components/Divider';
import { s } from '#/shared/lib/styles';
import topics from '#/temporaries/topics.json';

export const ADVERT_BAR_WIDTH = 340;

const AdvertBar = () => {
  const { gtMobile } = useBreakpoints();
  const { colors } = useTheme();
  if (!gtMobile) return null;

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={s.flex_grow_0}
      contentContainerStyle={[styles.wrapper, s.p_md]}>
      {topics.topicInfos.map((topic) => {
        return (
          <View key={topic.topicID}>
            <View
              role="article"
              style={[s.flex_row, s.w_full, s.gap_md, s.items_center]}>
              <Image
                source={{
                  uri: `https://cache.lahelu.com/${topic.media}`,
                }}
                style={[s.rounded_lg, styles.media]}
              />
              <View>
                <Text
                  style={[
                    { color: colors.text, fontSize: 16, fontWeight: 'bold' },
                    s.ml_md,
                  ]}>
                  {topic.title}
                </Text>
                <Text style={[{ color: '#cccccc' }, s.ml_md]}>
                  {topic.totalMembers}+ Member
                </Text>
              </View>
            </View>
            <Divider style={s.my_lg} />
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: ADVERT_BAR_WIDTH,
  },
  media: {
    width: 64,
    height: 64,
  },
});

export default AdvertBar;

import { Ionicons } from '@expo/vector-icons';
import { memo } from 'react';
import { Text, View } from 'react-native';

import Divider from '#/shared/lib/components/Divider';
import IconButton from '#/shared/lib/components/IconButton';
import { s } from '#/shared/lib/styles';
import { useAppTheme } from '#/shared/lib/styles/theme';

const SearchBar = () => {
  const t = useAppTheme();

  return (
    <>
      <View
        style={[
          s.flex_row,
          s.justify_between,
          s.items_center,
          s.px_lg,
          s.py_sm,
          { height: 56 },
        ]}>
        <Text
          role="heading"
          aria-level={3}
          style={[s.text_xl, s.font_bold, t.utils.text]}>
          Cari meme
        </Text>
        <IconButton>
          <Ionicons name="close" color={t.colors.text} size={20} />
        </IconButton>
      </View>
      <Divider style={t.utils.border} />
    </>
  );
};

export default memo(SearchBar);

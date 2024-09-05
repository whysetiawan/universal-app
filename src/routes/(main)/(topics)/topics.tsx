import { Text, View } from 'react-native';

import { s } from '#/shared/lib/styles';
import { useAppTheme } from '#/shared/lib/styles/theme';

export default function TopicScreen() {
  const t = useAppTheme();
  return (
    <View style={[s.flex_1, s.items_center, s.justify_center]}>
      <Text style={[s.font_bold, t.utils.text]}>Topic Screen</Text>
    </View>
  );
}

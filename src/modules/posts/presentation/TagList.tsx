import { Text, View } from 'react-native';

import Chip from '#/shared/lib/components/Chip';
import { s } from '#/shared/lib/styles';
import { useAppTheme } from '#/shared/lib/styles/theme';

interface TagListProps {
  tags: string[];
}

const TagList: React.FC<TagListProps> = ({ tags }) => {
  const t = useAppTheme();
  return (
    <View style={[s.flex_row, s.gap_md, s.flex_wrap]}>
      {tags.map((tag) => (
        <Chip key={tag}>
          <View style={[s.flex_row, s.items_center, s.gap_sm]}>
            <Text style={[t.utils.text, s.font_bold]}>#</Text>
            <Text style={[t.utils.text]}>{tag}</Text>
          </View>
        </Chip>
      ))}
    </View>
  );
};

export default TagList;

import React, { memo } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';

import { useAppTheme } from '#/shared/lib/styles/theme';

interface IDividerProps {
  color?: string;
  direction?: 'horizontal' | 'vertical';
  style?: StyleProp<ViewStyle>;
}

const Divider: React.FC<IDividerProps> = ({
  color,
  direction = 'horizontal',
  style,
}) => {
  const styleDirection =
    direction === 'horizontal'
      ? styles.dividerHorizontal
      : styles.dividerVertical;
  const theme = useAppTheme();

  return (
    <View
      style={StyleSheet.flatten([
        styleDirection,
        { backgroundColor: color ?? theme.colors.border },
        style,
      ])}
    />
  );
};

const styles = StyleSheet.create({
  dividerHorizontal: {
    height: StyleSheet.hairlineWidth,
    width: '100%',
  },
  dividerVertical: {
    width: StyleSheet.hairlineWidth,
    height: '100%',
  },
});

export default memo(Divider);

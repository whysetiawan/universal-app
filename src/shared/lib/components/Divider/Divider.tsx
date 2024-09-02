import React, { memo } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';

interface IDividerProps {
  color?: string;
  direction?: 'horizontal' | 'vertical';
  style?: StyleProp<ViewStyle>;
}

const Divider: React.FC<IDividerProps> = ({
  color = '#414141',
  direction = 'horizontal',
  style,
}) => {
  const styleDirection =
    direction === 'horizontal'
      ? styles.dividerHorizontal
      : styles.dividerVertical;

  return (
    <View
      style={StyleSheet.flatten([
        styleDirection,
        { backgroundColor: color },
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

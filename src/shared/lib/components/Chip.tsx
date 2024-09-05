import type { PropsWithChildren } from 'react';
import { memo } from 'react';
import type { PressableProps, StyleProp, ViewStyle } from 'react-native';
import { Pressable, StyleSheet, Text } from 'react-native';

interface ChipProps extends PressableProps {
  style?: StyleProp<ViewStyle>;
  children: string | React.ReactNode;
  onPress?: () => void;
}

const Chip: React.FC<PropsWithChildren<ChipProps>> = ({
  children,
  onPress,
  style,
}) => {
  return (
    <Pressable style={[styles.container, style]} onPress={onPress}>
      {typeof children === 'string' ? <Text>{children}</Text> : <>{children}</>}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 4,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'rgb(209, 209, 214)',
  },
});

export default memo(Chip);

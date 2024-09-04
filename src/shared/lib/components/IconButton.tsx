import { useState, type PropsWithChildren } from 'react';
import type { PressableProps, ViewStyle } from 'react-native';
import { Pressable, StyleSheet } from 'react-native';

import { useAppTheme } from '#/shared/lib/styles/theme';

export interface IconButtonProps extends PressableProps {
  children: React.ReactNode;
}

const IconButton: React.FC<PropsWithChildren<PressableProps>> = (props) => {
  const theme = useAppTheme();
  const [isHovered, setIsHovered] = useState(false);

  const hoveredColor = isHovered ? theme.colors.border : 'transparent';

  return (
    <Pressable
      style={[
        styles.wrapper,
        { backgroundColor: hoveredColor },
        props.style as ViewStyle,
      ]}
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
      {...props}>
      {props.children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 8,
    borderRadius: 999,
  },
});

export default IconButton;

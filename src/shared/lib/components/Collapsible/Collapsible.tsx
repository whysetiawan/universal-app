import type { PropsWithChildren } from 'react';
import { useEffect, useState } from 'react';
import { Animated } from 'react-native';

interface CollapsibleProps {
  collapsed?: boolean;
}

const Collapsible: React.FC<PropsWithChildren<CollapsibleProps>> = ({
  children,
  collapsed = false,
  ...props
}) => {
  return (
    <Animated.View {...props}>
      <Animated.View>{collapsed ? null : children}</Animated.View>
    </Animated.View>
  );
};

export default Collapsible;

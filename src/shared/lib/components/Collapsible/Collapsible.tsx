import React, { useState, useRef, useLayoutEffect } from 'react';
import type { ViewStyle, StyleProp, View, EasingFunction } from 'react-native';
import { Animated, Easing } from 'react-native';

type CollapsibleProps = {
  collapsed?: boolean;
  collapsedHeight?: number;
  enablePointerEvents?: boolean;
  duration?: number;
  easing?: Easing | EasingFunction;
  onAnimationEnd?: () => void;
  renderChildrenCollapsed?: boolean;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
};

const Collapsible: React.FC<CollapsibleProps> = ({
  collapsed = true,
  collapsedHeight = 0,
  enablePointerEvents = false,
  duration = 250,
  onAnimationEnd = () => null,
  renderChildrenCollapsed = false,
  easing = Easing.inOut(Easing.cubic),
  style,
  children,
}) => {
  const [measuring, setMeasuring] = useState(false);
  const [measured, setMeasured] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const [animating, setAnimating] = useState(false);

  const [height] = useState(new Animated.Value(collapsedHeight));
  const contentHandle = useRef<View>(null);

  useLayoutEffect(() => {
    const measureContent = (callback: (height: number) => void) => {
      setMeasuring(true);
      if (contentHandle.current) {
        const ref = contentHandle.current;
        ref.measure((_x, _y, _width, height) => {
          setMeasuring(false);
          setMeasured(true);
          setContentHeight(height);
          callback(height);
        });
      } else {
        setMeasuring(false);
        callback(collapsedHeight);
      }
    };

    const animateHeight = (heightValue: number) => {
      setAnimating(true);
      Animated.timing(height, {
        toValue: heightValue,
        duration,
        easing: easing as any,
        useNativeDriver: true,
      }).start(() => {
        setAnimating(false);
        onAnimationEnd();
      });
    };
    if (collapsed) {
      animateHeight(0);
    } else if (contentHandle.current) {
      measureContent((measuredHeight) => animateHeight(measuredHeight));
    }
  }, [collapsed, collapsedHeight, duration, easing, height, onAnimationEnd]);

  const hasKnownHeight = !measuring && (measured || collapsed);
  const styleAnim: StyleProp<ViewStyle> = {
    overflow: 'hidden',
    height: hasKnownHeight ? height : 0,
  };

  const contentStyle: StyleProp<ViewStyle> = {};
  if (measuring) {
    contentStyle.position = 'absolute';
    contentStyle.opacity = 0;
  }
  if (animating) {
    contentStyle.height = contentHeight;
  }
  const shouldRenderChildren =
    renderChildrenCollapsed ||
    ((!collapsed || (collapsed && animating)) &&
      (animating || measuring || measured));

  return (
    <Animated.View
      style={styleAnim}
      pointerEvents={!enablePointerEvents && collapsed ? 'none' : 'auto'}>
      <Animated.View ref={contentHandle} style={[style, contentStyle]}>
        {shouldRenderChildren && children}
      </Animated.View>
    </Animated.View>
  );
};

export default Collapsible;

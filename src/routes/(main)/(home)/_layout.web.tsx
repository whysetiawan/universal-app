import type { Href } from 'expo-router';
import { Slot, usePathname, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Divider from '#/shared/lib/components/Divider';
import { s, theme } from '#/shared/lib/styles';
import { useAppTheme } from '#/shared/lib/styles/theme';

const TabHomeLayout = () => {
  return (
    <>
      <Header />
      <Slot />
    </>
  );
};

type HomeRoutes = {
  route: Href;
  title: string;
}[];

const HOME_ROUTES: HomeRoutes = [
  {
    title: 'Home',
    route: '/(home)/',
  },
  {
    route: '/(home)/fresh',
    title: 'Fresh',
  },
  {
    route: '/(home)/trending',
    title: 'Trending',
  },
];

const Header = () => {
  const t = useAppTheme();
  const router = useRouter();
  const pathname = usePathname();
  const [indicatorPosition] = useState(new Animated.Value(0));

  const currentActiveTab = HOME_ROUTES.findIndex((route) =>
    route.route.toString().endsWith(pathname),
  );

  useEffect(() => {
    Animated.timing(indicatorPosition, {
      toValue: currentActiveTab,
      duration: 300,
      useNativeDriver: false,
      easing: Easing.linear,
    }).start();
  }, [currentActiveTab, indicatorPosition]);

  const interpolation = HOME_ROUTES.reduce(
    (acc, _, index) => {
      acc.inputRange.push(index);
      acc.outputRange.push((index * 100).toString() + '%');
      return acc;
    },
    {
      inputRange: [] as number[],
      outputRange: [] as string[],
    },
  );

  const indicatorX = indicatorPosition.interpolate(interpolation);

  return (
    <>
      <View style={[s.w_full, s.flex_row]}>
        {HOME_ROUTES.map((href, idx) => {
          const isActive = currentActiveTab === idx;
          return (
            <Pressable
              key={href.title}
              onPress={() => router.navigate(href.route)}
              style={[styles.tabItem, t.utils.background]}>
              <Text
                style={[
                  s.text_md,
                  s.font_bold,
                  {
                    color: isActive ? t.colors.primary : t.colors.text,
                  },
                ]}>
                {href.title}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <Animated.View
        style={[
          styles.indicator,
          {
            width: `${100 / HOME_ROUTES.length}%`,
            transform: [{ translateX: indicatorX }],
          },
        ]}
      />
      <Divider />
    </>
  );
};

const styles = StyleSheet.create({
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
  indicator: {
    bottom: 0.5,
    height: 3,
    backgroundColor: theme.LightTheme.colors.primary,
  },
});

export default TabHomeLayout;

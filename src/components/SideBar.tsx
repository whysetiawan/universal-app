import { Ionicons } from '@expo/vector-icons';
import type { Href } from 'expo-router';
import { usePathname, useRouter } from 'expo-router';
import { memo, useState } from 'react';
import { Animated, Pressable, Text, View } from 'react-native';

import useBreakpoints from '#/shared/lib/breakpoints';
import Collapsible from '#/shared/lib/components/Collapsible';
import Divider from '#/shared/lib/components/Divider';
import { s } from '#/shared/lib/styles';
import { useAppTheme } from '#/shared/lib/styles/theme';

type SideMainMenuItemProps = {
  title: string;
  Icon: React.FC<{ color: string }>;
  route: string;
  isActive: boolean;
};

const SideMainMenuItem: React.FC<SideMainMenuItemProps> = ({
  Icon,
  route,
  title,
  isActive,
}) => {
  const t = useAppTheme();
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const itemColor =
    isHovered && !isActive
      ? t.colors.border
      : isActive
        ? t.colors.primary
        : 'transparent';

  return (
    <View
      role="listitem"
      style={[
        {
          backgroundColor: itemColor,
        },
        s.px_lg,
        s.py_sm,
      ]}>
      <Pressable
        role="link"
        onHoverIn={() => setIsHovered(true)}
        onHoverOut={() => setIsHovered(false)}
        onPress={() => router.navigate(route as Href)}
        style={[s.flex_row, s.gap_md, s.items_center]}>
        <Icon color={t.colors.text}></Icon>
        <Text
          style={[
            t.utils.text,
            isActive ? s.font_bold : s.font_normal,
            s.text_lg,
          ]}>
          {title}
        </Text>
      </Pressable>
    </View>
  );
};

const OTHER_MEMES_MENU: typeof SIDE_MAIN_MENU = [
  {
    title: 'Peringkat',
    Icon: (props) => (
      <Ionicons size={20} color={props.color} name="trophy-outline" />
    ),
    route: '/leaderboard',
  },
  {
    title: 'Tersimpan',
    Icon: (props) => (
      <Ionicons size={20} color={props.color} name="book-outline" />
    ),
    route: '/saved',
  },
  {
    title: 'Acak',
    Icon: (props) => (
      <Ionicons size={20} color={props.color} name="shuffle-outline" />
    ),
    route: '/shuffle',
  },
];

const OtherMemes = () => {
  const t = useAppTheme();
  const { colors } = useAppTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [rotate] = useState(new Animated.Value(0));

  const itemColor = isHovered ? colors.border : 'transparent';

  return (
    <View>
      <View
        role="listitem"
        style={[
          {
            backgroundColor: itemColor,
          },
          s.px_lg,
          s.py_sm,
        ]}>
        <Pressable
          role="link"
          onPress={() => {
            setIsCollapsed((prev) => !prev);
            Animated.timing(rotate, {
              toValue: isCollapsed ? 1 : 0,
              duration: 250,
              useNativeDriver: true,
            }).start();
          }}
          onHoverIn={() => setIsHovered(true)}
          onHoverOut={() => setIsHovered(false)}
          style={[s.flex_row, s.gap_md, s.items_center, s.justify_between]}>
          <Text style={[t.utils.text, s.font_semibold, s.text_lg]}>
            Meme lain
          </Text>
          <Animated.View
            style={{
              transform: [
                {
                  rotate: rotate.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['180deg', '0deg'],
                  }),
                },
              ],
            }}>
            <Ionicons name="triangle-outline" size={16} color={colors.text} />
          </Animated.View>
        </Pressable>
      </View>
      <Collapsible collapsed={isCollapsed}>
        <View role="list">
          {OTHER_MEMES_MENU.map(({ Icon, route, title }) => {
            return (
              <SideMainMenuItem
                key={route}
                title={title}
                Icon={Icon}
                route={route}
                isActive={false}
              />
            );
          })}
        </View>
      </Collapsible>
    </View>
  );
};

const SIDE_MAIN_MENU = [
  {
    title: 'Home',
    Icon: (props: { color: string }) => (
      <Ionicons size={20} color={props.color} name="home-outline" />
    ),
    route: '/',
  },
  {
    title: 'Fresh',
    Icon: (props: { color: string }) => (
      <Ionicons size={20} color={props.color} name="watch-outline" />
    ),
    route: '/fresh',
  },
  {
    title: 'Trending',
    Icon: (props: { color: string }) => (
      <Ionicons size={20} color={props.color} name="trending-up" />
    ),
    route: '/trending',
  },
  {
    title: 'Topik',
    Icon: (props: { color: string }) => (
      <Ionicons size={20} color={props.color} name="people-outline" />
    ),
    route: '/topics',
  },
];

const SideBar = () => {
  const { gtTablet } = useBreakpoints();
  const path = usePathname();

  if (!gtTablet) return null;

  return (
    <View role="navigation" style={[{ width: 230 }, s.mt_sm]}>
      <View role="list">
        <View role="list">
          {SIDE_MAIN_MENU.map((item) => {
            const isActive =
              (item.route === '/' && item.route === path) ||
              (item.route !== '/' && path.startsWith(item.route));
            return (
              <SideMainMenuItem
                key={item.route}
                {...item}
                isActive={isActive}
              />
            );
          })}
        </View>
        <Divider style={s.my_xs} />
        <OtherMemes />
      </View>
    </View>
  );
};

export default memo(SideBar);

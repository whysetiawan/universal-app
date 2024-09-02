import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import type { Href } from 'expo-router';
import { usePathname, useRouter } from 'expo-router';
import { memo, useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { useBreakpoints } from '#/shared/lib/breakpoints';
import Collapsible from '#/shared/lib/components/Collapsible';
import Divider from '#/shared/lib/components/Divider';
import { s } from '#/shared/lib/styles';

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
  const { colors } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const itemColor =
    isHovered && !isActive
      ? colors.border
      : isActive
        ? colors.primary
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
        <Icon color={colors.text}></Icon>
        <Text
          style={[
            {
              color: colors.text,
            },
            s.font_bold,
          ]}>
          {title}
        </Text>
      </Pressable>
    </View>
  );
};

const OtherMemes = () => {
  const { colors } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);

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
          onPress={() => setIsCollapsed((prev) => !prev)}
          onHoverIn={() => setIsHovered(true)}
          onHoverOut={() => setIsHovered(false)}
          style={[s.flex_row, s.gap_md, s.items_center]}>
          <Text
            style={[
              {
                color: colors.text,
              },
              s.font_bold,
            ]}>
            Meme lain
          </Text>
          {/* <Icon color={colors.text}></Icon> */}
        </Pressable>
      </View>
      <Collapsible collapsed={isCollapsed}>
        <View
          style={{
            height: 200,
            backgroundColor: 'red',
          }}>
          <Text>Other Memes</Text>
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
] as const;

const SideBar = () => {
  const { gtTablet } = useBreakpoints();
  const path = usePathname();

  if (!gtTablet) return null;

  return (
    <View style={{ width: 230 }}>
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

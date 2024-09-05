import { Ionicons } from '@expo/vector-icons';
import type { Href } from 'expo-router';
import { usePathname, useRouter } from 'expo-router';
import { memo, useEffect, useState } from 'react';
import { Animated, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useSideBar } from '#/components/SideBar/SideBarContext';
import BackDrop from '#/shared/lib/components/BackDrop';
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
              useNativeDriver: false,
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
  const path = usePathname();
  const t = useAppTheme();

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      role="navigation"
      style={[
        { width: 230 },
        s.flex_grow_0,
        s.pt_sm,
        t.utils.background,
        s.h_full,
      ]}>
      <SafeAreaView role="list">
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
        <OtherMemes />
        <OtherMemes />
        <OtherMemes />
      </SafeAreaView>
    </ScrollView>
  );
};

interface SideBarProps {
  asDrawer?: boolean;
}

const SideBarImpl: React.FC<SideBarProps> = ({ asDrawer }) => {
  const { isSideBarOpen, closeSideBar } = useSideBar();
  const [isBackDropVisible, setIsBackDropVisible] = useState(false);
  const [transX] = useState(new Animated.Value(-230));

  useEffect(() => {
    if (!asDrawer) {
      return;
    }
    if (isSideBarOpen) {
      setIsBackDropVisible(true);
      Animated.timing(transX, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(transX, {
        toValue: -232,
        duration: 250,
        useNativeDriver: true,
      }).start(() => {
        setIsBackDropVisible(false);
      });
    }
  }, [asDrawer, isSideBarOpen, transX]);

  if (asDrawer) {
    return (
      <BackDrop
        visible={isBackDropVisible}
        style={[s.h_full]}
        onPress={closeSideBar}>
        <Animated.View
          style={{
            height: '100%',
            transform: [{ translateX: transX }],
          }}>
          <SideBar />
        </Animated.View>
      </BackDrop>
    );
  }
  return <SideBar />;
};
export default memo(SideBarImpl);

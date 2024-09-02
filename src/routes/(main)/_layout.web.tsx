import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { Tabs } from 'expo-router';
import React from 'react';
import type { DimensionValue } from 'react-native';
import { Platform, View } from 'react-native';

import AdvertBar from '#/components/AdvertBar';
import SideBar from '#/components/SideBar';
import { useBreakpoints } from '#/shared/lib/breakpoints';
import { s } from '#/shared/lib/styles';

const TabRoutes = () => {
  const { gtPhone, gtMobile } = useBreakpoints();
  const { colors } = useTheme();
  return (
    <Tabs
      sceneContainerStyle={[
        gtPhone && s.border_r,
        gtMobile && s.border_l,
        {
          borderColor: colors.border,
        },
      ]}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          display: !gtPhone ? 'flex' : 'none',
        },
      }}>
      <Tabs.Screen
        name="(home)/index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" color={color} size={30} />
          ),
        }}
      />

      <Tabs.Screen
        name="(topics)/topics"
        options={{
          title: 'Topic',
          tabBarIcon: ({ color }) => (
            <Ionicons name="people" color={color} size={30} />
          ),
        }}
      />

      <Tabs.Screen
        name="add-post"
        /**
         * Prevent the tab from being focused when pressed.
         * This is a workaround when the tab is used to open a modal.
         */
        listeners={(_) => {
          return {
            tabPress: (e) => {
              e.preventDefault();
            },
          };
        }}
        options={{
          title: 'Add Post',
          tabBarIcon: ({ color }) => (
            <Ionicons name="add-circle-outline" color={color} size={30} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        /**
         * Prevent the tab from being focused when pressed.
         * This is a workaround when the tab is used to open a modal.
         */
        listeners={(_) => {
          return {
            tabPress: (e) => {
              e.preventDefault();
            },
          };
        }}
        options={{
          title: 'Add Post',
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-circle-outline" color={color} size={30} />
          ),
        }}
      />
    </Tabs>
  );
};
const WebTabLayout = () => {
  return (
    <View
      style={[
        s.flex_row,
        s.flex_1,
        s.mx_auto,
        s.w_full,
        {
          maxWidth: Platform.select({
            web: `min(1200px, 100vw)` as DimensionValue,
            native: '100%',
          }),
        },
      ]}>
      <SideBar />
      <View style={[s.flex_grow, s.flex_shrink]}>
        <TabRoutes />
      </View>
      <AdvertBar />
    </View>
  );
};

export default WebTabLayout;

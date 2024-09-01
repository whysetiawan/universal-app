import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import { useBreakpoints } from '#/shared/lib/breakpoints';

function TabRoutes() {
  const { gtPhone } = useBreakpoints();

  return (
    <Tabs
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
}

export default function WebTabLayout() {
  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <Tabs />
    </View>
  );
}

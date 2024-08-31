import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
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

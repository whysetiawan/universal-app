import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import type { DimensionValue } from 'react-native';
import { View, Pressable, StyleSheet, Platform, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import useBreakpoints from '#/shared/lib/breakpoints';
import IconButton from '#/shared/lib/components/IconButton';
import { s } from '#/shared/lib/styles';
import { useAppTheme } from '#/shared/lib/styles/theme';

const HeaderNavBar = () => {
  const t = useAppTheme();

  return (
    <SafeAreaView edges={['top', 'left']}>
      <View
        style={[
          s.w_full,
          styles.headNavBarWrapper,
          s.border_b,
          s.items_center,
          t.utils.background,
          t.utils.border,
        ]}>
        <View
          style={[
            styles.headNavBar,
            s.items_center,
            s.flex_row,
            s.px_lg,
            s.gap_sm,
          ]}>
          <HeaderLeft />
          <HeaderRight />
        </View>
      </View>
    </SafeAreaView>
  );
};

const HeaderLeft = () => {
  const router = useRouter();
  const { colors } = useAppTheme();
  const { gtTablet } = useBreakpoints();

  if (gtTablet) {
    return (
      <Pressable style={s.flex_grow} onPress={() => router.navigate('/')}>
        <Text style={styles.logo}>LAHELU</Text>
      </Pressable>
    );
  }

  return (
    <>
      <IconButton>
        <Ionicons name="menu-outline" size={24} color={colors.text} />
      </IconButton>

      <Pressable style={s.flex_grow} onPress={() => router.navigate('/')}>
        <Text style={styles.logo}>LAHELU</Text>
      </Pressable>
    </>
  );
};

const HeaderRight = () => {
  const { colors } = useAppTheme();
  const { gtPhone } = useBreakpoints();

  if (!gtPhone) {
    return (
      <IconButton>
        <Ionicons name="search" size={24} color={colors.text} />
      </IconButton>
    );
  }

  return (
    <>
      <IconButton>
        <Ionicons name="search" size={24} color={colors.text} />
      </IconButton>
      <View style={[s.flex_row, s.gap_sm]}>
        <IconButton>
          <Ionicons name="add-circle-outline" size={24} color={colors.text} />
        </IconButton>
        <IconButton>
          <Ionicons
            name="person-circle-outline"
            size={24}
            color={colors.text}
          />
        </IconButton>
      </View>
    </>
  );
};

export default HeaderNavBar;

const styles = StyleSheet.create({
  headNavBarWrapper: {
    height: 50,
  },
  headNavBar: {
    height: '100%',
    width: Platform.select({
      web: 'min(1200px, 100vw)' as DimensionValue,
      native: '100%',
    }),
  },
  logo: {
    color: 'rgb(101, 164, 236)',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

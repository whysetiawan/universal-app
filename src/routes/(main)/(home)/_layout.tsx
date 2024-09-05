import RouterTopTabs from '#/shared/lib/components/RouterTopTabs';
import { useAppTheme } from '#/shared/lib/styles/theme';

const TabsHomeLayout = () => {
  const t = useAppTheme();
  return (
    <RouterTopTabs
      overScrollMode="always"
      screenOptions={{
        swipeEnabled: false,
        animationEnabled: true,
        tabBarActiveTintColor: t.colors.primary,
        tabBarStyle: {
          backgroundColor: t.colors.background,
        },
        tabBarLabelStyle: {
          textTransform: 'none',
          fontWeight: 'bold',
          fontSize: 16,
        },
      }}>
      <RouterTopTabs.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />

      <RouterTopTabs.Screen
        name="fresh"
        options={{
          title: 'Fresh',
        }}
      />

      <RouterTopTabs.Screen
        name="trending"
        options={{
          title: 'Trending',
        }}
      />
    </RouterTopTabs>
  );
};

export default TabsHomeLayout;

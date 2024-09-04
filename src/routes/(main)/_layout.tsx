import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import SideBar from '#/components/SideBar';
import { s } from '#/shared/lib/styles';

const MainLayout = () => {
  return (
    <GestureHandlerRootView style={s.flex_1}>
      <Drawer
        screenOptions={{
          headerShown: false,
          drawerStyle: {
            width: 230,
          },
        }}
        drawerContent={(props) => {
          return (
            <DrawerContentScrollView {...props}>
              <SideBar />
            </DrawerContentScrollView>
          );
        }}
      />
    </GestureHandlerRootView>
  );
};

export default MainLayout;

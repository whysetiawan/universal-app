// import { TabRouter } from '@react-navigation/native';
// import { Navigator, usePathname, Slot, Link } from 'expo-router';
// import { View } from 'react-native';

// export default function App() {
//   return (
//     <Navigator router={TabRouter}>
//       <Header />
//       <Slot />
//     </Navigator>
//   );
// }

// function Header() {
//   const { navigation, state, descriptors, router } = Navigator.useContext();

//   const pathname = usePathname();

//   return (
//     <View>
//       <Link href="/">Home</Link>
//       <Link
//         href="/profile"
//         // Use `pathname` to determine if the link is active.
//         style={[pathname === '/profile' && { color: 'blue' }]}>
//         Profile
//       </Link>
//       <Link href="/settings">Settings</Link>
//     </View>
//   );
// }

// TODO: create custom top tabs navigator for web
import type {
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
} from '@react-navigation/material-top-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import type {
  ParamListBase,
  TabNavigationState,
} from '@react-navigation/native';
import { withLayoutContext } from 'expo-router';

const { Navigator } = createMaterialTopTabNavigator();

const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

export default MaterialTopTabs;

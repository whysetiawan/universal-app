import type { Theme as NavigationTheme } from '@react-navigation/native';

export const DarkTheme: NavigationTheme = {
  colors: {
    background: 'rgb(26,26,26)',
    border: '#414141',
    card: 'rgb(18, 18, 18)',
    notification: 'rgb(255, 69, 58)',
    primary: 'rgb(10, 132, 255)',
    text: 'rgb(229, 229, 231)',
  },
  dark: true,
};

export const LightTheme: NavigationTheme = {
  colors: {
    background: 'rgb(242, 242, 247)',
    border: 'rgb(209, 209, 214)',
    card: 'rgb(255, 255, 255)',
    notification: 'rgb(255, 69, 58)',
    primary: 'rgb(0, 122, 255)',
    text: 'rgb(28, 28, 30)',
  },
  dark: false,
};

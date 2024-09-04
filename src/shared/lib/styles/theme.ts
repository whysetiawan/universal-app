import { useTheme, type Theme } from '@react-navigation/native';

export const DarkTheme: Theme = {
  colors: {
    background: 'rgb(26,26,26)',
    border: '#414141',
    card: 'rgb(18, 18, 18)',
    notification: 'rgb(255, 69, 58)',
    primary: 'rgb(101, 164, 236)',
    text: 'rgb(229, 229, 231)',
    backdrop: 'rgba(26,26,26,0.5)',
  },
  utils: {
    backdrop: {
      backgroundColor: 'rgba(26,26,26,0.5)',
    },
    background: {
      backgroundColor: 'rgb(26,26,26)',
    },
    background2: {
      backgroundColor: '#1a1a1a',
    },
    border: {
      borderColor: '#414141',
    },
    card: {
      backgroundColor: 'rgb(18, 18, 18)',
    },
    notification: {
      backgroundColor: 'rgb(255, 69, 58)',
    },
    text: {
      color: 'rgb(229, 229, 231)',
    },
  },
  dark: true,
};

export const LightTheme: Theme = {
  colors: {
    background: 'rgb(242, 242, 247)',
    border: 'rgb(209, 209, 214)',
    card: 'rgb(255, 255, 255)',
    notification: 'rgb(255, 69, 58)',
    primary: 'rgb(101, 164, 236)',
    text: 'rgb(28, 28, 30)',
    backdrop: 'rgb(26,26,26,0.5)',
  },
  utils: {
    backdrop: {
      backgroundColor: 'rgba(26,26,26,0.5)',
    },
    background: {
      backgroundColor: 'rgb(242, 242, 247)',
    },
    background2: {
      backgroundColor: '#f0f0f0',
    },
    border: {
      borderColor: 'rgb(209, 209, 214)',
    },
    card: {
      backgroundColor: 'rgb(255, 255, 255)',
    },
    notification: {
      backgroundColor: 'rgb(255, 69, 58)',
    },
    text: {
      color: 'rgb(28, 28, 30)',
    },
  },
  dark: false,
};

export const useAppTheme = () => {
  const theme = useTheme();
  if (!theme) {
    throw new Error('useAppTheme must be used within a ThemeProvider');
  }
  return theme;
};

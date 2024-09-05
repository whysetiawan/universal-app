const pkg = require('./package.json');

/**
 * @type {import('@expo/config').ExpoConfig}
 */
module.exports = {
  expo: {
    name: 'uni-app',
    slug: 'uni-app',
    version: pkg.version,
    orientation: 'default',
    icon: './assets/images/icon.png',
    scheme: 'myapp',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './assets/images/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      package: 'com.lahelu.dev',
    },
    web: {
      bundler: 'metro',
      output: 'server',
      favicon: './assets/images/favicon.png',
    },
    plugins: [
      [
        'expo-build-properties',
        {
          android: {
            // "newArchEnabled": true,
            newArchEnabled: false,
          },
        },
      ],
      [
        'expo-router',
        {
          root: './src/routes',
          origin: 'https://lahelu.dev',
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      router: {
        origin: 'https://lahelu.dev',
        root: './src/routes',
      },
      eas: {
        projectId: '7250d4f1-86fe-4fc7-b81d-b1166b294d4c',
      },
    },
    runtimeVersion: {
      policy: 'nativeVersion',
    },
    updates: {
      url: 'https://u.expo.dev/7250d4f1-86fe-4fc7-b81d-b1166b294d4c',
    },
  },
};

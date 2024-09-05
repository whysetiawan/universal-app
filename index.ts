// `@expo/metro-runtime` MUST be the first import to ensure Fast Refresh works
// on web.
import '@expo/metro-runtime';

import { App } from 'expo-router/build/qualified-entry';
import { renderRootComponent } from 'expo-router/build/renderRootComponent';
import { Platform } from 'react-native';

import logger from '#/shared/utils/logger';

import { server, worker } from './__mocks__/server';
// This file should only import and register the root. No components or exports
// should be added here.

async function setupMockServer() {
  // @ts-expect-error
  await import('./msw.polyfills');
  server.listen();
  logger.log({ message: 'Mock Service Worker started' });
}
if (Platform.OS !== 'web') {
  renderRootComponent(App);
  setupMockServer().then(() => {});
} else {
  worker?.start().then(() => {
    logger.log({ message: 'Mock Service Worker started' });
    renderRootComponent(App);
  });
}

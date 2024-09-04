// src/mocks/browser.js
import { setupWorker } from 'msw/browser';
import { setupServer } from 'msw/native';
import { Platform } from 'react-native';

import { getPostsHandler } from './handlers/getPosts';

// import { handlers } from './apiHandlers';
const handlers = [getPostsHandler];

export const server = setupServer(...handlers);
export const worker =
  Platform.OS !== 'web' ? undefined : setupWorker(...handlers);

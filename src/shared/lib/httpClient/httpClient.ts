import { Platform } from 'react-native';
import xior from 'xior';

export const httpClient = xior.create({
  baseURL:
    Platform.OS === 'web' ? 'http://localhost:8081' : 'https://lahelu.dev',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

httpClient.interceptors.request.use((config) => {
  return config;
});

httpClient.interceptors.response.use((response) => {
  return response;
});

import { Dimensions } from 'react-native';

export const getWindowHeight = () => Dimensions.get('window').height;
export const getWindowWidth = () => Dimensions.get('window').width;

export const widthFromPercent = (percent: number) =>
  (getWindowWidth() * percent) / 100;

export const heightFromPercent = (percent: number) =>
  (getWindowHeight() * percent) / 100;

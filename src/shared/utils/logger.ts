import { Platform } from 'react-native';

interface LogOptions {
  id?: string;
}

type Log = (opts: LogOptions) => void;

// __DEV__ global is by default not defined in React Native Web builds
const isDev = Boolean(typeof __DEV__ !== 'undefined' && __DEV__);

let log: Log = () => {};

if (isDev) {
  log = ({ id }) => {
    let message = '';
    // its ok to use console.log in dev
    // eslint-disable-next-line no-console
    console.log(
      `[${Platform.OS}::${[id].filter(Boolean).join('::')}]`,
      message,
    );
  };
}

Object.freeze(log);

export default { log };

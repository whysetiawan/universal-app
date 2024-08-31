export function debounce<P extends readonly unknown[], T>(
  func: (...args: P) => T,
  time: number,
) {
  let timeout: NodeJS.Timeout | null;
  return (...args: P) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      timeout = null;
      func(...args);
    }, time);
  };
}

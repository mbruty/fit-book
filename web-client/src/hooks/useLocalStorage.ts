/* eslint-disable-next-line */
export default function<T extends object>(key: string): T {
  const data = (JSON.parse(localStorage.getItem(key) || '{}')) as T;
  const handler: ProxyHandler<T> = {
    set: (target: any, p: string | symbol, value: any, receiver: any): boolean => {
      // Update the object
      /* eslint-disable-next-line */
      target[p] = value;
      // Store the object
      localStorage.setItem(
        key,
        JSON.stringify(target),
      );

      return true;
    },
  };
  return new Proxy(data, handler);
}

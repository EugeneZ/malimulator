// @flow
export default function channel<T>() {
  const listeners = [];

  return {
    put(action: T) {
      let i = listeners.length;
      while (i--) {
        const { listener, resolve } = listeners[i];
        const result = listener(action);
        if (result !== null) {
          listeners.splice(i, 1);
          resolve(result);
        }
      }
    },

    listen(listener: T => mixed) {
      return new Promise(resolve => {
        listeners.push({
          listener,
          resolve,
        });
      });
    },
  };
}

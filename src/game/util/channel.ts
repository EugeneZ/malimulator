export default function channel() {
  let listeners = [];

  return {
    put(action) {
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

    listen(listener) {
      return new Promise(resolve => {
        listeners.push({
          listener,
          resolve,
        });
      });
    },
  };
}

// @flow
import { type Effect } from '../types';

export default function channel() {
  const listeners = [];

  return {
    put(action: Effect) {
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

    listen(listener: Effect => mixed) {
      return new Promise(resolve => {
        listeners.push({
          listener,
          resolve,
        });
      });
    },
  };
}

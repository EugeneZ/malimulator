import { Actions } from '../types';

export type Listener<T> = (actions: Actions)=>T;

interface ListenerHandler<T> {
  readonly listener: Listener<T>
  readonly resolve: (value: T)=>void
};

export type Listen<T> = (listener: Listener<T>) => void;

interface Channel<T> {
  readonly put: (action: Actions) => void,
  readonly listen: Listen<T>
}

export default function channel<T>(): Channel<T> {
  const listeners: Array<ListenerHandler<T>> = [];

  return {
    put(action: Actions) {
      let i = listeners.length;
      while (i--) {
        const { listener, resolve } = listeners[i];
        const result = listener(action);
        if (result || typeof result === 'number') {
          listeners.splice(i, 1);
          resolve(result);
        }
      }
    },

    listen(listener: Listener<T>) {
      return new Promise(resolve => {
        listeners.push({
          listener,
          resolve,
        });
      });
    },
  };
}

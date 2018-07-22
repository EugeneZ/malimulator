// @flow
import * as Intro from './jobs/intro';
import { type GameState } from './types';
import {
  type Action,
  receivedJob,
  receivedChoices,
  receivedMessage
} from './actionCreators';
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const game = {
  flow: {
    message: (message: string) => ({ type: 'flow/message', data: message }),
    choice: (choices: $ReadOnlyArray<string>) => ({
      type: 'flow/choices',
      data: choices
    })
  }
};

let signals = [];
let listeners = [];
let signal = fn => {
  listeners.push(fn);
};
function channel() {
  const listeners = [];

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
          resolve
        });
      });
    }
  };
}

function gameMiddleware({ getState, dispatch }) {
  const { put, listen } = channel();
  return next => action => {
    put(action);
    if (action && action.type === 'state/newGame') {
      dispatch({ type: 'flow/run', data: Intro });
    }
    if (
      action &&
      typeof action.type === 'string' &&
      action.type === 'flow/run'
    ) {
      import(`./jobs/${action.data.filename}`).then(async ({ flow, title }) => {
        const generator = flow(game);
        let nextArg;
        while (true) {
          const { value, done } = generator.next(nextArg);
          nextArg = undefined;

          if (done) {
            break;
          }

          switch (value.type) {
            case 'flow/message':
              dispatch(receivedMessage(`[${title}] ${value.data}`));
              continue;
            case 'flow/choices':
              dispatch(receivedChoices(value.data));
              nextArg = [await listen(
                channelAction =>
                channelAction.type === 'input/entered' && channelAction.data && ['1', '2'].includes(channelAction.data) ? parseInt(channelAction.data, 10) - 1 : null
              )];
              continue;
            default:
              throw new Error(`undefined effect ${JSON.stringify(value)}`);
          }
        }
      });
    }

    return next(action);
  };
}

const initialState = {
  jobs: [],
  messages: [],
};

function reducer(state: GameState = initialState, action: Action) {
  switch (action.type) {
    case 'message/received':
      return {
        ...state,
        messages: [...state.messages, action.data]
      };
    case 'choices/received':
      return {
        ...state,
        messages: [...state.messages, 'Choose:', ...action.data.map((c, i) => `${i + 1}) ${c}`)]
      };
    default:
      return state;
  }
}

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, reducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(gameMiddleware))
  );
  const persistor = persistStore(store);
  persistor.purge();
  return { store, persistor };
};

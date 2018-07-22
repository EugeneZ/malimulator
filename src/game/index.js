// @flow
import * as Intro from './jobs/intro';
import { type GameState, type Job, type Effect } from './types';
import {
  type Action,
  receivedChoices,
  receivedMessage,
} from './actionCreators';
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import channel from './util/channel';

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
      import(`./jobs/${action.data.filename}`).then(
        async ({ flow, title }: Job) => {
          const generator = flow();
          let nextArg;
          while (true) {
            const { value, done } = generator.next(nextArg);
            nextArg = undefined;

            if (!value) {
              throw new Error('You must only yield effects.');
            }

            if (done) {
              break;
            }

            switch (value.type) {
              case 'flow/message':
                if (typeof value.data !== 'string') {
                  throw new Error('Message effect data must be a string');
                }
                dispatch(receivedMessage(`[${title}] ${value.data}`));
                continue;
              case 'flow/choices':
                if (!Array.isArray(value.data)) {
                  throw new Error('Choice effect data must be an array');
                }
                dispatch(receivedChoices(value.data));
                nextArg = [
                  await listen(({ type, data }: Effect) => {
                    return type === 'input/entered' &&
                      data &&
                      ['1', '2'].includes(data)
                      ? parseInt(data, 10) - 1
                      : null;
                  }),
                ];
                continue;
              default:
                throw new Error(`undefined effect ${JSON.stringify(value)}`);
            }
          }
        },
      );
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
        messages: [...state.messages, action.data],
      };
    case 'choices/received':
      return {
        ...state,
        messages: [
          ...state.messages,
          'Choose:',
          ...action.data.map((c, i) => `${i + 1}) ${c}`),
        ],
      };
    default:
      return state;
  }
}

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(gameMiddleware)),
  );
  const persistor = persistStore(store);
  persistor.purge();
  return { store, persistor };
};

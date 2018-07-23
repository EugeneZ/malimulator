// @flow strict
import { type GameState } from './types';
import { type Action } from './actionCreators';
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import flow from './flow';

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
    composeEnhancers(applyMiddleware(flow)),
  );
  const persistor = persistStore(store);
  persistor.purge();
  return { store, persistor };
};

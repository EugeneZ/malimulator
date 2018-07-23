// @flow strict
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import game from './game';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const { store, persistor } = game();

const rootEl = document.getElementById('root');

if (!rootEl) {
  throw new Error('No root element');
}

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  rootEl,
);
registerServiceWorker();

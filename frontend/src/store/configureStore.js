import { compose, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import { devTools, persistState as devState } from 'redux-devtools';
import persistState from 'redux-localstorage'

var _ = require('lodash');

import rootReducer from '../reducers';
import authMiddleware from '../middleware/auth';
import apiMiddleware from '../api/middleware';

const createStoreWithMiddleware = compose(
  applyMiddleware(
    thunkMiddleware,
    authMiddleware,
    apiMiddleware,
    // loggerMiddleware,
  ),
  // devTools(),
  // devState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  persistState(['auth'])
)(createStore);

export default function configureStore(initialState) {

  const store = createStoreWithMiddleware(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}

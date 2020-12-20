import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import reducer from './reducers';
import logger from 'redux-logger'

const middleware = getDefaultMiddleware({
  immutableCheck: false,
  serializableCheck: false,
  thunk: true,
}).concat(logger);

const store = configureStore({
 reducer,
 middleware,
 devTools: process.env.NODE_ENV !== 'production',
});

export default store
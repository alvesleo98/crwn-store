import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { persistStore } from 'redux-persist';
import RootReducers from './root-reducer';

const middlewares = [];

//permite logs no console apenas em modo desenvolvimento
if (process.env.NODE_ENV === 'development'){
    middlewares.push(logger)
}

export const store = createStore(RootReducers, applyMiddleware(...middlewares));
export const persistor = persistStore(store);

export default {store, persistor};

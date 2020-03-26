import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../_redux/_reducers';
import { apiMiddleware } from 'redux-api-middleware';

const loggerMiddleware = createLogger();

export const store = createStore(
    rootReducer,
    applyMiddleware(
        loggerMiddleware,
        thunkMiddleware,
        apiMiddleware
    )
);
import { createStore, applyMiddleware } from 'redux';
import { user } from '../server/defaultState.js';
import {createLogger} from "redux-logger";
import createSagaMiddleWare from "redux-saga";
import * as sagas from './sagas.mock';


const sagaMiddleware = createSagaMiddleWare();

export const store = createStore(
  function reducer(state = user, action) {
    return state;
  },
  applyMiddleware(createLogger(), sagaMiddleware)
);

for (let saga in sagas) {
  sagaMiddleware.run(sagas[saga]);
}

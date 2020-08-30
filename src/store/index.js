import { createStore, applyMiddleware, combineReducers } from 'redux';
import {createLogger} from "redux-logger";
import createSagaMiddleWare from "redux-saga";

import { user } from '../server/defaultState.js';
import * as sagas from './sagas.mock';
import * as mutations from './mutations';


const sagaMiddleware = createSagaMiddleWare();

export const store = createStore(
  combineReducers({
    tasks(tasks = user.username, action) {
      switch(action.type) {
        case mutations.CHANGE_USERNAME:
          console.log(action);
          break;
      }
      return tasks;
    }
  }),
  applyMiddleware(createLogger(), sagaMiddleware)
);

for (let saga in sagas) {
  sagaMiddleware.run(sagas[saga]);
}

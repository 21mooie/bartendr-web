import { createStore, applyMiddleware } from 'redux';
import { user } from '../server/defaultState.js';
import {createLogger} from "redux-logger";


export const store = createStore(
  function reducer(state = user, action) {
    return state;
  },
  applyMiddleware(createLogger())
)

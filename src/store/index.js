import { createStore, applyMiddleware, combineReducers } from 'redux';
import {createLogger} from "redux-logger";
import createSagaMiddleWare from "redux-saga";

import { user } from '../server/defaultState.js';
import * as sagas from './sagas';
import * as mutations from './mutations';


const sagaMiddleware = createSagaMiddleWare();

export const store = createStore(
  combineReducers({
    session(session = user.session) {
      return session;
    },
    username(username = user.username, action) {
      switch(action.type) {
        case mutations.CHANGE_USERNAME:
          return username = action.newUsername;
        default:
          return username;
      }
    },
    uid(uid = user.uid) {
      return uid;
    },
    photo(photo = user.photo) {
      return photo;
    },
    fav_drinks(fav_drinks = user.fav_drinks) {
      return fav_drinks;
    },
    comments(comments = user.comments) {
      return comments;
    },
  }),
  applyMiddleware(createLogger(), sagaMiddleware)
);

for (let saga in sagas) {
  sagaMiddleware.run(sagas[saga]);
}

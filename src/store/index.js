import { createStore, applyMiddleware, combineReducers } from 'redux';
import {createLogger} from "redux-logger";
import createSagaMiddleWare from "redux-saga";

import { user } from '../server/defaultState.js';
import * as sagas from './sagas';
import * as mutations from './mutations';


const sagaMiddleware = createSagaMiddleWare();

export const store = createStore(
  combineReducers({
    session(userSession = user.session || {}, action) {
      let { type, authenticated, session} = action;
      switch (type) {
        case mutations.SET_STATE:
          return {...userSession};
        case mutations.REQUEST_AUTHENTICATE_USER:
          return {...userSession, authenticated: mutations.AUTHENTICATING};
        case mutations.PROCESSING_AUTHENTICATE_USER:
          return {...userSession, authenticated};
        default:
          return userSession;
      }
    },
    email(email = '', action) {
      switch(action.type) {
        case (mutations.SET_STATE):
          return action.state.email;
      }
      return email;
    },
    username(username = '', action) {
      switch(action.type) {
        case (mutations.SET_STATE):
          return action.state.username;
        case mutations.CHANGE_USERNAME:
          return username = action.newUsername;
        default:
          return username;
      }
    },
    uid(uid = '', action) {
      switch(action.type) {
        case(mutations.SET_STATE):
          return action.state.uid
      }
      return uid;
    },
    photo(photo = '', action) {
      switch(action.type) {
        case(mutations.SET_STATE):
          return action.state.photo || null;
      }
      return photo;
    },
    fav_drinks(fav_drinks = [], action) {
      switch(action.type) {
        case(mutations.SET_STATE):
          return action.state.fav_drinks || null;
      }
      return fav_drinks;
    },
    comments(comments = [], action) {
      switch(action.type) {
        case(mutations.SET_STATE):
          return action.state.comments || null;
      }
      return comments;
    },
  }),
  applyMiddleware(createLogger(), sagaMiddleware)
);

for (let saga in sagas) {
  sagaMiddleware.run(sagas[saga]);
}

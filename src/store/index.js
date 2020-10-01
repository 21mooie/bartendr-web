import { createStore, applyMiddleware, combineReducers } from 'redux';
import {createLogger} from "redux-logger";
import createSagaMiddleWare from "redux-saga";


import * as sagas from './sagas';
import * as mutations from './mutations';


const sagaMiddleware = createSagaMiddleWare();

export const store = createStore(
  combineReducers({
    session(userSession = {}, action) {
      let { type, authenticated, session} = action;
      switch (type) {
        case mutations.SET_STATE:
          return {...userSession};
        case mutations.REQUEST_AUTHENTICATE_USER:
          return {...userSession, authenticated: mutations.AUTHENTICATING};
        case mutations.PROCESSING_AUTHENTICATE_USER:
          return {...userSession, authenticated};
        case mutations.PROCESS_UNAUTHENTICATE_USER:
          return {...userSession, authenticated};
        default:
          return {authenticated: false};
      }
    },
    email(email = '', action) {
      switch(action.type) {
        case mutations.SET_STATE:
          return action.state.email;
        default:
          return email;
      }
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
          return action.state.uid;
        default:
          return uid;
      }
    },
    photo(photo = '', action) {
      switch(action.type) {
        case(mutations.SET_STATE):
          return action.state.photo || null;
        default:
          return photo;
      }

    },
    fav_drinks(fav_drinks = [], action) {
      switch(action.type) {
        case(mutations.SET_STATE):
          return action.state.fav_drinks || null;
        default:
          return fav_drinks;
      }
    },
  }),
  applyMiddleware(createLogger(), sagaMiddleware)
);

for (let saga in sagas) {
  sagaMiddleware.run(sagas[saga]);
}

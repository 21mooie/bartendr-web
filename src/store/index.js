import { createStore, applyMiddleware, combineReducers } from 'redux';
import {createLogger} from "redux-logger";
import createSagaMiddleWare from "redux-saga";


import * as sagas from './sagas';
import * as mutations from './mutations';
import {user} from '../consts/defaultState';


const sagaMiddleware = createSagaMiddleWare();

export const store = createStore(
  combineReducers({
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
    fav_drinks(fav_drinks = user.fav_drinks, action) {
      switch(action.type) {
        case(mutations.SET_STATE):
          return action.state.fav_drinks;
        default:
          return fav_drinks;
      }
    },
    followers(followers = [], action) {
      switch(action.type) {
        case(mutations.SET_STATE):
          return action.state.followers || null;
        default:
          return followers;
      }
    },
    following(following = [], action) {
      switch(action.type) {
        case(mutations.SET_STATE):
          return action.state.following || null;
        default:
          return following;
      }
    },
    numFollowers(numFollowers = 0, action) {
      switch(action.type) {
        case(mutations.SET_STATE):
          return action.state.numFollowers;
        default:
          return numFollowers;
      }
    },
    numFollowing(numFollowing = 0, action) {
      switch(action.type) {
        case(mutations.SET_STATE):
          return action.state.numFollowing;
        default:
          return numFollowing;
      }
    },
  }),
  applyMiddleware(createLogger(), sagaMiddleware)
);

for (let saga in sagas) {
  sagaMiddleware.run(sagas[saga]);
}

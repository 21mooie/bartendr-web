import { createStore, applyMiddleware, combineReducers } from 'redux';
import {createLogger} from "redux-logger";
import createSagaMiddleWare from "redux-saga";


import * as sagas from './sagas';
import * as mutations from './mutations';
import {user} from '../consts/defaultState';


const sagaMiddleware = createSagaMiddleWare();

export const store = createStore(
  combineReducers({
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
    email(email = '', action) {
      switch(action.type) {
        case mutations.SET_STATE:
          return action.state.email;
        default:
          return email;
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
    avi(avi = '', action) {
      switch(action.type) {
        case(mutations.SET_STATE):
          return action.state.avi || '';
        case (mutations.CLEAR_AVI):
          return '';
        case(mutations.SUCCESSFUL_UPDATE_AVI):
          return action.state.avi;
        default:
          return avi;
      }
    },
    fav_drinks(fav_drinks = user.fav_drinks, action) {
      switch(action.type) {
        case(mutations.SET_STATE):
          return action.state.fav_drinks;
        case(mutations.ADD_DRINK_TO_STATE):
          fav_drinks.drinks.push(action.drink);
          fav_drinks.numDrinks += 1;
          return {...fav_drinks};
        case(mutations.REMOVE_DRINK_FROM_STATE):
          fav_drinks.drinks = fav_drinks.drinks.filter(drink => drink.idDrink !== action.idDrink);
          fav_drinks.numDrinks -= 1;
          return {...fav_drinks};
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
        case(mutations.ADD_USER_TO_FOLLOWING):
          following.push(action.followedUserUid);
          return [...following];
        case(mutations.REMOVE_USER_FROM_FOLLOWING):
          following = following.filter(uid => uid !== action.followedUserUid)
          return [...following];
        default:
          return following;
      }
    },
  }),
  applyMiddleware(createLogger(), sagaMiddleware)
);

for (let saga in sagas) {
  sagaMiddleware.run(sagas[saga]);
}

import {createLogger} from "redux-logger";
import createSagaMiddleWare from "redux-saga";
import { configureStore } from '@reduxjs/toolkit'


import * as sagas from './sagas/sagas';
import * as userSagas from './sagas/userSagas';
import * as favDrinksSagas from './sagas/favDrinksSagas';
import * as mutations from './mutations';
import {user} from '../consts/defaultState';
import userReducer from "./reducers/userReducer";
import favDrinksReducer from "./reducers/favDrinksReducer";
import authenticatedReducer from "./reducers/authenticatedReducer";
import followsReducer from "./reducers/followsReducer";


const sagaMiddleware = createSagaMiddleWare();
export const store = configureStore({
  reducer: {
    user: userReducer,
    favDrinks: favDrinksReducer,
    follows: followsReducer,
    authenticated: authenticatedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    // adding the saga middleware here
    getDefaultMiddleware().concat(createLogger(), sagaMiddleware),
});

function rootReducer(user1=user, action) {
  console.log('avi reducer ', user);
  console.log('action.type ', action.type);
  switch(action.type) {
    case(mutations.REQUEST_UPDATE_WHO_CURRENT_USER_FOLLOWS):
      return user;
    case(mutations.ADD_USER_TO_FOLLOWING):
      const add_following = user1.following;
      add_following.push(action.followedUserUid);
      return {...user1, following: add_following};
  case(mutations.REMOVE_USER_FROM_FOLLOWING):
      let remove_following = user1.following;
      remove_following = remove_following.filter(uid => uid !== action.followedUserUid);
      return {...user1, following: remove_following};
    case(mutations.SUCCESSFUL_UPDATE_AVI):
      return {...user1, avi: action.state.avi};
    case(mutations.REQUEST_UPDATE_AVI):
      return user1;
    default:
      return user1;
  }
}
Object.assign(sagas, userSagas, favDrinksSagas);
for (let saga in sagas) {
  sagaMiddleware.run(sagas[saga]);
}

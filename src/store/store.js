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
// combineReducers({
//   username(username = '', action) {
//     switch(action.type) {
//       case (mutations.SET_STATE):
//         return action.state.username;
//       case mutations.CHANGE_USERNAME:
//         return username = action.newUsername;
//       default:
//         return username;
//     }
//   },
//   email(email = '', action) {
//     switch(action.type) {
//       case mutations.SET_STATE:
//         return action.state.email;
//       default:
//         return email;
//     }
//   },
//   uid(uid = '', action) {
//     switch(action.type) {
//       case(mutations.SET_STATE):
//         return action.state.uid;
//       default:
//         return uid;
//     }
//   },
//   avi: aviReducer,
//   fav_drinks(fav_drinks = user.fav_drinks, action) {
//     switch(action.type) {
//       case(mutations.SET_STATE):
//         return action.state.fav_drinks;
//       case(mutations.ADD_DRINK_TO_STATE):
//         fav_drinks.drinks.push(action.drink);
//         fav_drinks.numDrinks += 1;
//         return {...fav_drinks};
//       case(mutations.REMOVE_DRINK_FROM_STATE):
//         fav_drinks.drinks = fav_drinks.drinks.filter(drink => drink.idDrink !== action.idDrink);
//         fav_drinks.numDrinks -= 1;
//         return {...fav_drinks};
//       default:
//         return fav_drinks;
//     }
//   },
//   followers(followers = [], action) {
//     switch(action.type) {
//       case(mutations.SET_STATE):
//         return action.state.followers || null;
//       default:
//         return followers;
//     }
//   },
//   following(following = [], action) {
//     switch(action.type) {
//       case(mutations.SET_STATE):
//         return action.state.following || null;
//       case(mutations.ADD_USER_TO_FOLLOWING):
//         following.push(action.followedUserUid);
//         return [...following];
//       case(mutations.REMOVE_USER_FROM_FOLLOWING):
//         following = following.filter(uid => uid !== action.followedUserUid)
//         return [...following];
//       default:
//         return following;
//     }
//   },
//   isAuthenticated(isAuthenticated = false, action) {
//     switch(action.type) {
//       case(mutations.SET_STATE):
//         // have to change api schema to add authentication to true for isAuthenticated
//         if (action.state.hasOwnProperty("isAuthenticated"))
//           return action.state.isAuthenticated
//         return true
//       default:
//         return isAuthenticated;
//     }
//   }
// }),
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

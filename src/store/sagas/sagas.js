import {take,  put} from "redux-saga/effects";
import axios from "axios";
import { store } from 'react-notifications-component';

import { url } from '../../consts';
import * as mutations from '../mutations';
import { user } from '../../consts/defaultState';
import { clearUser } from '../reducers/userReducer';
import { clearFollowing } from "../reducers/followsReducer";
import { clearAuthentication } from "../reducers/authenticatedReducer";
import { clearFavDrinks } from "../reducers/favDrinksReducer";

import { setUser } from "../reducers/userReducer";
import { setFollows } from "../reducers/followsReducer";
import { setAuthentication } from "../reducers/authenticatedReducer.js";
import { setFavDrinks } from "../reducers/favDrinksReducer";


export function* unAuthenticateSaga() {
  while (true) {
    yield take(mutations.REQUEST_CLEAR_STATE);
    try {
      yield put(clearUser());
      yield put(clearFavDrinks());
      yield put(clearFollowing());
      yield put(clearAuthentication());
    } catch (err) {
      console.log(`Clear state failed: ${err}`);
    }
  }
}

export function* updateFollowersSaga() {
  while(true) {
    const { currentUserUid, followedUserUid, wantsToFollow } = yield take(mutations.REQUEST_UPDATE_WHO_CURRENT_USER_FOLLOWS);
    try {
      yield axios.post(`${url}/users/following`, { currentUserUid, followedUserUid, wantsToFollow });
      yield put(mutations.successfulUpdateWhoCurrentUserFollows());
      if(wantsToFollow) {
        yield put(mutations.addToFollowing(followedUserUid));
      } else {
        yield put(mutations.removeFromFollowing(followedUserUid));
      }
    } catch (err) {
      yield put(mutations.failedUpdateWhoCurrentUserFollows());
      store.addNotification({
        title: "Uh-oh!",
        message: "This action cannot be completed at this time. Try again later.",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3500,
          onScreen: true
        }
      });
    }
  }
}

// this creates user document on api
export function* registerUserSaga() {
  while(true) {
    try {
      const { registration } =  yield take(mutations.REGISTER);
      let response  = yield axios.post(`${url}/register`, { registration });
      let {data} = response;
      if (!data) {
        throw new Error('failed registration');
      };
      console.log('registration succeeded')
      yield put(mutations.setState(data));
      
    } catch (err) {
      if (err.message === 'failed registration') {
        console.error('registration failed');
      }
      store.addNotification({
        title: "Uh-oh!",
        message: "Registration was unsuccessful",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3500,
          onScreen: true
        }
      });
    }
  }
}

export function* setUserSaga() {
  while (true) {
    console.log('calling setUserSaga');
    const { data } = yield take(mutations.SET_STATE);
    console.log('data ', data);
    yield put(
      setUser({
          email    : data.state.email,
          username : data.state.username,
          uid      : data.state.uid,
          avi      : data.state.avi,
      })
    );
    yield put(
      setFollows({
          following: data.state.following,
          followers: data.state.followers
      })
    );
    yield put(
      setFavDrinks({
          favDrinks: data.state.fav_drinks.drinks
      })
    );
    yield put(
      setAuthentication({
          status: data.state.authentication,
      })
    );
  }
}

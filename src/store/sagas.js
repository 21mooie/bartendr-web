import {take,  put} from "redux-saga/effects";
import axios from "axios";
import { url } from '../consts';

import * as mutations from './mutations';
import {user} from '../consts/defaultState';

export function* changeUsernameSaga() {
  while (true) {
    const {uid, oldUsername, newUsername} = yield take(mutations.REQUEST_CHANGE_USERNAME);
    yield put(mutations.changeUsername(uid,oldUsername, newUsername))
    const { res } = yield axios.patch(url + `/users`, {
      uid,
      oldUsername,
      newUsername,
    });
  }
}

export function* getUserSaga() {
  while (true) {
    const {username} = yield take(mutations.REQUEST_USER);
    try {
      let response;
      response = yield axios.post(url + `/users`, {username})
      let {data} = response;
      if (!data) {
        throw new Error();
      }
      yield put(mutations.setState(data.state));

    } catch(err) {
      yield put(mutations.failedSetUser());
      yield put(mutations.requestClearState());
      yield put(mutations.setState(user));
    }
  }
}

export function* unAuthenticateSaga() {
  while (true) {
    yield take(mutations.REQUEST_CLEAR_STATE);
    try {
      yield put(mutations.setState(user));
    } catch (err) {
      console.log(`Clear state failed: ${err}`);
    }
  }
}

export function* updateFavDrinks() {
  while (true) {
    const { username, drink, add } =  yield take(mutations.REQUEST_UPDATE_FAV_DRINKS);
    try {
      yield axios.post(`${url}/users/fav_drinks`, {username, idDrink: drink.idDrink, add});
      yield put(mutations.successfulUpdateFavDrinks());
      if (add) {
        yield put(mutations.addDrinkToState(drink));
      } else {
        yield put(mutations.removeDrinkFromState(drink.idDrink));
      }
    } catch (err) {
      console.log(err);
      yield put(mutations.failedUpdateFavDrinks());
    }
  }
}

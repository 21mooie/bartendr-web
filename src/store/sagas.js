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

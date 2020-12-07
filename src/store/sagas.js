import {take,  put, takeEvery} from "redux-saga/effects";
import axios from "axios";
import { url } from '../consts';

import * as mutations from './mutations';
import {user} from '../consts/defaultState';

export function* changeUsernameSaga() {
  while (true) {
    const {uid, oldUsername, newUsername} = yield take(mutations.REQUEST_CHANGE_USERNAME);
    yield put(mutations.changeUsername(uid,oldUsername, newUsername))
    const { res } = yield axios.patch(url + `/cocktail-user`, {
      uid,
      oldUsername,
      newUsername,
    });
  }
}

export function* auth0AuthenticationSaga() {
  while (true) {
    const {username} = yield take(mutations.REQUEST_USER);
    try {
      let response;
      response = yield axios.post(url + `/authenticate`, {username})
      let {data} = response;
      if (!data) {
        throw new Error();
      }
      console.log('Authenticated: ', data);
      yield put(mutations.setState(data.state));
      yield put(mutations.processAuthenticateUser(mutations.AUTHENTICATED))

    } catch(err) {
      console.log('auth failed: ', err);
      yield put(mutations.processAuthenticateUser(mutations.FAILED_AUTHENTICATED));
    }
  }
}

export function* unAuthenticateSaga() {
  while (true) {
    yield take(mutations.REQUEST_CLEAR_STATE);
    try {
      console.log('Clearing State');
      yield put(mutations.setState(user));
      yield put(mutations.processAuthenticateUser(mutations.NOT_AUTHENTICATED));
    } catch (err) {
      console.log(`Clear state failed: ${err}`);
    }
  }
}

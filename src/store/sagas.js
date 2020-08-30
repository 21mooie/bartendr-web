import {take,  put} from "redux-saga/effects";
import axios from "axios";

import * as mutations from './mutations';

const url = 'http://localhost:7777';

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

export function* createNewUserSaga() {
  while (true) {
    const {username, password} = yield take([mutations.CREATE_USER]);
    axios.post(url + '/cocktail-user', {
      username,
      password
    });
  }
}

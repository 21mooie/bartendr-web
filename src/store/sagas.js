import {take,  put, select} from "redux-saga/effects";
import uuid from "uuid";
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

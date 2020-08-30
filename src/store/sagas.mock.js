import {take, put, select} from "redux-saga/effects";
import uuid from "uuid";


import * as mutations from './mutations';

export function* changeUsernameSaga() {
  while (true) {
    const {userId, oldUsername, newUsername} = yield take(mutations.REQUEST_CHANGE_USERNAME);
    yield put(mutations.changeUsername(userId,oldUsername, newUsername))
  }
}

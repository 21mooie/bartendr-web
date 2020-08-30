import {take, put } from "redux-saga/effects";


import * as mutations from './mutations';

export function* changeUsernameSaga() {
  while (true) {
    const {uid, oldUsername, newUsername} = yield take(mutations.REQUEST_CHANGE_USERNAME);
    yield put(mutations.changeUsername(uid, oldUsername, newUsername))
  }
}

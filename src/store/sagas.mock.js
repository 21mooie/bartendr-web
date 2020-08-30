import {take, put, select} from "redux-saga/effects";
import uuid from "uuid";


import * as mutations from './mutations';

export function* changeUsernameSaga() {
  while (true) {
    const {userId} = yield take(mutations.REQUEST_CHANGE_USERNAME);
    const oldUsername = 'mster999';
    const newUsername = 'bigpapi344';
    yield put(mutations.changeUsername(userId,oldUsername, newUsername))
    console.log('Got userId: ', userId);
  }
}

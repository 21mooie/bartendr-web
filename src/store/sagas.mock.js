import {take, put, select} from "redux-saga/effects";
import uuid from "uuid";


import * as mutations from './mutations';

export function* changeUsernameSaga() {
  while (true) {
    const {userId} = yield take(mutations.REQUEST_CHANGE_USERNAME);
    console.log('Got userId: ', userId);
  }
}

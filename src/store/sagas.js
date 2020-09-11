import {take,  put} from "redux-saga/effects";
import axios from "axios";
import Cookies from 'js-cookie';
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

export function* userAuthenticationSaga() {
  while (true) {
    const {username, password, token} = yield take(mutations.REQUEST_AUTHENTICATE_USER);
    try {
      let response;
      if (token) {
        response = yield axios.post(url + `/authenticate`, {token})
      } else {
        response = yield axios.post(url + `/authenticate`, {username, password})
      }
      let {data} = response;
      if (!data) {
        throw new Error();
      }
      Cookies.set('token', data.token);
      console.log('Authenticated: ', data);
      yield put(mutations.setState(data.state));
      yield put(mutations.processAuthenticateUser(mutations.AUTHENTICATED))

    } catch(err) {
      console.log('auth failed: ', err);
      yield put(mutations.processAuthenticateUser(mutations.NOT_AUTHENTICATED));
    }
  }
}

export function* userRegistrationSaga() {
  while (true) {
    const {email, username, password} = yield take(mutations.REQUEST_REGISTER_USER);
    try {
      console.log(email, username, password);
      const {data} = yield axios.post(url + '/authenticate/register', {email, username, password});
      if (!data) {
        throw new Error();
      }
      console.log('Registered: ', data);
      yield put(mutations.setState(data.state));
      yield put(mutations.processAuthenticateUser(mutations.AUTHENTICATED))
    } catch(err) {
      console.log('Register failed: ', err);
      yield put(mutations.processAuthenticateUser(mutations.NOT_AUTHENTICATED));
    }
  }
}

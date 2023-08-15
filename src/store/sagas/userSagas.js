import {take,  put} from "redux-saga/effects";
import axios from "axios";
import { store as notificationsModule } from 'react-notifications-component';


import { url } from '../../consts';
import * as mutations from '../mutations';
import { failedUpdateAvi, updateAvi } from "../reducers/userReducer";


export function *getUserSaga() {
    while (true) {
        // there probably is a way to get the string from action creator
        const {username} = yield take(mutations.REQUEST_USER);
        console.log(username);
        try {
            const { data } = yield axios.post(url + `/users`, {username});
            if (!data){
                throw new Error();
            }
            console.log('data before ', data);
            yield put(mutations.setState(data));
        } catch(err) {
            // turn into a better name
            yield put(mutations.failedSetUser());
            notificationsModule.addNotification({
                title: "Uh-oh!",
                message: "Could not load user data",
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 3500,
                    onScreen: true
                }
            });
        }
    }
}

export function* updateAviSaga() {
    while (true) {
      const { uid, avi } = yield take(mutations.REQUEST_UPDATE_AVI);
      try {
        const formData = new FormData();
        formData.append('uid', uid);
        formData.append('avi', avi);
        let response = yield axios({
          method: 'post',
          url: `${url}/users/avi`,
          data: formData,
          headers: {'Content-Type': 'multipart/form-data' }
        });
        const { data } = response;
        yield put (updateAvi(data.state.avi));
      } catch (err) {
        yield put(failedUpdateAvi());
        notificationsModule.addNotification({
          title: "Uh-oh!",
          message: "Avi upload was unsuccessful!",
          type: "danger",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 3500,
            onScreen: true
          }
        });
      }
    }
  }
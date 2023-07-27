import {take,  put} from "redux-saga/effects";
import axios from "axios";
import { store } from 'react-notifications-component';

import { url } from '../../consts';
import * as mutations from '../mutations';
import { addDrink, failedUpdateFavDrinks, removeDrink } from "../reducers/favDrinksReducer";


export function* updateFavDrinks() {
    while (true) {
      const { username, drink, add } =  yield take(mutations.REQUEST_UPDATE_FAV_DRINKS);
      try {
        yield axios.post(`${url}/users/fav_drinks`, {username, idDrink: drink.idDrink, add});
        console.log('successful drink update');
        if (add) {
          yield put(addDrink(drink));
        } else {
          yield put(removeDrink(drink));
        }
      } catch (err) {
        console.log(err);
        yield put(failedUpdateFavDrinks());
        store.addNotification({
          title: "Uh-oh!",
          message: "This action cannot be completed at this time. Try again later.",
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
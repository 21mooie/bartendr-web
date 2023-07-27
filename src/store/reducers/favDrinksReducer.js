import { createSlice } from '@reduxjs/toolkit'

const initialState = [];

const favDrinks = createSlice({
  name: 'favDrinks',
  initialState,
  reducers: {
    setFavDrinks(state, action) {
      return action.payload.favDrinks;
    },
    clearFavDrinks(state, action) {
      return initialState;
    },
    addDrink(state, action) {
      state.push(action.payload);
    },
    removeDrink(state, action) {
      state = state.filter(drink => drink.idDrink !== action.payload.idDrink);
      return state;
    },
    failedUpdateFavDrinks(){}
  }
});

export const { 
  setFavDrinks,
  clearFavDrinks,
  addDrink,
  removeDrink,
  failedUpdateFavDrinks
} = favDrinks.actions;

export default favDrinks.reducer
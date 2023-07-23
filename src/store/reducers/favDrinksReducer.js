import { createSlice } from '@reduxjs/toolkit'

const initialState = [];

const favDrinks = createSlice({
  name: 'favDrinks',
  initialState,
  reducers: {
    setFavDrinks(state, action) {
      state = action.payload.favDrinks;
    },
    clearFavDrinks(state, action) {
      return initialState;
    }
  }
});

export const { setFavDrinks, clearFavDrinks } = favDrinks.actions;

export default favDrinks.reducer
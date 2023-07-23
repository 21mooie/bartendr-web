import { createSlice } from '@reduxjs/toolkit'

const initialState = [];

const favDrinks = createSlice({
  name: 'favDrinks',
  initialState,
  reducers: {
    clearFavDrinks(state, action) {
      return initialState;
    }
  }
});

export const { clearFavDrinks } = favDrinks.actions;

export default favDrinks.reducer
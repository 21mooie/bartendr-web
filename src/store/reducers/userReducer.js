import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  email: "",
  username : "",
  uid : "",
  avi: "",
};

const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    requestUser(){},
    setUser(state, action) {
      return action.payload;
    },
    clearUser(state, action){
      return initialState;
    },
    updateAvi(state, action){
      state.avi = action.payload
    },
    failedUpdateAvi(){}
  }
});

export const {
  requestUser,
  setUser,
  clearUser,
  updateAvi,
  failedUpdateAvi
} = userReducer.actions

export default userReducer.reducer;
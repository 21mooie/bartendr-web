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
    }
  }
});

export const { requestUser, setUser, clearUser } = userReducer.actions

export default userReducer.reducer;
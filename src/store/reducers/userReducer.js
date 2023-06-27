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
  reducers: {}
});

export default userReducer.reducer;
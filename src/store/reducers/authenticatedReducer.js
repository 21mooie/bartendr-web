import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    status: false
};

const authenticatedReducer = createSlice({
  name: 'authenticated',
  initialState,
  reducers: {
    setAuthentication(state, action) {
      state.status = action.payload.status;
    },
    clearAuthentication(state, action) {
      return initialState;
    }
  }
});

export const { setAuthentication, clearAuthentication } = authenticatedReducer.actions;

export default authenticatedReducer.reducer;
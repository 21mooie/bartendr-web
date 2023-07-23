import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    following: {},
    followers: {}
};

const followsReducer = createSlice({
  name: 'follows',
  initialState,
  reducers: {
    setFollows(state, action) {
      state.following = action.payload.following;
      state.followers = action.payload.followers;
    },
    clearFollowing(state, action) {
      return initialState;
    }
  }
});

export const { setFollows, clearFollowing } = followsReducer.actions;

export default followsReducer.reducer;
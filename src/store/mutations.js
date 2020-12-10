export const REQUEST_CHANGE_USERNAME = `REQUEST_CHANGE_USERNAME`;
export const CHANGE_USERNAME = `CHANGE_USERNAME`;
export const SET_STATE = `SET_STATE`;
export const REQUEST_CLEAR_STATE = `REQUEST_CLEAR_STATE`;
export const REQUEST_USER = `REQUEST_USER`;
export const FAILED_SET_USER = `FAILED_SET_USER`;

export const requestChangeUsername = (uid, oldUsername, newUsername) => ({
  type: REQUEST_CHANGE_USERNAME,
  uid,
  oldUsername,
  newUsername
});

export const changeUsername = (uid, oldUsername, newUsername) => ({
  type: CHANGE_USERNAME,
  uid,
  oldUsername,
  newUsername
});

export const requestUser = (username) => ({
  type: REQUEST_USER,
  username,
});

export const setState = (state = {}) => ({
  type: SET_STATE,
  state,
});

export const requestClearState = () => ({
  type: REQUEST_CLEAR_STATE
});

export const failedSetUser = () => ({
  type: FAILED_SET_USER
})

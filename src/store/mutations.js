export const REQUEST_CHANGE_USERNAME = `REQUEST_CHANGE_USERNAME`;
export const CHANGE_USERNAME = `CHANGE_USERNAME`;
export const CREATE_USER = `CREATE_USER`;
export const REQUEST_AUTHENTICATE_USER = `REQUEST_AUTHENTICATE_USER`;
export const PROCESSING_AUTHENTICATE_USER = `PROCESSING_AUTHENTICATE_USER`;
export const AUTHENTICATING = `AUTHENTICATING`;
export const AUTHENTICATED = `AUTHENTICATED`;
export const NOT_AUTHENTICATED = `NOT_AUTHENTICATED`;
export const FAILED_AUTHENTICATED = `FAILED_AUTHENTICATED`;
export const SET_STATE = `SET_STATE`;
export const REQUEST_REGISTER_USER = `REQUEST_REGISTER_USER`;
export const REQUEST_CLEAR_STATE = `REQUEST_CLEAR_STATE`;
export const PROCESS_UNAUTHENTICATE_USER = `PROCESS_UNAUTHENTICATE_USER`;
export const REQUEST_USER = `REQUEST_USER`;

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

export const createNewUser = (username, password) => ({
  type: CREATE_USER,
  username,
  password
});

export const requestAuthenticateUser = (username, password, token) => ({
  type: REQUEST_AUTHENTICATE_USER,
  username,
  password,
  token
});

export const requestUser = (email) => ({
  type: REQUEST_USER,
  email,
});

export const processAuthenticateUser = (status = AUTHENTICATING) => ({
  type: PROCESSING_AUTHENTICATE_USER,
  authenticated: status
});

export const setState = (state = {}) => ({
  type: SET_STATE,
  state,
});

export const requestRegisterUser = (email) => ({
  type: REQUEST_REGISTER_USER,
  email,
});

export const requestClearState = () => ({
  type: REQUEST_CLEAR_STATE
});

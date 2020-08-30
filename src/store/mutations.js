export const REQUEST_CHANGE_USERNAME = `REQUEST_CHANGE_USERNAME`;
export const CHANGE_USERNAME = `CHANGE_USERNAME`;
export const CREATE_USER = `CREATE_USER`;

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

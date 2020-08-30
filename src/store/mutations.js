export const REQUEST_CHANGE_USERNAME = `REQUEST_CHANGE_USERNAME`;
export const CHANGE_USERNAME = `CHANGE_USERNAME`;

export const requestChangeUsername = (userId) => ({
  type: REQUEST_CHANGE_USERNAME,
  userId
});

export const changeUsername = (userId, oldUsername, newUsername) => ({
  type: CHANGE_USERNAME,
  userId,
  oldUsername,
  newUsername
})

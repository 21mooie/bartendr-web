export const REQUEST_CHANGE_USERNAME = `REQUEST_CHANGE_USERNAME`;
export const CHANGE_USERNAME = `CHANGE_USERNAME`;
export const SET_STATE = `SET_STATE`;
export const REQUEST_CLEAR_STATE = `REQUEST_CLEAR_STATE`;
export const REQUEST_USER = `REQUEST_USER`;
export const FAILED_SET_USER = `FAILED_SET_USER`;
export const REQUEST_UPDATE_FAV_DRINKS = `REQUEST_UPDATE_FAV_DRINKS`;
export const SUCCESSFUL_UPDATE_FAV_DRINKS = `SUCCESSFUL_UPDATE_FAV_DRINKS`;
export const FAILED_UPDATE_FAV_DRINKS = `FAILED_UPDATE_FAV_DRINKS`;
export const ADD_DRINK_TO_STATE = `ADD_DRINK_TO_STATE`;
export const REMOVE_DRINK_FROM_STATE = `REMOVE_DRINK_FROM_STATE`;
export const REQUEST_UPDATE_WHO_CURRENT_USER_FOLLOWS = `REQUEST_UPDATE_WHO_CURRENT_USER_FOLLOWS`;
export const SUCCESSFUL_UPDATE_WHO_CURRENT_USER_FOLLOWS = `SUCCESSFUL_UPDATE_WHO_CURRENT_USER_FOLLOWS`;
export const FAILED_UPDATE_WHO_CURRENT_USER_FOLLOWS = `FAILED_UPDATE_WHO_CURRENT_USER_FOLLOWS`;
export const ADD_USER_TO_FOLLOWING = `ADD_USER_TO_FOLLOWING`;
export const REMOVE_USER_FROM_FOLLOWING = `REMOVE_USER_FROM_FOLLOWING`;


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
});

export const requestUpdateFavDrinks = (username, drink, add) => ({
  type: REQUEST_UPDATE_FAV_DRINKS,
  username,
  drink,
  add,
});

export const successfulUpdateFavDrinks = () => ({
  type: SUCCESSFUL_UPDATE_FAV_DRINKS
});

export const failedUpdateFavDrinks = () => ({
  type: FAILED_UPDATE_FAV_DRINKS
})

export const addDrinkToState = (drink) => ({
  type: ADD_DRINK_TO_STATE,
  drink,
})

export const removeDrinkFromState = (idDrink) => ({
  type: REMOVE_DRINK_FROM_STATE,
  idDrink,
})

export const requestUpdateWhoCurrentUserFollows = (currentUserUid, followedUserUid, wantsToFollow) => ({
  type: REQUEST_UPDATE_WHO_CURRENT_USER_FOLLOWS,
  currentUserUid,
  followedUserUid,
  wantsToFollow,
});

export const successfulUpdateWhoCurrentUserFollows = () => ({
  type: SUCCESSFUL_UPDATE_WHO_CURRENT_USER_FOLLOWS
});

export const failedUpdateWhoCurrentUserFollows = () => ({
  type: FAILED_UPDATE_WHO_CURRENT_USER_FOLLOWS
});

export const addToFollowing = (followedUserUid) => ({
  type: ADD_USER_TO_FOLLOWING,
  followedUserUid,
});

export const removeFromFollowing = (followedUserUid) => ({
  type: REMOVE_USER_FROM_FOLLOWING,
  followedUserUid,
})

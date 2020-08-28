import { createStore } from 'redux';
import { user } from '../server/defaultState.js';

export const store = createStore(
  function reducer(state = user, action) {
    return state;
  }
)

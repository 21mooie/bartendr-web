import React from 'react';
import { useDispatch } from 'react-redux';

import UserPool from '../../../services/UserPool';
import { requestUser } from '../../../store/mutations';


const AutoLogin = () => {
  const dispatch = useDispatch();
  function autoLoginUser() {
    console.log('running autologinuser');
    const cognitoUser = UserPool.getCurrentUser();
    if (cognitoUser !== null) {
      let username = cognitoUser.getUsername();
      console.log(`username: ${username}`);
      dispatch(requestUser(username));
      return true;
    }
    return false;
  }

  return (
    <>
      {
        autoLoginUser()
      }
    </>
  )
}

export default AutoLogin
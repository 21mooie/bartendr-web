import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {Link, Redirect} from 'react-router-dom';

import * as mutations from '../../store/mutations';

export function Login({authenticateUser, authenticateUserToken, authenticated, location}) {
  console.log(location);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function isAuthenticated() {
    console.log('checking auth status', authenticated);
    if (authenticated === mutations.AUTHENTICATED) {
      return <Redirect to="/dashboard"/>;
    }
  }

  useEffect(() => {
    if (location.state && location.state.token) {
      console.log(location.state.token);
      authenticateUserToken(location.state.token);
    }
  },[]);


  return (
    <div>
      <p>Login Here</p>
      <form onSubmit={(e) => authenticateUser(e, username, password)}>
        <TextField id="username" label="Username" onBlur={event => setUsername(event.target.value)}/>
        <TextField id="password" label="Password" onBlur={event => setPassword(event.target.value)}/>
        {authenticated === mutations.FAILED_AUTHENTICATED ? <p>Login incorrect</p>: null}
        <Button type="submit">Submit</Button>

      </form>
      <Link to='/signup'>
        <p>Click here to signup</p>
      </Link>
      {
        isAuthenticated()
      }
    </div>
  );
}

const mapStateToProps = ({session}) => ({
  authenticated: session.authenticated,
});

const mapDispatchToProps = (dispatch) => ({
  authenticateUser(e, username, password) {
    e.preventDefault();
    console.log(username, password)
    dispatch(mutations.requestAuthenticateUser(username,password, null));
  },
  authenticateUserToken(token) {
    console.log(`dispatching token ${token}`);
    dispatch(mutations.requestAuthenticateUser(null,null, token));
  }
})

export const ConnectedLogin = connect(mapStateToProps, mapDispatchToProps)(Login);

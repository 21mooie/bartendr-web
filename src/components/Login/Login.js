import React, {useState} from 'react';
import {connect} from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {Redirect} from 'react-router-dom';

import * as mutations from '../../store/mutations';

export function Login({authenticateUser, authenticated}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  function isAuthenticated() {
    console.log('checking auth status', authenticated);
    if (authenticated === mutations.AUTHENTICATED) {
      return <Redirect to="/dashboard" />;
    }
    return null;
  }


  return (
    <div>
      <p>Login Here</p>
      <form onSubmit={(e) => authenticateUser(e, username, password)}>
        <TextField id="username" label="Username" onChange={event => setUsername(event.target.value)}/>
        <TextField id="password" label="Password" onChange={event => setPassword(event.target.value)}/>
        {authenticated === mutations.NOT_AUTHENTICATED? <p>Login incorrect</p>: null}
        <Button type="submit">Submit</Button>

      </form>
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
    dispatch(mutations.requestAuthenticateUser(username,password));
  }
})

export const ConnectedLogin = connect(mapStateToProps, mapDispatchToProps)(Login);

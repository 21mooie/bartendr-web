import React, {useState} from 'react';
import {connect} from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import * as mutations from '../../store/mutations';

export function Login({authenticateUser}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return <div>
    <p>Login Here</p>
    <form onSubmit={(e) => authenticateUser(e, username, password)}>
      <TextField id="username" label="Username" onChange={event => setUsername(event.target.value)}/>
      <TextField id="password" label="Password" onChange={event => setPassword(event.target.value)}/>
      <Button type="submit">Submit</Button>
    </form>
  </div>
}

const mapStateToProps = state => state;

const mapDispatchToProps = (dispatch) => ({
  authenticateUser(e, username, password) {
    e.preventDefault();
    console.log(username, password)
    dispatch(mutations.requestAuthenticateUser(username,password));
  }
})

export const ConnectedLogin = connect(mapStateToProps, mapDispatchToProps)(Login);

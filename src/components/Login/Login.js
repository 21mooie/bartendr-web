import React, {useState} from 'react';
import {connect} from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submitForm = () => {
    console.log({username, password});
  }

  return <div>
    <p>Login Here</p>
    <form>
      <TextField id="username" label="Username" onChange={event => setUsername(event.target.value)}/>
      <TextField id="password" label="Password" onChange={event => setPassword(event.target.value)}/>
      <Button onClick={() => submitForm()}>Submit</Button>
    </form>
  </div>
}

const mapStateToProps = state => state;

export const ConnectedLogin = connect(mapStateToProps)(Login);

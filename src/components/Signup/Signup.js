import React, {useState} from 'react';
import * as mutations from "../../store/mutations";
import {connect} from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {Redirect} from "react-router-dom";

export function Signup({authenticated, registerUser}) {
  const [form, setForm] = useState({
    email: '',
    username: '',
    password: '',
  });

  function isAuthenticated() {
    console.log('checking auth status', authenticated);
    if (authenticated === mutations.AUTHENTICATED) {
      return <Redirect to="/dashboard" />;
    }
  }
  return (
    <div>
      <form onSubmit={(e) => registerUser(e, form.email, form.username, form.password) }>
        <TextField id="email" label="email" onBlur={event => setForm({...form, email: event.target.value})}/>
        <TextField id="username" label="username" onBlur={event => setForm({...form, username: event.target.value})}/>
        <TextField id="password" label="password" onBlur={event => setForm({...form, password: event.target.value})}/>
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
  registerUser(e, email, username, password) {
    e.preventDefault();
    dispatch(mutations.requestRegisterUser(email,username,password));
  }
});

export const ConnectedSignup = connect(mapStateToProps, mapDispatchToProps)(Signup);

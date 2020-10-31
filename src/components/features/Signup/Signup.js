import React, {useState} from 'react';
import * as mutations from "../../../store/mutations";
import {connect} from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {Link, Redirect} from "react-router-dom";

import "../Login/Login.css";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

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
    <div className="login">
      <div className="login-form">
        <div className="icon">
          <LockOutlinedIcon />
        </div>
        <h3 className="centered-text">Signup</h3>
        <form onSubmit={(e) => registerUser(e, form.email, form.username, form.password)} className="input">
          <TextField
            id="email"
            label="email"
            onBlur={event => setForm({...form, email: event.target.value})}
            variant="outlined"
            margin="normal"
            autoComplete="email"
            required
            autoFocus
            fullWidth
          />
          <TextField
            id="username"
            label="username"
            onBlur={event => setForm({...form, username: event.target.value})}
            variant="outlined"
            margin="normal"
            required
            autoComplete="username"
            fullWidth
          />
          <TextField
            id="password"
            label="password"
            onBlur={event => setForm({...form, password: event.target.value})}
            variant="outlined"
            margin="normal"
            autoComplete="current-password"
            type="password"
            name="password"
            required
            fullWidth
          />
          <div className="button-class">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Submit
            </Button>
          </div>
        </form>
        <div className="signup-link">
          <Link to='/login'>
            Click here to Login
          </Link>
        </div>
      </div>
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

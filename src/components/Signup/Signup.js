import React, {useState} from 'react';
import * as mutations from "../../store/mutations";
import {connect} from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export function Signup({session, registerUser}) {
  const [form, setForm] = useState({
    email: '',
    username: '',
    password: '',
  });
  return (
    <div>
      <form onSubmit={(e) => registerUser(e, form.email, form.username, form.password) }>
        <TextField id="email" label="email" onChange={event => setForm({...form, email: event.target.value})}/>
        <TextField id="username" label="username" onChange={event => setForm({...form, username: event.target.value})}/>
        <TextField id="password" label="password" onChange={event => setForm({...form, password: event.target.value})}/>
        <Button type="submit">Submit</Button>
      </form>
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

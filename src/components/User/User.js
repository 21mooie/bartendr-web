import React, {useState} from 'react';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import { connect } from "react-redux";
import {Dashboard} from "../Dashboard/Dashboard";

export function User({user, changeUsername}) {
  const [newUsername, setUsername] = useState('');
  return <div>
    <p>This is User</p>
    <h2>Change your username here</h2>
    <form noValidate autoComplete="off">
    <TextField id="newUsername "label="New Username" onChange={event => setUsername(event.target.value)}/>
    <Button onClick={() => changeUsername(user.username, newUsername)}>Submit</Button>
    </form>
  </div>
}

function mapStateToProps(state) {
  return {
    user: state
  }
}

function mapDispatchToProps (dispatch, ownProps){
  return {
    changeUsername(oldUsername, newUsername) {
      console.log('changing username', oldUsername, newUsername)
    }
  }
}

export const ConnectedUser = connect(mapStateToProps, mapDispatchToProps)(User);

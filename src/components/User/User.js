import React, {useState} from 'react';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import { connect } from "react-redux";
import {requestChangeUsername} from "./../../store/mutations";


export function User({user, changeUsername}) {
  const [newUsername, setUsername] = useState('');
  return <div>
    <p>This is User</p>
    <h2>Change your username here</h2>
    <form noValidate autoComplete="off">
    <TextField id="newUsername "label="New Username" onChange={event => setUsername(event.target.value)}/>
    <Button onClick={() => changeUsername(user.userId, user.username, newUsername)}>Submit</Button>
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
    changeUsername(userId, oldUsername, newUsername) {
      console.log('changing username', userId, oldUsername, newUsername);
      dispatch(requestChangeUsername(userId))
    }
  }
}

export const ConnectedUser = connect(mapStateToProps, mapDispatchToProps)(User);

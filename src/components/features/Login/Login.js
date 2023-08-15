import TextField from '@material-ui/core/TextField';
import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import React, { useState, useEffect } from 'react'; 
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";

import UserPool from '../../../services/UserPool';
import { requestUser } from '../../../store/mutations';


import './Login.css';

function Login({isAuthenticated}) {
  const history = useHistory();

  const [loginUsername, setLoginUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated){
      history.push('/dashboard');
    }
  }, [history, isAuthenticated])

  const onSubmit = (event) => {
    event.preventDefault();

    const user = new CognitoUser({
      Username: loginUsername,
      Pool: UserPool
    });

    const authDetails = new AuthenticationDetails(
      {
        Username: loginUsername,
        Password: password
      }
    );

    user.authenticateUser(authDetails,{
      onSuccess: (data) => {
        console.log("onSuccess: ", data);
        // Not sure how to dispatch event from userReducer try .toString()
        dispatch(requestUser(loginUsername));
      },
      onFailure: (err) => {
        console.error("onFailure: ", err);
      },
      newPasswordRequired: (data) => {
        console.log("newPasswordRequired: ", data);
      }
    });
  };

  return <div>
          <form onSubmit={onSubmit}> 
            <TextField id="username" onChange={(event) => setLoginUsername(event.target.value)} />          
            <TextField id="password" onChange={(event) => setPassword(event.target.value)} type="password" />
            <button type="submit ">Log In</button>
          </form>
          <Link to="/signup">Signup</Link>
         </div>
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.authenticated.status,
  }
}


const ConnectedLogin = connect(mapStateToProps, undefined)(Login);

export default ConnectedLogin;

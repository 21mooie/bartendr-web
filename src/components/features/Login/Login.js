import TextField from '@material-ui/core/TextField';
import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import React, { useState, useEffect } from 'react'; 
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { Button } from '@material-ui/core';

import UserPool from '../../../services/UserPool';
import { requestUser } from '../../../store/mutations';


import './Login.css';
import { setAuthToken } from '../../../funcs/authtoken/authtoken';

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
        setAuthToken();
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

  return <div className="login">
          <div className="login__container">
            <form onSubmit={onSubmit} className="form">
              <TextField id="username" placeholder="Username" onChange={(event) => setLoginUsername(event.target.value)} />          
              <TextField id="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)} type="password" />
              <Button  variant='outlined' className="submit" type="submit ">Log In</Button>
              <Link to="/signup" className="signup">Signup</Link>
            </form>
          </div>
         </div>
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.authenticated.status,
  }
}


const ConnectedLogin = connect(mapStateToProps, undefined)(Login);

export default ConnectedLogin;

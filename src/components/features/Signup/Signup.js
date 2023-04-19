import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import { Button, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';
import UserPool from '../../../services/UserPool';
import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import { requestRegistration } from '../../../store/mutations';

const Signup = ({requestRegistration, isAuthenticated}) => {
  const history = useHistory();
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [name, setName] = useState("");
  const [picture, setPicture] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDateOfBirth] = useState("");
  const [phone_number, setPhoneNumber] = useState("");

  const [confirmationCode, setConfirmationCode] = useState("");

  useEffect(() => {
    if (isAuthenticated){
      history.push("/dashboard");
    }
  });

  const onSubmit = (event) => {
    event.preventDefault();
    const attributeList = [
      {
        Name: 'email',
        Value: email
      },
      {
        Name: 'phone_number',
        Value: phone_number
      } 
    ];
    UserPool.signUp(username, password, attributeList, null, (err, data) => {
      if(err) {
        console.error(err);
      }
      console.log(data);
    });
  }

  const confirmRegistration = (event) => {
    event.preventDefault();
    const userData = {
      Username: username,
      Pool: UserPool,
    };

    const cognitoUser = new CognitoUser(userData);
    const authDetails = new AuthenticationDetails(
      {
        Username: username,
        Password: password
      }
    );
    cognitoUser.confirmRegistration(confirmationCode, true, (err, result) => {
      if (err) {
        console.error(err.message || JSON.stringify(err));
        return;
      }
      console.log('call result: ' + result);
      cognitoUser.authenticateUser(authDetails,{
        onSuccess: (data) => {
          console.log("onSuccess: ", data);
          const registration = {
            username,
            email
          };
          requestRegistration(registration);
        },
        onFailure: (err) => {
          console.error("onFailure: ", err);
        },
        newPasswordRequired: (data) => {
          console.log("newPasswordRequired: ", data);
        }
      });
    });

    
  };

  const resendConfirmationCode = () => {
    const userData = {
      Username: username,
      Pool: UserPool,
    };

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.resendConfirmationCode(function(err, result) {
      if (err) {
        alert(err.message || JSON.stringify(err));
        return;
      }
      console.log('call result: ' + result);
    });
  };

  return (
    <div>
          <form onSubmit={onSubmit}> 
            <TextField id="username" label="username" onChange={(event) => setUsername(event.target.value)} />          
            <TextField id="password" label="password" type="password" onChange={(event) => setPassword(event.target.value)} />
            <TextField id="email" label="email" onChange={(event) => setEmail(event.target.value)} />

            <TextField id="name" label="name" onChange={(event) => setName(event.target.value)} />          
            <TextField id="picture" label="picture" onChange={(event) => setPicture(event.target.value)} />
            <TextField id="gender" label="gender" onChange={(event) => setGender(event.target.value)} />
            <TextField id="dob" label="birth date" onChange={(event) => setDateOfBirth(event.target.value)} />          
            <TextField id="phone_number" label="phone_number" onChange={(event) => setPhoneNumber(event.target.value)} />
            <button type="submit " onClick={() => console.log('clicked')}>Sign up</button>
          </form>
          <Link to="/login">Login</Link>

          <form onSubmit = {confirmRegistration}>
            <TextField label="confirmationCode" onChange={(event) => setConfirmationCode(event.target.value)}/>
            <Button type="submit">Confirm Signup </Button>
          </form>

          <div>
            <Button onClick={resendConfirmationCode}>Request confirmation</Button>
          </div>
         </div>
  )
}

Signup.propTypes = {}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.isAuthenticated,
  }
}

function mapDispatchToProps (dispatch){
  return {
    requestRegistration(registration) {
      dispatch(requestRegistration(registration));
    }
  }
}

const ConnectedSignup = connect(mapStateToProps, mapDispatchToProps)(Signup);

export default ConnectedSignup;
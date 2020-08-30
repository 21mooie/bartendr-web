import React from 'react';
import {connect} from "react-redux";

function Login() {
  return <div>
    <p>Login Here</p>
  </div>
}

export default Login;

const mapStateToProps = state => state;

export const ConnectedLogin = connect(mapStateToProps)(Login);

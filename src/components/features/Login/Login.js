import React from 'react';

import * as mutations from '../../../store/mutations';
import './Login.css';
import { useAuth0 } from "@auth0/auth0-react";

export default function Login() {
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();


  return  <button onClick={() => loginWithRedirect()}>Log In</button>;
}

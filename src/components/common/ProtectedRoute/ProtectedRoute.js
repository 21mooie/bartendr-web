import React, { useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { store } from '../../../store/store';

const ProtectedRoute = ({ component, ...args }) => {
  const [isAuthenticated, setAuthenticated] = useState(store.getState().authenticated.status)
    if (!isAuthenticated){
      return <Redirect to='/' />
    }
    return <Route component={component} />
};

export default ProtectedRoute;

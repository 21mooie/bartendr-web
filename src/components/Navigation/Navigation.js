import React, {useEffect, useState} from "react";
import {Link, Redirect, useLocation} from "react-router-dom";
import Button from "@material-ui/core/Button";

import * as mutations from '../../store/mutations';
import {connect} from "react-redux";
import { useCookies } from 'react-cookie';

const Navigation = ({navUrls, clearState}) => {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const routerLocation = useLocation();
  const [location, setLocation] = useState('');
  const [show, setShow] = useState(false);
  const [redirectVal, setRedirectVal] = useState(null);

  useEffect(() => {
    setLocation(routerLocation.pathname);
    if (navUrls.find(url => url === location)) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [routerLocation.pathname, location, navUrls],);

  const signOut = () => {
    console.log('clicked');
    clearState();
    removeCookie('token');
    setRedirectVal(<Redirect to="/"/>);
  }

  return (
    <div>
      {
        show ? (
          <>
            <Link to="dashboard">
              <h1>My dashboard</h1>
            </Link>
            <Link to='/user'>
               <h1>My Profile</h1>
            </Link>
            <Link to='/search'>
              <h1> Search </h1>
            </Link>
            <Button  onClick={() => signOut()}> Sign Out</Button>
            {redirectVal}
          </>
        ) : <></>
      }
    </div>
  )
}

export default Navigation;

const mapDispatchToProps = (dispatch) => ({
  clearState() {
    dispatch(mutations.requestClearState(null));
  }
});

export const ConnectedNavigation = connect(null, mapDispatchToProps)(Navigation);


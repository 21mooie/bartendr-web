import React, {useEffect, useState} from "react";
import {Link, Redirect, useLocation} from "react-router-dom";
import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';
import SearchIcon from '@material-ui/icons/Search';
import ExploreIcon from '@material-ui/icons/Explore';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import MenuIcon from '@material-ui/icons/Menu';
import {connect} from "react-redux";
import { withRouter } from "react-router";
import Button from '@material-ui/core/Button';
import Input from "@material-ui/core/Input";

import * as mutations from '../../../store/mutations';
import './Navigation.css';
import {Routes} from "../../../consts/routes";
import Sidebar from "../Sidebar/Sidebar";
import { useAuth0 } from "@auth0/auth0-react";
import CTAButton from "../../common/Button/CTAButton";

const Navigation = ({showMenuPaths, clearState, requestUser, requestRegisterUser, history}) => {
  const routerLocation = useLocation();
  const [location, setLocation] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [redirectVal, setRedirectVal] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const { user, isAuthenticated, logout, loginWithRedirect } = useAuth0();
  const [authChecked, setAuthChecked] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  useEffect(() => {
    setLocation(routerLocation.pathname);
    setShowMenu(false);
    showMenuPaths.every(function(url) {
      // Do your thing, then:
      if (location.includes(url))  {
        setShowMenu(true);
        return false;
      }
      return true;
    });
    console.log(`isAuthenticated: ${isAuthenticated}`);
    if (isAuthenticated && !authChecked) {
      requestUser(user.nickname);
      setAuthChecked(true);
    }
  }, [authChecked, isAuthenticated, location, requestUser, routerLocation.pathname, showMenuPaths]);

  const signOut = () => {
    console.log('clicked');
    logout({ returnTo: window.location.origin })
    clearState();
    setRedirectVal(<Redirect to="/"/>);
  }

  function performSearch() {
    if (searchVal && searchVal !== '') {
      history.push({
        pathname: '/search',
        search: `?query=${searchVal}`,
        state: {searchVal}
      })
    }
  }

  return (
    <>
      <div className="header">
        <Link to={isAuthenticated ? '/dashboard' : '/'} className="Navigation_logo">Bartender</Link>
        {
          showMenu && isAuthenticated? (
            <>
            <div className="navigation__search">
              <Input
                placeholder="Search ..."
                value={searchVal}
                onChange={(event) => setSearchVal(event.target.value)}
              />
              <Button onClick={() => performSearch()}>
                <SearchIcon />
              </Button>
            </div>

            <div className="header__icons">
              <Link to="/dashboard" className={`header__icon ${location === Routes.DASHBOARD ? 'header__icon-active' : ''}`}>
                  <DashboardIcon />
                  <p>Dashboard</p>
              </Link>

              <Link className={`header__icon ${location === `/user/${user.nickname}`  ? 'header__icon-active' : ''}`} to={`/user/${user.nickname}`}>
                <PersonIcon />
                <p>Profile</p>
              </Link>

              <Link className={`header__icon ${location === Routes.EXPLORE ? 'header__icon-active' : ''}`} to='/explore'>
                <ExploreIcon />
                <p>Explore</p>
              </Link>

              <div className="header__icon" onClick={() => signOut()}>
                <MeetingRoomIcon className="header__icon"/>
                <p className="header__icon">Sign Out</p>
              </div>
            </div>
            <div className="menu__icon">
              <MenuIcon fontSize="large" onClick={() => {setShowSidebar(true)}}/>
            </div>
            </>
            )
          :
            <>
              {
                location !== Routes.LANDING_PAGE ?
                  <>
                    <div className="navigation__search">
                      <Input
                      placeholder="Search ..."
                      value={searchVal}
                      onChange={(event) => setSearchVal(event.target.value)}
                      />

                      <Button onClick={() => performSearch()}>
                        <SearchIcon />
                      </Button>
                    </div>

                    <CTAButton
                      text="Login/Signup"
                      func={loginWithRedirect}
                    />
                  </>
                :
                null
              }
            </>
      }
      <Sidebar
        isOpen={showSidebar}
        triggerCloseSidebar={() => {setShowSidebar(false)}}
        triggerLogout={() => signOut()}
      />
      {redirectVal}
      </div>
    </>
  )
}

const NavigationWithRouter = withRouter(Navigation);

const mapDispatchToProps = (dispatch) => ({
  clearState() {
    dispatch(mutations.requestClearState(null));
  },
  requestUser(username){
    dispatch(mutations.requestUser(username));
  }
});

export const ConnectedNavigation = connect(null, mapDispatchToProps)(NavigationWithRouter);


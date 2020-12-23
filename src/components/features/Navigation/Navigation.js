import React, {useEffect, useState} from "react";
import {Link, Redirect, useLocation} from "react-router-dom";
import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';
import ExploreIcon from '@material-ui/icons/Explore';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import MenuIcon from '@material-ui/icons/Menu';
import {connect} from "react-redux";
import { withRouter } from "react-router";

import * as mutations from '../../../store/mutations';
import './Navigation.css';
import {Routes} from "../../../consts/routes";
import Sidebar from "../Sidebar/Sidebar";
import { useAuth0 } from "@auth0/auth0-react";
import CTAButton from "../../common/Button/CTAButton";
import {DEV_URL, LOCAL_URL,PROD_LOCAL_URL} from "../../../consts";
import SearchBar from "./SearchBar/SearchBar";
import useWindowDimensions from "../../../hooks/useWindowDimensions/useWindowDimensions";

const Navigation = ({showMenuPaths, clearState, requestUser, requestRegisterUser, history}) => {
  const routerLocation = useLocation();
  const [location, setLocation] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [redirectVal, setRedirectVal] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const { user, isAuthenticated, logout, loginWithRedirect } = useAuth0();
  const [authChecked, setAuthChecked] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const { width } = useWindowDimensions();

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
    if (isAuthenticated && !authChecked) {
      requestUser(user.nickname);
      setAuthChecked(true);
    }
  }, [authChecked, isAuthenticated, location, requestUser, routerLocation.pathname, showMenuPaths, width]);

  const signOut = () => {
    console.log('clicked');
    switch(window.location.origin) {
      case (LOCAL_URL):
        logout({returnTo: LOCAL_URL});
        break;
      case (PROD_LOCAL_URL):
        logout({returnTo: PROD_LOCAL_URL});
        break;
      default:
        logout({returnTo: DEV_URL});
        break;
    }
    clearState();
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
        <Link to={isAuthenticated ? '/dashboard' : '/'} className="Navigation_logo">Bartendr</Link>
        {
          showMenu && isAuthenticated? (
            <>
              <SearchBar
                searchVal={searchVal}
                setSearchVal={setSearchVal}
                performSearch={performSearch}
                show={width >= 576}
              />

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
                  <MeetingRoomIcon />
                  <p >Sign Out</p>
                </div>
              </div>

              <div className="menu__icon">
                <SearchBar
                  searchVal={searchVal}
                  setSearchVal={setSearchVal}
                  performSearch={performSearch}
                  show={width < 576}
                  smallScreen={true}
                />
                <MenuIcon
                  style={{paddingLeft: 15}}
                  fontSize="large"
                  onClick={() => setShowSidebar(true)}
                />
              </div>
            </>
            )
          :
            <>
              {
                location !== Routes.LANDING_PAGE ?
                  <>
                    <SearchBar
                      searchVal={searchVal}
                      setSearchVal={setSearchVal}
                      performSearch={performSearch}
                    />

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
      {
        isAuthenticated &&
        <Sidebar
          isOpen={showSidebar}
          triggerCloseSidebar={() => {setShowSidebar(false)}}
          triggerLogout={() => signOut()}
          username={user.nickname}
        />
      }
      {redirectVal}
      </div>
    </>
  )
}

const NavigationWithRouter = withRouter(Navigation);

const mapDispatchToProps = (dispatch) => ({
  clearState() {
    dispatch(mutations.requestClearState());
  },
  requestUser(username){
    dispatch(mutations.requestUser(username));
  }
});

export const ConnectedNavigation = connect(null, mapDispatchToProps)(NavigationWithRouter);


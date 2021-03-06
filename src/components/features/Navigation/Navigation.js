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
import SearchBar from "./SearchBar/SearchBar";
import useWindowDimensions from "../../../hooks/useWindowDimensions/useWindowDimensions";

const Navigation = ({showMenuPaths, clearState, requestUser, requestRegisterUser, history}) => {
  const routerLocation = useLocation();
  const [location, setLocation] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const { user, isAuthenticated, logout, loginWithRedirect } = useAuth0();
  const [authChecked, setAuthChecked] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const { width } = useWindowDimensions();
  const [showFullSearchBar, setShowFullSearchBar] = useState(false);

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
    logout({returnTo: window.location.origin});
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
      <div className="navigation">
        {
          !showFullSearchBar &&
          <Link to={isAuthenticated ? '/dashboard' : '/'} className="navigation__logo">Bartendr</Link>
        }
        {
          showMenu && isAuthenticated? (
            <>
              <SearchBar
                searchVal={searchVal}
                setSearchVal={setSearchVal}
                performSearch={performSearch}
                show={width >= 576}
              />

              <div className="navigation__icons">
                <Link to="/dashboard" className={`navigation__icon ${location === Routes.DASHBOARD ? 'navigation__icon--active' : ''}`}>
                    <DashboardIcon />
                    <p>Dashboard</p>
                </Link>

                <Link className={`navigation__icon ${location === `/user/${user.nickname}`  ? 'navigation__icon--active' : ''}`} to={`/user/${user.nickname}`}>
                  <PersonIcon />
                  <p>Profile</p>
                </Link>

                <Link className={`navigation__icon ${location === Routes.EXPLORE ? 'navigation__icon--active' : ''}`} to='/explore'>
                  <ExploreIcon />
                  <p>Explore</p>
                </Link>

                <div className="navigation__icon" onClick={() => signOut()}>
                  <MeetingRoomIcon />
                  <p >Sign Out</p>
                </div>
              </div>

              <div className={`navigation__menu_icon ${showFullSearchBar ? 'navigation__menu_icon--full_flex' : ''}`}>
                <SearchBar
                  searchVal={searchVal}
                  setSearchVal={setSearchVal}
                  performSearch={performSearch}
                  show={width < 576}
                  smallScreen={true}
                  showFullSearchBar={showFullSearchBar}
                  toggleFullSearchBar={setShowFullSearchBar}
                />
                {
                  !showFullSearchBar &&
                  <MenuIcon
                    fontSize="large"
                    onClick={() => setShowSidebar(true)}
                  />
                }
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
                      show={width >= 576}
                    />

                    <div className={`navigation__menu_icon--no_auth ${showFullSearchBar ? 'navigation__menu_icon--full_flex' : ''}`}>
                      <SearchBar
                        searchVal={searchVal}
                        setSearchVal={setSearchVal}
                        performSearch={performSearch}
                        show={width < 576}
                        smallScreen={true}
                        showFullSearchBar={showFullSearchBar}
                        toggleFullSearchBar={setShowFullSearchBar}
                      />

                      {
                        !showFullSearchBar &&
                        <CTAButton
                          text="Login/Signup"
                          func={loginWithRedirect}
                        />
                      }
                    </div>
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
      </div>
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


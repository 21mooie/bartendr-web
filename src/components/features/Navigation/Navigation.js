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
import CTAButton from "../../common/Button/CTAButton";
import SearchBar from "./SearchBar/SearchBar";
import useWindowDimensions from "../../../hooks/useWindowDimensions/useWindowDimensions";
import UserPool from "../../../services/UserPool";

const Navigation = ({showMenuPaths, clearState, requestUser, history, isAuthenticated, username}) => {
  const routerLocation = useLocation();
  const [location, setLocation] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [signOutClicked, setSignOutClicked] = useState(false);
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
    if (signOutClicked) {
      setSignOutClicked(false);
      history.push('/');
    }
  }, [location, routerLocation.pathname, showMenuPaths, width, isAuthenticated, signOutClicked, history]);

  const signOut = () => {
    console.log('clicked');
    const cognitoUser = UserPool.getCurrentUser();
    cognitoUser.signOut();
    clearState();
    setSignOutClicked(true);
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
          !showFullSearchBar 
          &&
          <Link to={isAuthenticated ? '/dashboard' : '/'} className="navigation__logo">Bartendr</Link>
        }
        {
          showMenu && isAuthenticated ? (
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

                <Link className={`navigation__icon ${location === `/user/${username}`  ? 'navigation__icon--active' : ''}`} to={`/user/${username}`}>
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
                          func={()=> {history.push('/login')}}
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
        />
      }
      </div>
  )
};

const NavigationWithRouter = withRouter(Navigation);

const mapStateToProps = (user) => {
  console.log('navigation ', user);
  return {
  username: user.username,
  isAuthenticated: user.authenticated.status,
}

};

const mapDispatchToProps = (dispatch) => ({
  clearState() {
    dispatch(mutations.requestClearState());
  }
});

export const ConnectedNavigation = connect(mapStateToProps, mapDispatchToProps)(NavigationWithRouter);


import React, {useEffect, useState} from "react";
import {Link, Redirect, useLocation} from "react-router-dom";
import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';
import SearchIcon from '@material-ui/icons/Search';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import MenuIcon from '@material-ui/icons/Menu';
import {connect} from "react-redux";

import * as mutations from '../../../store/mutations';
import { useCookies } from 'react-cookie';
import './Navigation.css';
import {Routes} from "../../../consts/routes";
import Sidebar from "../Sidebar/Sidebar";
import Button from "../../common/Button/Button";

const Navigation = ({showMenuPaths, clearState}) => {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const routerLocation = useLocation();
  const [location, setLocation] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [redirectVal, setRedirectVal] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    setLocation(routerLocation.pathname);
    if (showMenuPaths.find(url => url === location)) {
      setShowMenu(true);
    } else {
      setShowMenu(false);
    }
  }, [routerLocation.pathname, location, showMenuPaths],);

  const signOut = () => {
    console.log('clicked');
    clearState();
    removeCookie('token');
    setRedirectVal(<Redirect to="/"/>);
  }
  return (
    <>
      <div className="header">
        <Link to='/' className="Navigation_logo">Bartender</Link>
        {
          showMenu ? (
            <>
            <div className="header__icons">

              <Link to="dashboard" className={`header__icon ${location === Routes.DASHBOARD ? 'header__icon-active' : ''}`}>
                  <DashboardIcon />
                  <p>Dashboard</p>
              </Link>

              <Link className={`header__icon ${location === Routes.USER ? 'header__icon-active' : ''}`} to='/user'>
                <PersonIcon />
                <p>Profile</p>
              </Link>

              <Link className={`header__icon ${location === Routes.SEARCH ? 'header__icon-active' : ''}`} to='/search'>
                <SearchIcon />
                <p>Search</p>
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
          : <>
              <Button text="Login" urlPath="login" icon={false} />
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

export default Navigation;

const mapDispatchToProps = (dispatch) => ({
  clearState() {
    dispatch(mutations.requestClearState(null));
  }
});

export const ConnectedNavigation = connect(null, mapDispatchToProps)(Navigation);


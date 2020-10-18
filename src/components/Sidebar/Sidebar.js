import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import {Link} from "react-router-dom";

import './Sidebar.css';

function Sidebar({isOpen, triggerCloseSidebar, triggerLogout}) {
  return (
    <div className={"Sidebar-Container " + (isOpen ? "viewSidebar zeroTop" : "hideSidebar negativeTop")}>
      <div className="cancel">
        <CloseIcon fontSize="large" onClick={() => {triggerCloseSidebar()}}/>
      </div>
      <div className="menu">
        <Link to="/dashboard" onClick={() => {triggerCloseSidebar()}}>
          <p>Dashboard</p>
        </Link>
        <Link to="/user" onClick={() => {triggerCloseSidebar()}}>
          <p>User</p>
        </Link>
        <Link to="/search" onClick={() => {triggerCloseSidebar()}}>
          <p>Search</p>
        </Link>
        <div onClick={() => {triggerCloseSidebar(); triggerLogout();}}>
          <p>Sign Out</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

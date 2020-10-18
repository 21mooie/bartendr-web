import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import {Link} from "react-router-dom";

import './Sidebar.css';

function Sidebar({isOpen, triggerCloseSidebar}) {
  return (
    <div className={"Sidebar-Container " + (isOpen ? "viewSidebar zeroTop" : "hideSidebar negativeTop")}>
      <div className="cancel">
        <CloseIcon fontSize="large" onClick={() => {triggerCloseSidebar()}}/>
      </div>
      <div className="menu">
        <Link to="/dashboard">
          <p>Dashboard</p>
        </Link>
        <Link to="/user">
          <p>User</p>
        </Link>
        <Link to="/search">
          <p>Search</p>
        </Link>
        <div>
          <p>Sign Out</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

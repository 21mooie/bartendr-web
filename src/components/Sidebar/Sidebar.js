import React from 'react';
import CloseIcon from '@material-ui/icons/Close';

import './Sidebar.css';

function Sidebar({isOpen, triggerCloseSidebar}) {
  return (
    <div className={"Sidebar-Container " + (isOpen ? "viewSidebar zeroTop" : "hideSidebar negativeTop")}>
      <CloseIcon fontSize="large" onClick={() => {triggerCloseSidebar()}}/>
      <h1>hello</h1>
    </div>
  );
}

export default Sidebar;

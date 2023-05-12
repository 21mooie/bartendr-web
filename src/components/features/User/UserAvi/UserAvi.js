import React from 'react';
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import './UserAvi.css';

function UserAvi({avi, username}) {
  return (
    <div className='userAvi'>
      {
        avi === null || avi === '' ?
          <AccountCircleIcon  style={{ fontSize: 150 }}/>
        :
          <img
            className='userAvi__image'
            src={avi}
            alt={`${username} profile pic`}/>
      }
    </div>
  );
}

export default UserAvi;

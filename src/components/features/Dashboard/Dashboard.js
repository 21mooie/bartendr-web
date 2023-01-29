import React from 'react';
import { connect } from "react-redux";


export const Dashboard = ({user}) => {

   return (
     <div>
       <h2>{user.username}</h2>
       <p>{user.email}</p>
       <p>hello world</p>
     </div>
   );
}

function mapStateToProps(user) {
  return {
    user
  }
}

export const ConnectedDashboard = connect(mapStateToProps)(Dashboard);

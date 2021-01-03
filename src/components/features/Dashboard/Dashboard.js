import React from 'react';
import { connect } from "react-redux";


export const Dashboard = ({user}) => {

   return (
     <div>
       <h2>{user.username}</h2>
       <p>{user.email}</p>
     </div>
   );
}

function mapStateToProps(state) {
  return {
    user: state
  }
}

export const ConnectedDashboard = connect(mapStateToProps)(Dashboard);

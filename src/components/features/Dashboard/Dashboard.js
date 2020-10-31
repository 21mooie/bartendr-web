import React from 'react';
import { connect } from "react-redux";


export const Dashboard = ({user}) => {
 return (
   <div>
      <h2> Dashboard </h2>
      Hi {user.username}!
   </div>
 );
}

function mapStateToProps(state) {
  return {
    user: state
  }
}

export const ConnectedDashboard = connect(mapStateToProps)(Dashboard);

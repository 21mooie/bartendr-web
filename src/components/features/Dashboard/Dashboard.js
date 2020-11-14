import React from 'react';
import { connect } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";


export const Dashboard = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
   return (
     isAuthenticated && (
       <div>
         <img src={user.picture} alt={user.name} />
         <h2>{user.name}</h2>
         <p>{user.email}</p>
       </div>
     )
   );
}

function mapStateToProps(state) {
  return {
    user: state
  }
}

export const ConnectedDashboard = connect(mapStateToProps)(Dashboard);

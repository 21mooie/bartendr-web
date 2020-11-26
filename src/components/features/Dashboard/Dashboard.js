import React from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";


export const Dashboard = ({user}) => {

   return (
     <div>
       <h2>{user.username}</h2>
       <p>{user.email}</p>
       <Link to="/user/muatatest1125">
         Click here
       </Link>
     </div>
   );
}

function mapStateToProps(state) {
  return {
    user: state
  }
}

export const ConnectedDashboard = connect(mapStateToProps)(Dashboard);

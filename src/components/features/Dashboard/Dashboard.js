import React from 'react';
import { connect } from "react-redux";


export const Dashboard = ({username, email}) => {

   return (
     <div>
       <h2>{username}</h2>
       <p>{email}</p>
       <p>hello world</p>
     </div>
   );
}

function mapStateToProps(state) {
  return {
    username: state.user.username,
    email: state.user.email
  }
}

export const ConnectedDashboard = connect(mapStateToProps)(Dashboard);

import React, {useState} from 'react';
import { connect } from "react-redux";
import DrinkCard from "../common/DrinkCard/DrinkCard";


export const Dashboard = ({user}) => {
  const [drink, setDrink] = useState({drinkName: 'bubbly'});
 return (
   <div>
      <h2> Dashboard </h2>
      Hi {user.username}!
      <DrinkCard drink={drink}/>
   </div>
 );
}

function mapStateToProps(state) {
  return {
    user: state
  }
}

export const ConnectedDashboard = connect(mapStateToProps)(Dashboard);

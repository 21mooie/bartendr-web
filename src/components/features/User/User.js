import React, {useEffect, useState} from 'react';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import { connect } from "react-redux";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import axios from "axios";

import "./User.css";
import { requestChangeUsername } from "../../../store/mutations";
import { url } from '../../../consts';
import DrinkCard from "../../common/DrinkCard/DrinkCard";
import UserInfoForm from './UserInfoForm/UserInfoForm';
import FollowButton from './FollowButton/FollowButton';

export function User({user, changeUsername, match}) {
  const [newUsername, setUsername] = useState('');
  const [editInfoToggled, setEditInfoToggled] = useState(false);
  const [drink, setDrink] = useState(null);

  useEffect(() => {
    // will need to refactor on redirect this is causing memory leak
    function getCocktail() {
      axios.get(`${url}/cocktail`).then((response) => {
        setDrink(response.data['drinks'][0]);
      });
    }
    if (!drink) {
      getCocktail();
    }
  }, [drink]);

  return (
    <div className="user">
      <div className="user__photo">
        <AccountCircleIcon  style={{ fontSize: 100 }}/>
      </div>
      <h3>{match.params.username}</h3>
      <UserInfoForm
        viewingCurrentUserProfile={user.username === match.params.username}
        editInfoProp={editInfoToggled}
        setEditInfoProp={setEditInfoToggled}
        setUsernameProp={setUsername}
      />
      <FollowButton
        viewingCurrentUserProfile={user.username === match.params.username}
        alreadyFollowing={false}
      />
      <div className="user__favDrinks">
        <h3>Favorite Drinks</h3>
          <div className="user__favDrink__grid">
            {
              user.fav_drinks.drinks.map((fav_drink) => (
                  <div className="user__favDrink__item" key={fav_drink.idDrink}>
                    <DrinkCard drink={fav_drink}/>
                  </div>
                
              ))
            }
          </div>
      </div>

    </div>
  )
}

function mapStateToProps(state) {
  return {
    user: state
  }
}

function mapDispatchToProps (dispatch, ownProps){
  return {
    changeUsername(uid, oldUsername, newUsername) {
      console.log('changing username', uid, oldUsername, newUsername);
      dispatch(requestChangeUsername(uid, oldUsername, newUsername))
    }
  }
}

export const ConnectedUser = connect(mapStateToProps, mapDispatchToProps)(User);

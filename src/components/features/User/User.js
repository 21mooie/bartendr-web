import React, {useEffect, useState} from 'react';
import { connect } from "react-redux";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import axios from "axios";

import "./User.css";
import { requestChangeUsername } from "../../../store/mutations";
import { url } from '../../../consts';
import UserInfoForm from './UserInfoForm/UserInfoForm';
import UserFavDrinks from './UserFavDrinks/UserFavDrinks';
import UserFollowButton from './FollowButton/UserFollowButton';

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
      <UserFollowButton
        viewingCurrentUserProfile={user.username === match.params.username}
        alreadyFollowing={false}
      />
      <UserFavDrinks 
        fav_drinks={user.fav_drinks}
      />
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

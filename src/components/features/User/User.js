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
  const [viewingCurrentUserProfile, setViewingCurrentUserProfile] = useState(user.username === match.params.username);
  const [viewedUser, setViewedUser] = useState({
    username: "",
    fav_drinks: {
      drinks: [],
      numDrinks: 0,
    }
  });

  useEffect(() => {
    setViewingCurrentUserProfile(user.username === match.params.username)
    if (viewingCurrentUserProfile) {
      setViewedUser({
        username: user.username,
        fav_drinks: user.fav_drinks
      });
    } else {
      axios.post(`${url}/users`,{username: match.params.username})
        .then((result) => {
          setViewedUser({
            username: result.data.state.username,
            fav_drinks: result.data.state.fav_drinks,
          })
        })
        .catch((err) => console.log(err))
    }
  }, [match.params.username, user.fav_drinks, user.username, viewingCurrentUserProfile]);



  return (
    <div className="user">
      <div className="user__photo">
        <AccountCircleIcon  style={{ fontSize: 100 }}/>
      </div>
      <h3>{viewedUser.username}</h3>
      <UserInfoForm
        viewingCurrentUserProfile={viewingCurrentUserProfile}
        editInfoProp={editInfoToggled}
        setEditInfoProp={setEditInfoToggled}
        setUsernameProp={setUsername}
      />
      <UserFollowButton
        viewingCurrentUserProfile={viewingCurrentUserProfile}
        alreadyFollowing={false}
      />
      <UserFavDrinks
        fav_drinks={viewedUser.fav_drinks}
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

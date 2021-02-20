import React, {useEffect, useState} from 'react';
import { connect } from "react-redux";
import axios from "axios";

import "./User.css";
import { url } from '../../../consts';
import EditUserInfo from './EditUserInfo/EditUserInfo';
import UserFavDrinks from './UserFavDrinks/UserFavDrinks';
import UserFollowButton from './FollowButton/UserFollowButton';
import UserAvi from './UserAvi/UserAvi';
import {
  requestUpdateWhoCurrentUserFollows,
  requestUpdateAvi,
} from "../../../store/mutations";

export function User({user, match, updateWhoCurrentUserFollows, updateAvi}) {
  const [editInfoToggled, setEditInfoToggled] = useState(false);
  const [viewingCurrentUserProfile, setViewingCurrentUserProfile] = useState(user.username === match.params.username);
  const [isFollowing, setIsFollowing] = useState(false);
  const [viewedUser, setViewedUser] = useState({
    username: '',
    fav_drinks: {
      drinks: [],
      numDrinks: 0,
    },
    uid: '',
    following: [],
    followers: [],
    avi: '',
  });

  useEffect(() => {
    setViewingCurrentUserProfile(user.username === match.params.username)
    if (viewingCurrentUserProfile) {
      setViewedUser({
        username: user.username,
        fav_drinks: user.fav_drinks,
        uid: user.uid,
        following: user.following,
        followers: user.followers,
        avi: user.avi,
      });
    } else {
      axios.post(`${url}/users`,{username: match.params.username})
        .then((result) => {
          setViewedUser({
            username: result.data.state.username,
            fav_drinks: result.data.state.fav_drinks,
            uid: result.data.state.uid,
            following: result.data.state.following,
            followers: result.data.state.followers,
            avi: result.data.state.avi,
          })
          determineIsFollowing(user.following, viewedUser.uid);
        })
        .catch((err) => console.log(err))
    }
  }, [match.params.username, user.fav_drinks, user.followers, user.following, user.uid, user.username, viewedUser.uid, viewingCurrentUserProfile]);

  function determineIsFollowing(following, viewedUserUid){
    if (following.find(element => element === viewedUserUid)) {
      setIsFollowing(true);
    } else {
      setIsFollowing(false);
    }
  }

  function updateFollowing() {
    updateWhoCurrentUserFollows(user.uid, viewedUser.uid, !isFollowing);
  }

  return (
    <div className="user">
      <UserAvi
        avi={viewedUser.avi}
        username={viewedUser.username}
      />
      <h3>{viewedUser.username}</h3>
      <EditUserInfo
        viewingCurrentUserProfile={viewingCurrentUserProfile}
        editInfoProp={editInfoToggled}
        toggleUpdateInfoForm={() => setEditInfoToggled(!editInfoToggled)}
        updateAvi={(dataUrl) => updateAvi(user.uid, dataUrl)}
      />
      <UserFollowButton
        viewingCurrentUserProfile={viewingCurrentUserProfile}
        alreadyFollowing={isFollowing}
        updateFollowing={() => updateFollowing()}
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

function mapDispatchToProps (dispatch){
  return {
    updateWhoCurrentUserFollows(currentUserUid, followedUserUid, wantsToFollow) {
      dispatch(requestUpdateWhoCurrentUserFollows(currentUserUid, followedUserUid, wantsToFollow));
    },
    updateAvi(uid, newAvi) {
      dispatch(requestUpdateAvi(uid, newAvi));
    }
  }
}

export const ConnectedUser = connect(mapStateToProps, mapDispatchToProps)(User);

import React, {useEffect, useState} from 'react';
import { connect } from "react-redux";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import axios from "axios";

import "./User.css";
import { url } from '../../../consts';
import UserInfoForm from './UserInfoForm/UserInfoForm';
import UserFavDrinks from './UserFavDrinks/UserFavDrinks';
import UserFollowButton from './FollowButton/UserFollowButton';
import { requestUpdateWhoCurrentUserFollows } from "../../../store/mutations";

export function User({user, match, updateWhoCurrentUserFollows}) {
  const [editInfoToggled, setEditInfoToggled] = useState(false);
  const [viewingCurrentUserProfile, setViewingCurrentUserProfile] = useState(user.username === match.params.username);
  const [isFollowing, setIsFollowing] = useState(false);
  const [viewedUser, setViewedUser] = useState({
    username: "",
    fav_drinks: {
      drinks: [],
      numDrinks: 0,
    },
    uid: "",
    following: [],
    followers: [],
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
          })
          determineIsFollowing(user.following, viewedUser.uid);
        })
        .catch((err) => console.log(err))
    }
  }, [match.params.username, user.fav_drinks, user.followers, user.following, user.uid, user.username, viewedUser.uid, viewingCurrentUserProfile]);

  function determineIsFollowing(following, viewedUserUid){
    if (following.find(element => element === viewedUserUid)) {
      setIsFollowing(true);
    }
  }

  function updateFollowing() {
    updateWhoCurrentUserFollows(user.uid, viewedUser.uid, !isFollowing);
    // setIsFollowing(!isFollowing);
  }

  return (
    <div className="user">
      <div className="user__photo">
        <AccountCircleIcon  style={{ fontSize: 100 }}/>
      </div>
      <h3>{viewedUser.username}</h3>
      <UserInfoForm
        viewingCurrentUserProfile={viewingCurrentUserProfile}
        editInfoProp={editInfoToggled}
        updateInfo={() => setEditInfoToggled(!editInfoToggled)}
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
    }
  }
}

export const ConnectedUser = connect(mapStateToProps, mapDispatchToProps)(User);

import React, {useEffect, useState} from 'react';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import { connect } from "react-redux";
import {requestChangeUsername} from "../../../store/mutations";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import axios from "axios";

import "./User.css";
import DrinkCard from "../../common/DrinkCard/DrinkCard";
const url = 'http://localhost:7777/';

export function User({user, changeUsername}) {
  const [newUsername, setUsername] = useState('');
  const [drink, setDrink] = useState(null);

  useEffect(() => {
    // will need to refactor on redirect this is causing memory leak
    function getCocktail() {
      axios.get(`${url}cocktail`).then((response) => {
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
      <h3>{user.username}</h3>
      <Button>Change username</Button>
      <h2>Change your username here</h2>
      <form noValidate autoComplete="off">
      <TextField id="newUsername " label="New Username" onChange={event => setUsername(event.target.value)}/>
      <Button onClick={() => changeUsername(user.uid, user.username, newUsername)}>Submit</Button>
      </form>
      <Button>Follow</Button>
      <div className="user__favDrinks">
        <h3>Favorite Drinks</h3>
        <DrinkCard drink={drink}/>
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

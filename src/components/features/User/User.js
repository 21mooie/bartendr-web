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

  function isThisCurrentUser() {
    if (match.params.username === user.username) {
      return showCurrentUser();
    }
    return <Button>Follow</Button>;
  }

  const showCurrentUser = () => {
      let val = "";
      if (editInfoToggled) {
        val = (
          <div>
            <h2>Change your username here</h2>
            <form noValidate autoComplete="off">
              <TextField id="newUsername " label="New Username" onChange={event => setUsername(event.target.value)}/>
            </form>
            <Button onClick={() => {setEditInfoToggled(!editInfoToggled)}}>Cancel</Button>
            <Button onClick={() => {setEditInfoToggled(!editInfoToggled)}}>Submit</Button>
          </div>
        );
      } else {
        val = <Button onClick={() => {setEditInfoToggled(!editInfoToggled)}}>Edit info</Button>;
      }

      return val;
  };

  return (
    <div className="user">
      <div className="user__photo">
        <AccountCircleIcon  style={{ fontSize: 100 }}/>
      </div>
      <h3>{user.username}</h3>
      {
        isThisCurrentUser()
      }
      <div className="user__favDrinks">
        <h3>Favorite Drinks</h3>
        <div className="user__favDrink__grid">
          <div className="user__favDrink__item">
            <DrinkCard drink={drink}/>
          </div>
          <div className="user__favDrink__item">
            <DrinkCard drink={drink}/>
          </div>
          <div className="user__favDrink__item">
            <DrinkCard drink={drink}/>
          </div>
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

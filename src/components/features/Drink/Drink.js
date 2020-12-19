import React, {useEffect, useState} from 'react';
import axios from 'axios';
import FavoriteIcon from "@material-ui/icons/Favorite";
import { connect } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

import './Drink.css';
import NotFound from "../NotFound/NotFound";
import {url} from "../../../consts";
import * as mutations from '../../../store/mutations';


export function Drink({ username, favDrinks, match, updateFavDrinks }) {
  const {idDrink} = match.params;
  const [drink, setDrink] = useState(null);
  const [drinkNotFound, setDrinkNotFound] = useState(null);
  const [isFavDrink, setIsFavDrink] = useState(hasUserFaved());
  const [favDrinkToggled, setFavDrinkToggled] = useState(false);
  const { isAuthenticated } = useAuth0();

  useEffect( () => {
    setIsFavDrink(hasUserFaved());
    if (idDrink && !drink) {
      axios.post(`${url}/query/id`, {idDrink})
        .then(({data}) => {
          console.log(data);
          // set Drink variable for drink data or ingredient variable for ingredient data
          setDrink(data.drinks[0]);
          console.log(data.drinks[0]);
        })
        .catch((err) => {
          // render 404 error page
          setDrinkNotFound(true);
        });
    }
    if (favDrinkToggled) {
      updateFavDrinks(username, drink, isFavDrink);
    }
  }, [updateFavDrinks, drink, isFavDrink, match.params, idDrink, favDrinkToggled, favDrinks]);

  function hasUserFaved() {
    // must return negation because every only stops when evaled false
    // this keeps functionality while allowing logic to make sense
    return !favDrinks.drinks.every((drink) => {
      if (drink.idDrink === idDrink) {
        return false;
      }
      return true;
    });
  }
  return (
    <div className="drink">
      {
        drink &&
          <div className="drink__container">
            <div className="drink__imageNTitle">
              <div className="drink__image">
                <img src={drink.strDrinkThumb} alt={`${drink.strDrink}`}/>
              </div>
              <div className="drink__info">
                <h3 className="drink__title">{drink.strDrink}</h3>
                <p>Type: {drink.strAlcoholic}</p>
                <p>Category: {drink.strCategory}</p>
                <div className="drink__fav__icon">
                  {
                    isAuthenticated ?
                      <FavoriteIcon
                        fontSize="large"
                        color={isFavDrink? 'secondary' : 'disabled'}
                        onClick={() => {
                          setIsFavDrink(!isFavDrink);
                          setFavDrinkToggled(true);
                        }}
                      /> :
                      null
                  }
                </div>
              </div>
            </div>
            <div className="drink__detailed_info">
              <div className="drink__ingredients">
                <p className="drink__ingredients__label">Ingredients</p>
                <ul>
                  <li>{ drink.strMeasure1 } {drink.strIngredient1}</li>
                  <li>{ drink.strMeasure2 } {drink.strIngredient2}</li>
                </ul>
              </div>
              <div className="drink__instructions">
                <p className="drink__instructions__label">Instructions</p>
                <p>{drink.strInstructions}</p>
              </div>
            </div>
          </div>
      }
      {
        drinkNotFound &&
          <NotFound />
      }
    </div>
  )
}

function mapStateToProps(state) {
  return {
    username: state.username,
    favDrinks: state.fav_drinks
  }
}

function mapDispatchToProps (dispatch, ownProps){
  return {
    updateFavDrinks(username, drink, isFavDrink) {
      dispatch(mutations.requestUpdateFavDrinks(username, drink, isFavDrink))
    }
  }
}

const ConnectedDrink = connect(mapStateToProps, mapDispatchToProps)(Drink);
export default ConnectedDrink;

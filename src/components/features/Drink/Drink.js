import React, {useEffect, useState} from 'react';
import axios from 'axios';
import FavoriteIcon from "@material-ui/icons/Favorite";
import { connect } from "react-redux";

import './Drink.css';
import NotFound from "../NotFound/NotFound";
import {url} from "../../../consts";
import * as mutations from '../../../store/mutations';


export function Drink({ username, favDrinks, match, updateFavDrinks, isAuthenticated }) {
  const {idDrink} = match.params;
  const [drink, setDrink] = useState(null);
  const [drinkNotFound, setDrinkNotFound] = useState(null);
  const [isFavDrink, setIsFavDrink] = useState(false);
  const [favDrinkToggled, setFavDrinkToggled] = useState(false);

  useEffect( () => {
    setIsFavDrink(hasUserFaved());
    if (idDrink && !drink) {
      axios.post(`${url}/query/id`, {idDrink})
        .then(({data}) => {
          // set Drink variable for drink data or ingredient variable for ingredient data
          setDrink(data.drinks[0]);
        })
        .catch((err) => {
          // render 404 error page
          setDrinkNotFound(true);
        });
    }
    if (favDrinkToggled) {
      updateFavDrinks(username, drink, !isFavDrink);
      setFavDrinkToggled(false);
    }
  }, [updateFavDrinks, drink, isFavDrink, idDrink, favDrinkToggled, hasUserFaved, username, favDrinks]);

  function hasUserFaved() {
    // must return negation because every only stops when evaled false
    // this keeps functionality while allowing logic to make sense
    return !favDrinks.drinks.every((drink) => {
      return drink.idDrink !== idDrink;
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
                          setFavDrinkToggled(true);
                        }}
                      /> 
                      :
                      null
                  }
                </div>
              </div>
            </div>
            <div className="drink__detailed_info">
              <div className="drink__ingredients">
                <p className="drink__ingredients__label">Ingredients</p>
                <ul>
                  {
                    drink.strIngredientsArray.map((val, index) => (
                      <li key={index}>{ val.measure } { val.ingredient }</li>
                    ))
                  }
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

function mapStateToProps(user) {
  return {
    username: user.username,
    favDrinks: user.fav_drinks,
    isAuthenticated: user.isAuthenticated
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

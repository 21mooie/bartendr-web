import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {url} from "../../../consts";

import './Drink.css';

function Drink({match}) {
  const [drink, setDrink] = useState(null);

  useEffect( () => {
    const {idDrink} = match.params;
    if (idDrink) {
      axios.post(`${url}/query/id`, {idDrink})
        .then(({data}) => {
          console.log(data);
          // set based of if drink data or ingredient data
          setDrink(data.drinks[0]);
          console.log(data.drinks[0]);
        })
        .catch((err) => {
          // render 404 error page
        });
    }
  }, []);
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
    </div>
  )
}

export default Drink;

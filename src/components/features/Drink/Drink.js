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
          <div>
            <img src={drink.strDrinkThumb} />
            <h3>{drink.strDrink}</h3>
            <p>{drink.strAlcoholic}</p>
            <p>{drink.strCategory}</p>
            <p>{drink.strGlass}</p>
          </div>
      }
    </div>
  )
}

export default Drink;

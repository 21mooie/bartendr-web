import React, {useEffect} from 'react';
import axios from 'axios';
import {url} from "../../../consts";

function Drink({match}) {
  useEffect( () => {
    const {idDrink} = match.params;
    if (idDrink) {
      axios.post(`${url}/query/drink/id`, {idDrink})
        .then(({data}) => {
          console.log(data);
        })
        .catch((err) => {
          // render 404 error page
        });
    }
  }, []);
  return (
    <div>
      <p>This is drink</p>
    </div>
  )
}

export default Drink;

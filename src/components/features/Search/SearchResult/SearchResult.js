import React from 'react';
import {Link} from "react-router-dom";

import './SearchResult.css'
import FavoriteIcon from "@material-ui/icons/Favorite";


function SearchResult({result}) {
  return (
    <div className="searchResult">
        <Link to={`/drink/${result.idDrink}`}>
          <img  className="searchResult__image" src={result['strDrinkThumb']} alt/>
        </Link>
        <div className="searchResult__desc">
          <h3>{result.strDrink}</h3>
          <p>{result.strAlcoholic}</p>
          <p className="searchResults__ingredient">Made with {result.strIngredient1}</p>
          <div className="searchResults__instructions">
            {
              result.strInstructions.length < 50 ?
                <p>{result.strInstructions}</p>
              :
                <p>{result.strInstructions.substr(0, 45)} ...</p>
            }
          </div>
          <p className="searchResult__numLikes">x Likes</p>
          <FavoriteIcon
            style={{ fontSize: 40 }}
            color='secondary'
          />

        </div>
    </div>
  );
}

export default SearchResult;

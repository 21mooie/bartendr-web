import React from 'react';
import {Link} from "react-router-dom";

import './SearchResult.css'


function SearchResult({result}) {
  return (
    <div className="searchResult">
        <Link to={`/drink/${result.idDrink}`}>
          <img  className="searchResult__image" src={result['strDrinkThumb']} alt/>
        </Link>
        <div className="searchResult__desc">
          <h3>{result.strDrink}</h3>
          <p>{result.strAlcoholic}</p>
        </div>
    </div>
  );
}

export default SearchResult;

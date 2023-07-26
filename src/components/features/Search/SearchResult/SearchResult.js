import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";

import './SearchResult.css'
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as mutations from "../../../../store/mutations";
import {connect} from "react-redux";
import useWindowDimensions from "../../../../hooks/useWindowDimensions/useWindowDimensions";


function SearchResult({result, updateFavDrinks, username, favDrinks}) {
  const [isFavDrink, setIsFavDrink] = useState(false);
  const [favDrinkToggled, setFavDrinkToggled] = useState(false);
  const { width } = useWindowDimensions();

  useEffect(() => {
    setIsFavDrink(hasUserFaved());
    if (favDrinkToggled) {
      updateFavDrinks(username, result, !isFavDrink);
      setFavDrinkToggled(false);
    }
  }, [result, favDrinkToggled, hasUserFaved, isFavDrink, updateFavDrinks, username, width]);

  function hasUserFaved() {
    // must return negation because every only stops when evaled false
    // this keeps functionality while allowing logic to make sense

    return !favDrinks.every((currDrink) => {
      return currDrink.idDrink !== result.idDrink;
    });
  }



  return (
    <div className="searchResult">
        <Link to={`/drink/${result.idDrink}`}>
          <img  className="searchResult__image" src={result['strDrinkThumb']} alt={result.strDrink} />
        </Link>
        <div className="searchResult__desc">
          <h3>{result.strDrink}</h3>
          <p>{result.strAlcoholic}</p>
          <p className="searchResults__ingredient">Made with {result.strIngredient1}</p>
          <div className="searchResults__instructions">
            {
              width > 1200 ?
                result.strInstructions.length < 55 ?
                  <p>{result.strInstructions}</p>
                :
                  <p>{result.strInstructions.substr(0, 55)} ...</p>
              :
                result.strInstructions.length < 45 ?
                  <p>{result.strInstructions}</p>
                :
                  <p>{result.strInstructions.substr(0, 45)} ...</p>
            }
          </div>
          <p className="searchResult__numLikes">x Likes</p>
          <FavoriteIcon
            style={{ fontSize: 40 }}
            color={isFavDrink? 'secondary' : 'action'}
            onClick={() => {
              setFavDrinkToggled(true);
            }}
          />

        </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    username: state.user.username,
    favDrinks: state.favDrinks
  }
}

function mapDispatchToProps (dispatch){
  return {
    updateFavDrinks(username, drink, isFavDrink) {
      dispatch(mutations.requestUpdateFavDrinks(username, drink, isFavDrink))
    }
  }
}

const ConnectedSearchResult = connect(mapStateToProps, mapDispatchToProps)(SearchResult);

export default ConnectedSearchResult;

import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router";
import { useAuth0 } from '@auth0/auth0-react';
import {connect} from "react-redux";

import './DrinkCard.css';
import * as mutations from "../../../store/mutations";
import useWindowDimensions from "../../../hooks/useWindowDimensions/useWindowDimensions";

const useStyles = makeStyles({
  card_large: {
    maxWidth: 400,
    borderRadius: 30,
  },
  card_mini: {
    maxWidth: 300,
    borderRadius: 30,
  },
});

function DrinkCardwithRouter({drink, history, updateFavDrinks, username, favDrinks}) {
  const { isAuthenticated } = useAuth0();
  const [isFavDrink, setIsFavDrink] = useState(false);
  const [favDrinkToggled, setFavDrinkToggled] = useState(false);
  const classes = useStyles();
  const { width } = useWindowDimensions();

  useEffect(() => {
    setIsFavDrink(hasUserFaved());
    if (favDrinkToggled) {
      updateFavDrinks(username, drink, !isFavDrink);
      setFavDrinkToggled(false);
    }
  }, [drink, favDrinkToggled, hasUserFaved, isFavDrink, updateFavDrinks, username])

  function hasUserFaved() {
    // must return negation because every only stops when evaled false
    // this keeps functionality while allowing logic to make sense
    return !favDrinks.drinks.every((currDrink) => {
      return currDrink.idDrink !== drink.idDrink;
    });
  }

  return (
    <>
    {
      drink &&
      <div className="card">
      <Card className={width > 1200 ? classes.card_large : classes.card_mini}>
        <CardActionArea
          onClick = {() => history.push({pathname: `/drink/${drink.idDrink}`})
          }
        >
          <CardMedia
            component="img"
            alt={`${drink.strDrink}`}
            src={drink['strDrinkThumb']}
            title="Drink up"
          />
        </CardActionArea>
        <CardContent className="card__content">
          <div className="card__info">
            <Typography gutterBottom variant="h5" component="h2">
              {drink.strDrink}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Made of {drink.strIngredient1}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {drink.strAlcoholic}
            </Typography>
          </div>
          {
            isAuthenticated &&
            <div className="card__fav__container">
              <FavoriteIcon
                fontSize="large"
                color={isFavDrink? 'secondary' : 'disabled'}
                onClick={() => {
                  setFavDrinkToggled(true);
                }}
              />
            </div>
          }
        </CardContent>
      </Card>
    </div>
    }
    </>
  );
}

const ConnectedDrinkCard = withRouter(DrinkCardwithRouter);

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

const DrinkCard = connect(mapStateToProps, mapDispatchToProps)(ConnectedDrinkCard);

export default DrinkCard;

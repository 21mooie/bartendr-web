import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router";

import './DrinkCard.css';

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    borderRadius: 30,
  },
  media: {
    maxHeight: 450,
  },
});

function DrinkCardwithRouter({drink, history}) {
  const classes = useStyles();
  return (
    <>
    {
      drink &&
      <div className="card">
      <Card className={classes.root}>
        <CardActionArea
          onClick = {() => history.push({pathname: `/drink/${drink.idDrink}`})
          }
        >
          <CardMedia
            component="img"
            alt="drink"
            src={drink['strDrinkThumb']}
            title="Drink up"/>
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
            <div className="card__fav__container">
              <FavoriteIcon fontSize="large" color="secondary"/>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
    }
    </>
  );
}

const DrinkCard = withRouter(DrinkCardwithRouter);

export default DrinkCard;

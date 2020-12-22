import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router";
import { useAuth0 } from '@auth0/auth0-react';

import './DrinkCard.css';

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    borderRadius: 30,
  },
});

function DrinkCardwithRouter({drink, history}) {
  const { isAuthenticated } = useAuth0();
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
              <FavoriteIcon fontSize="large" color="secondary" />
            </div>
          }
        </CardContent>
      </Card>
    </div>
    }
    </>
  );
}

const DrinkCard = withRouter(DrinkCardwithRouter);

export default DrinkCard;

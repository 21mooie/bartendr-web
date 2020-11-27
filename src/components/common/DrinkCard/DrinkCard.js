import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from "react-router-dom";

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

export default function DrinkCard({drink}) {
  const classes = useStyles();
  return (
    <>
    {
      drink &&
      <div className="card">
      <Card className={classes.root}>
        <CardActionArea
          onClick = {() => {console.log('clicked');}}
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
        <CardActions>
          <Button size="small" color="primary">
            <Link to={`/drink/${drink.idDrink}`} className="card__link">
              Learn More
            </Link>
          </Button>

        </CardActions>
      </Card>
    </div>
    }
    </>
  );
}

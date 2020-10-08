import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import './DrinkCard.css';

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
  },
  media: {
    height: 350,
  },
});

export default function DrinkCard({drink}) {
  const classes = useStyles();
  return (
    <div className="card">
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="drink"
            className={classes.media}
            src={drink['strDrinkThumb']}
            title="Drink up"/>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {drink.strDrink}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Made of {drink.strIngredient1}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {drink.strAlcoholic}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={() => {console.log(`button clicked`);}}>
            Learn More
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

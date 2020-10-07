import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

export default function DrinkCard({drink}) {
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="drink"
          height="500"
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
  );
}

import React, {useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import axios from "axios";

import './LandingPage.css';
import DrinkCard from "../common/DrinkCard/DrinkCard";
import {makeStyles} from "@material-ui/core/styles";

const url = 'http://localhost:7777/';

const useStyles = makeStyles({
  leftButton: {
    marginRight: "10px",
  },
  rightButton: {
    marginLeft: "10px",
  },
  media: {
    height: 350,
  },
});

const LandingPage = () => {
  const classes = useStyles();
  const [drink, setDrink] = useState(null);
  const clickMe = () => {
    console.log('i was clicked');
  }

  useEffect(() => {
    // will need to refactor on redirect this is causing memory leak
    function getCocktail() {
      axios.get(`${url}cocktail`).then((response) => {
        setDrink(response.data['drinks'][0]);
      });
    }
    if (!drink) {
      getCocktail();
    }
  }, [drink]);

  return (

    <div className="main">
      <h1 className="title">Welcome to Bartender</h1>
      {
        drink
        &&
          <div className="title">
            <DrinkCard drink={drink}/>
          </div>
      }
      <div className="content">
        <p>Hello this is my cocktail app.</p>
        <Button className={classes.leftButton} variant="contained" color="primary" onClick={() => clickMe()}>
          <Link to="/login" className="link">
            Log in
          </Link>
        </Button>
        <Button className={classes.leftButton} variant="contained" color="primary">
          <Link to="/signup" className="link">
            Sign up
          </Link>
        </Button>
      </div>
    </div>

  )
}



export default LandingPage;

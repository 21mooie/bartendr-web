import React, {useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import axios from "axios";

import './LandingPage.css';
import DrinkCard from "../common/DrinkCard/DrinkCard";

const url = 'http://localhost:7777/';


const LandingPage = () => {
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
      <div className="content">
        <p>Hello this is my cocktail app.</p>
        <Button variant="contained" color="primary" onClick={() => clickMe()}>
          <Link to="/login" className="link">
            Log in
          </Link>
        </Button>
        <Button variant="contained" color="primary">
          <Link to="/signup" className="link">
            Sign up
          </Link>
        </Button>
      </div>
      {
        drink
        &&
          <DrinkCard drink={drink}/>
      }
    </div>

  )
}



export default LandingPage;

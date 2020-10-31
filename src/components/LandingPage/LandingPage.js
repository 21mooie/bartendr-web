import React, {useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import axios from "axios";
import {makeStyles} from "@material-ui/core/styles";

import './LandingPage.css';
import Hero from "../common/Hero/Hero";
import Info from "../common/Info/Info";
import party from "../../images/undraw_having_fun_iais.svg";

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
      <Hero />
      {
        drink
        &&
          <div className="content_LandingPage">
            <Info
              drink={drink}
              dark={true}
              topline="Personalized recommendations"
              heading="Try this drink"
              subtitle="Receive great drink suggestions based on your preferences thanks to our personalization engine"
              imgLeft={false}
              buttonPresent={false}
            />
            <Info
              img={party}
              dark={false}
              topline="Community Oriented"
              heading="Meet other drink enthusiasts"
              subtitle="Make friends and share recipes for popular drinks"
              imgLeft={true}
              buttonPresent={false}
            />
            <div>
              <Button className={classes.leftButton} variant="contained" color="primary" onClick={() => clickMe()}>
                <Link to="/login" className="link">
                  Log in
                </Link>
              </Button>
            </div>
          </div>
      }
    </div>

  )
}



export default LandingPage;

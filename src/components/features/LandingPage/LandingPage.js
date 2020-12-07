import React, {useEffect, useState} from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import {useAuth0} from "@auth0/auth0-react";
import {url} from '../../../consts';

import './LandingPage.css';
import Hero from "../../common/Hero/Hero";
import Info from "../../common/Info/Info";
import party from "../../../images/undraw_having_fun_iais.svg";

const LandingPage = () => {
  const [drink, setDrink] = useState(null);
  const { isAuthenticated } = useAuth0();

  useEffect(() => {
    // will need to refactor on redirect this is causing memory leak
    function getCocktail() {
      axios.get(`${url}/cocktail`).then((response) => {
        setDrink(response.data['drinks'][0]);
      });
    }
    if (!drink) {
      getCocktail();
    }
  }, [drink]);

  function autoLoginUser() {
    console.log(`isAuthenticated: ${isAuthenticated}`);
    if (isAuthenticated) {
      return <Redirect to="/dashboard"/>
    }
  }

  return (

    <div className="main">
      {
        autoLoginUser()
      }
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
            />
            <Info
              img={party}
              dark={false}
              topline="Community Oriented"
              heading="Meet other drink enthusiasts"
              subtitle="Make friends and share recipes for popular drinks"
              imgLeft={true}
            />
          </div>
      }
    </div>

  )
}



export default LandingPage;

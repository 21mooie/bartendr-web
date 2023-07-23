import React, {useEffect, useState} from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";


import './LandingPage.css';
import Hero from "../../common/Hero/Hero";
import Info from "../../common/Info/Info";
import party from "../../../images/undraw_having_fun_iais.svg";
import UserPool from "../../../services/UserPool";
import { connect } from "react-redux";
import { requestUser } from "../../../store/mutations";
import {url} from '../../../consts';

const LandingPage = ({isAuthenticated, requestUser}) => {
  const history = useHistory();

  const [drink, setDrink] = useState(null);

  useEffect(() => {
    if (!isAuthenticated){
      if (!autoLoginUser()){
        getCocktail();
      };
    }
    
    if (isAuthenticated) {
      history.push('/dashboard');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  function getCocktail() {
    axios.get(`${url}/cocktail`).then((response) => {
       setDrink(response.data['drinks'][0]);
    }).catch((err) => {
      console.error(err);
    });
  }

  function autoLoginUser() {
    console.log('running autologinuser');
    const cognitoUser = UserPool.getCurrentUser();
    if (cognitoUser !== null) {
      let username = cognitoUser.getUsername();
      console.log(`username: ${username}`);
      requestUser(username);
      return true;
    }
    return false;
  }

  return (

    <div className="landingPage">
      <Hero />
      {
        drink
        &&
          <div className="landingPage__content">
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

function mapStateToProps(user) {
  return {
    isAuthenticated: user.authenticated.status,
  }
}

function mapDispatchToProps (dispatch){
  return {
    requestUser(username) {
      dispatch(requestUser(username));
    }
  }
}

const ConnectedLandingPage = connect(mapStateToProps, mapDispatchToProps)(LandingPage)


export default ConnectedLandingPage;

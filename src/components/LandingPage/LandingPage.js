import React from "react";
import Button from "@material-ui/core/Button";

import './LandingPage.css';

const LandingPage = () => {
  const clickMe = () => {
    console.log('i was clicked');
  }
  return (
    <div className="main">
      <div className="content">
        <p>Hello this is my cocktail app.</p>
        <Button variant="contained" color="primary" onClick={() => clickMe()}>
          Log in
        </Button>
        <Button variant="contained" color="primary">
          Sign up
        </Button>
      </div>
    </div>
  )
}

export default LandingPage;

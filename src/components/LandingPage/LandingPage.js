import React from "react";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";

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
    </div>
  )
}

export default LandingPage;

import React from 'react';

import './Hero.css'
import video from "../../../videos/production ID_4694341.mp4";
import Button from "../Button/Button";

const Hero = (props) => {
  return (
    <div className="container">
      <div className="background">
        <video className="video" loop autoPlay muted>
          <source src={video} type="video/mp4"/>
        </video>
      </div>
      <div className="content">
        <h1>Order the perfect drink, every time</h1>
        <p>Join a community of drinking enthusiasts and share recipes</p>
        <div className="btnWrapper">
          <Button text="Get started" urlPath="signup" icon={true}/>
        </div>
      </div>
    </div>
  );
};

export default Hero;

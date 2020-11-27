import React from 'react';

import './Hero.css'
import video from "../../../videos/production ID_4694341.mp4";
import CTAButton from "../Button/CTAButton";
import { useAuth0 } from "@auth0/auth0-react";

const Hero = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <div className="hero">
      <div className="hero__background">
        <video className="hero__video" loop autoPlay muted>
          <source src={video} type="video/mp4"/>
        </video>
      </div>
      <div className="hero__content">
        <h1>Order the perfect drink, every time</h1>
        <p>Join a community of drinking enthusiasts and share recipes</p>
        <div className="hero__btnWrapper">
          <CTAButton text="Get started" func={loginWithRedirect} icon={true}/>
        </div>
      </div>
    </div>
  );
};

export default Hero;

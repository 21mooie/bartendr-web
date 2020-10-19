import React from 'react';

import './Hero.css'
import video from "../../../videos/production ID_4694341.mp4";

const Hero = (props) => (
  <div className="container">
    <div className="background">
        <video loop autoPlay muted className="video" >
          <source src={video} type="video/mp4"/>
        </video>
    </div>
  </div>
);

export default Hero;

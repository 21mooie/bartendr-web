import React from 'react';

import './Info.css';
import Button from "../Button/Button";
import DrinkCard from "../DrinkCard/DrinkCard";

function Info({drink, buttonPresent, topline, heading, subtitle}) {
  return (
    <div className="Info_container">
      <div className="Info_wrapper">
        <div className="Info_row">
          <div className="Info_column1">
            <div className="Info_text_wrapper">
              <p className="Info_topline">{topline}</p>
              <h3>{heading}</h3>
              <p className="Info_subtitle">{subtitle}</p>
              {
                buttonPresent &&
                <div className="Info_button_wrap">
                  <Button />
                </div>
              }
            </div>
          </div>
          <div className="Info_column2">
            <div className="Info_img_wrap">
              {/*<img src="https://www.w3schools.com/images/w3schools_green.jpg"/>*/}
              <DrinkCard drink={drink} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Info;
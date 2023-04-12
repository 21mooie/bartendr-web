import React from 'react';

import './Info.css';
import ConnectedDrinkCard from "../DrinkCard/DrinkCard";

function Info({drink, img, topline, heading, subtitle, imgLeft, dark}) {
  return (
    <div className={dark ? "info--dark" : "info--light"}>
      <div className="info__wrapper">
        <div className={imgLeft ? "info__row_img_left" : "info__row_img_right"}>
          <div className="info__column1">
            <div className="info__text_wrapper">
              <p className="info__topline">{topline}</p>
              <h3 className={dark ? "info--heading-dark" : "info--heading-light"}>{heading}</h3>
              <p className={dark ? "info--subtitle-dark" : "info--subtitle-light"}>{subtitle}</p>
            </div>
          </div>
          <div className="info__column2">
            <div className="info__img_wrap">
              {
                img &&
                  <img src={img} />
              }
              {
                drink &&
                <ConnectedDrinkCard drink={drink} />
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Info;

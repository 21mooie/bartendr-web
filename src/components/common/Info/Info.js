import React from 'react';

import './Info.css';
import DrinkCard from "../DrinkCard/DrinkCard";

function Info({drink, img, topline, heading, subtitle, imgLeft, dark}) {
  return (
    <div className={dark ? "Info_container_dark" : "Info_container_light"}>
      <div className="Info_wrapper">
        <div className={imgLeft ? "Info_row_img_left" : "Info_row_img_right"}>
          <div className="Info_column1">
            <div className="Info_text_wrapper">
              <p className="Info_topline">{topline}</p>
              <h3 className={dark ? "Info_heading_dark" : "Info_heading_light"}>{heading}</h3>
              <p className={dark ? "Info_subtitle_dark" : "Info_subtitle_light"}>{subtitle}</p>
            </div>
          </div>
          <div className="Info_column2">
            <div className="Info_img_wrap">
              {
                img &&
                  <img src={img} />
              }
              {
                drink &&
                <DrinkCard drink={drink} />
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Info;

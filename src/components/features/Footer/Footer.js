import React from 'react';
import {Link} from "react-router-dom";
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import YouTubeIcon from '@material-ui/icons/YouTube';
import TwitterIcon from '@material-ui/icons/Twitter';

import './Footer.css';

export const Footer = (props) => {
  return (
    <footer className="footer">
      <div className="footer__wrapper">
        <div className="footer__links_container">
          <div className="footer__links_wrapper">
            <div className="footer__link_items">
              <h3 className="footer__link_title">About Us</h3>
              <Link className="footer__link">How it works</Link>
            </div>
            <div className="footer__link_items">
              <h3 className="footer__link_title">Contact Us</h3>
              <Link className="footer__link">Submit an issue</Link>
            </div>
          </div>
          <div className="footer__links_wrapper">
            <div className="footer__link_items">
              <h3 className="footer__link_title">Videos</h3>
              <Link className="footer__link">Blah blah blah</Link>
            </div>
            <div className="footer__link_items">
              <h3 className="footer__link_title">Other</h3>
              <div className="footer__link">Whatever else</div>
            </div>
          </div>
        </div>
        <div className="footer__social_media">
          <div className="footer__social_media_wrap">
            <Link className="footer__social_logo">Bartendr</Link>
            <p className="footer__website_rights">Bartender © {new Date().getFullYear()} All rights reserved.</p>
            <div className="footer__social_icons">
              <Link className="footer__social_icon_link"><FacebookIcon /></Link>
              <Link className="footer__social_icon_link"><InstagramIcon /></Link>
              <Link className="footer__social_icon_link"><YouTubeIcon /></Link>
              <Link className="footer__social_icon_link"><TwitterIcon /></Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

import React from 'react';
import {Link} from "react-router-dom";
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import YouTubeIcon from '@material-ui/icons/YouTube';
import TwitterIcon from '@material-ui/icons/Twitter';

import './Footer.css';

export const Footer = (props) => {
  return (
    <footer className="Footer_container">
      <div className="Footer_wrapper">
        <div className="Footer_links_container">
          <div className="Footer_links_wrapper">
            <div className="Footer_link_items">
              <h3 className="Footer_link_title">About Us</h3>
              <Link className="Footer_link">How it works</Link>
            </div>
            <div className="Footer_link_items">
              <h3 className="Footer_link_title">Contact Us</h3>
              <Link className="Footer_link">Submit an issue</Link>
            </div>
          </div>
          <div className="Footer_links_wrapper">
            <div className="Footer_link_items">
              <h3 className="Footer_link_title">Videos</h3>
              <Link className="Footer_link">Blah blah blah</Link>
            </div>
            <div className="Footer_link_items">
              <h3 className="Footer_link_title">Other</h3>
              <div className="Footer_link">Whatever else</div>
            </div>
          </div>
        </div>
        <div className="Footer_social_media">
          <div className="Footer_social_media_wrap">
            <Link className="Footer_social_logo">Bartender</Link>
            <p className="Footer_website_rights">Bartender © {new Date().getFullYear()} All rights reserved.</p>
            <div className="Footer_social_icons">
              <Link className="Footer_social_icon_link"><FacebookIcon /></Link>
              <Link className="Footer_social_icon_link"><InstagramIcon /></Link>
              <Link className="Footer_social_icon_link"><YouTubeIcon /></Link>
              <Link className="Footer_social_icon_link"><TwitterIcon /></Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

import React from 'react';
import {Link} from "react-router-dom";

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
      </div>
    </footer>
  );
}

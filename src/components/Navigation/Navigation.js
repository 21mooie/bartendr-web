import React, {useEffect, useState} from "react";
import {Link, useLocation } from "react-router-dom";

const Navigation = ({navUrls}) => {
  const routerLocation = useLocation();
  const [location, setLocation] = useState('');
  const [show, setShow] = useState(false);

  useEffect(() => {
    setLocation(routerLocation.pathname);
    if (navUrls.find(url => url === location)) {
      setShow(true);
    }
  }, [routerLocation.pathname, location, navUrls],);

  return (
    <div>
      {
        show ? (
          <Link to="dashboard">
            <h1>My dashboard</h1>
            <p>{location}</p>
          </Link>
        ) : <></>
      }
    </div>
  )
}

export default Navigation;


import React, {useEffect, useState} from "react";
import {Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const routerLocation = useLocation();
  const [location, setLocation] = useState(routerLocation.pathname);
  useEffect(() => {
     setLocation(routerLocation.pathname);
  }, [routerLocation.pathname]);
  return <div>
    <Link to="dashboard">
      <h1>My dashboard</h1>
      <p>{location}</p>
    </Link>
  </div>
}

export default Navigation;


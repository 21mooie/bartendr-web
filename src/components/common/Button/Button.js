import React from 'react';
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import {makeStyles} from "@material-ui/core/styles";
import {Link} from "react-router-dom";

import "./Button.css";

const useStyles = makeStyles({
  button: {
    marginLeft: 8,
    fontSize: 20,
    marginTop: 2,
  },
});

const Button = (props) => {
  const classes = useStyles();

  return (
    <Link to="signup" className="btn">Get started <ArrowRightAltIcon className={classes.button} /> </Link>
  );
}

export default Button;

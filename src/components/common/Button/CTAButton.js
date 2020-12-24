import React from 'react';
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import {makeStyles} from "@material-ui/core/styles";

import "./CTAButton.css";

const useStyles = makeStyles({
  button: {
    marginLeft: 8,
    fontSize: 10,
    marginTop: 2,
  },
});

const CTAButton = ({text, icon, func}) => {
  const classes = useStyles();

  return (
    <button className="btn" onClick={() => {func()}}>
      {text}
      {
       icon &&
       <ArrowRightAltIcon className={classes.button} />
      }
    </button>
  );
}

export default CTAButton;

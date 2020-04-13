import React from "react";
import { Grid, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Cancel from "./CancelBtn";
import Check from "./Checkbtn";

const useStyles = makeStyles({
  root: {
    position: "fixed",
    bottom: "1vh",
    left: 0,
    padding: 0,
    textAlign: "center",
  },
});

export default function GameButtons(props) {
  const classes = useStyles();
  let width = window.innerWidth;
  if (width < 768) {
    return (
      <Container maxWidth="sm" className={classes.root}>
        <Cancel handleClear={props.handleClear} />
        <Check handleCheck={props.handleCheck} />
      </Container>
    );
  } else {
    return null;
  }
}

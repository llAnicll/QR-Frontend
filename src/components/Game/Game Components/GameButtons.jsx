import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import Cancel from "./CancelBtn";
import Check from "./Checkbtn";

const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    marginBottom: "4vh",
    marginLeft: "auto",
    marginRight: "auto"
  }
});

export default function GameButtons(props) {
  const classes = useStyles();
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      <Grid item>
        <Cancel handleClear={props.handleClear} />
      </Grid>
      <Grid item>
        <Check handleCheck={props.handleCheck} />
      </Grid>
    </Grid>
  );
}

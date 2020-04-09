import React from "react";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  alert: {
    marginBottom: "1vh"
  }
});

export default function Errors({ errors }) {
  const classes = useStyles();
  return errors.map(error => (
    <Alert severity="error" className={classes.alert}>
      {error.err}
    </Alert>
  ));
}

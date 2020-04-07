import React from "react";
import CheckIcon from "@material-ui/icons/Check";
import Fab from "@material-ui/core/Fab";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  fab: {
    backgroundColor: "#92278f",
    marginLeft: "5%",
  },
});

export default function Check(props) {
  const classes = useStyles();
  return (
    <Fab
      className={classes.fab}
      variant="extended"
      size="medium"
      onClick={props.handleCheck}
    >
      <CheckIcon />
      Check
    </Fab>
  );
}

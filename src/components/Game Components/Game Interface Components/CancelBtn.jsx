import React from "react";
import Fab from "@material-ui/core/Fab";
import ClearIcon from "@material-ui/icons/Clear";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  fab: {
    backgroundColor: "#92278f",
    marginRight: "5%",
  },
});

export default function Cancel(props) {
  const classes = useStyles();
  return (
    <Fab
      className={classes.fab}
      variant="extended"
      size="medium"
      onClick={props.handleCancel}
    >
      <ClearIcon />
      Cancel
    </Fab>
  );
}

import React from "react";
import Fab from "@material-ui/core/Fab";
import ClearIcon from "@material-ui/icons/Clear";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
    backgroundColor: "#92278f"
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

export default function Cancel(props) {
  const classes = useStyles();
  return (
    <Fab
      className={classes.margin}
      variant="extended"
      size="medium"
      onclick={props.handleCancel}
    >
      <ClearIcon className={classes.extendedIcon} />
      Cancel
    </Fab>
  );
}

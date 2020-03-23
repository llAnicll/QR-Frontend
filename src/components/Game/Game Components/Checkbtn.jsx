import React from "react";
import CheckIcon from "@material-ui/icons/Check";
import Fab from "@material-ui/core/Fab";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

export default function Check(props) {
  const classes = useStyles();
  return (
    <Fab
      className={classes.margin}
      variant="extended"
      size="medium"
      onClick={props.handleClick}
    >
      <CheckIcon className={classes.extendedIcon} />
      Check
    </Fab>
  );
}

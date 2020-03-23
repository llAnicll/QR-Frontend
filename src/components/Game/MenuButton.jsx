import React from "react";
import Fab from "@material-ui/core/Fab";
import { makeStyles } from "@material-ui/core/styles";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(1),
    position: "fixed",
    left: 0,
    top: 0
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

export default function MenuButton(props) {
  const classes = useStyles();
  return (
    <Fab variant="extended" onClick={props.onClick} className={classes.root}>
      <ExitToAppIcon className={classes.extendedIcon} />
      Quit
    </Fab>
  );
}

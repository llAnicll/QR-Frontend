import React from "react";
import FaceIcon from "@material-ui/icons/Face";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import LanguageTwoToneIcon from "@material-ui/icons/LanguageTwoTone";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import PlayCircleFilledTwoToneIcon from "@material-ui/icons/PlayCircleFilledTwoTone";

const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(255, 255, 255, 0)",
  },
  action: {
    color: "#ffff",
  },
});

export default function Nav(props) {
  const classes = useStyles();
  return (
    <BottomNavigation
      value={props.value}
      onChange={props.handleChange}
      className={classes.root}
    >
      <BottomNavigationAction
        label="Home"
        value="main"
        icon={<PlayCircleFilledTwoToneIcon />}
        className={classes.action}
      />
      <BottomNavigationAction
        label="Add"
        value="add"
        icon={<LanguageTwoToneIcon />}
        className={classes.action}
      />
    </BottomNavigation>
  );
}

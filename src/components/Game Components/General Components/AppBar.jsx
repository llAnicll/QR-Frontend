import React from "react";
import Chip from "@material-ui/core/Chip";
import AppBar from "@material-ui/core/AppBar";
import FaceIcon from "@material-ui/icons/Face";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const useStyles = makeStyles((theme) => ({
  chip: {
    marginRight: "auto",
  },
  lives: {
    marginRight: "auto",
    color: "#ffff",
  },
  exit: {
    color: "#ffff",
  },
}));

export default function Status(props) {
  const classes = useStyles();
  const { username, page, lives } = props;

  if (page === "game") {
    return (
      <AppBar position="static" color="transparent" elevation={1}>
        <Toolbar>
          <Chip icon={<FaceIcon />} label={username} className={classes.chip} />
          <Typography variant="h6" component="h6" className={classes.lives}>
            {lives} / 3
          </Typography>
          <Typography variant="h6" component="h6" className={classes.lives}>
            Score: {props.score}
          </Typography>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={props.handleQuit}
            className={classes.exit}
          >
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    );
  } else {
    return (
      <AppBar position="static" color="transparent" elevation={1}>
        <Toolbar>
          <Chip icon={<FaceIcon />} label={username} className={classes.chip} />
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            className={classes.exit}
            onClick={props.handleLogout}
          >
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    );
  }
}

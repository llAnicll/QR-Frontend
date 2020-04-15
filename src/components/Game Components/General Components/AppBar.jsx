import React from "react";
import Chip from "@material-ui/core/Chip";
import AppBar from "@material-ui/core/AppBar";
import FaceIcon from "@material-ui/icons/Face";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import HomeIcon from "@material-ui/icons/Home";
import SupervisorAccountOutlinedIcon from "@material-ui/icons/SupervisorAccountOutlined";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import ClearIcon from "@material-ui/icons/Clear";
import CheckIcon from "@material-ui/icons/Check";

import Drawer from "@material-ui/core/Drawer";

import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  chip: {
    marginRight: "auto",
  },
  lives: {
    marginRight: "auto",
    color: "#ffff",
  },
  exit: {
    color: "rgb(255,255,255)",
  },
  root: {
    display: "flex",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

export default function Status(props) {
  const classes = useStyles();
  const { username, page, lives } = props;
  let width = window.innerWidth;
  if (width > 768) {
    if (page === "game") {
      return (
        <div className={classes.root}>
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
            anchor="left"
          >
            <List>
              <ListItem
                button
                className={classes.exit}
                onClick={props.handleQuit}
              >
                <ListItemIcon>
                  <ExitToAppIcon className={classes.exit} />
                </ListItemIcon>
                <ListItemText primary="Exit" />
              </ListItem>
            </List>
            <Divider />
            <div className={classes.toolbar} />
            <List>
              <ListItem>
                <ListItemIcon>
                  <FaceIcon />
                </ListItemIcon>
                <ListItemText primary={username} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <FavoriteIcon />
                </ListItemIcon>
                <ListItemText primary={"Lives: " + lives} />
              </ListItem>
            </List>
            <div className={classes.toolbar} />
            <Divider />
            <List>
              <ListItem button onClick={props.handleCheck}>
                <ListItemIcon>
                  <CheckIcon />
                </ListItemIcon>
                <ListItemText primary="Check" />
              </ListItem>
              <ListItem button onClick={props.handleCancel}>
                <ListItemIcon>
                  <ClearIcon />
                </ListItemIcon>
                <ListItemText primary="Cancel" />
              </ListItem>
            </List>
          </Drawer>
        </div>
      );
    } else {
      return (
        <div className={classes.root}>
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
            anchor="left"
          >
            <List>
              <ListItem>
                <ListItemIcon>
                  <FaceIcon />
                </ListItemIcon>
                <ListItemText primary={username} />
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem button onClick={props.handleHome}>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
              {localStorage.getItem("accountType") === "2" ? (
                <ListItem button onClick={props.handleAdmin}>
                  <ListItemIcon>
                    <SupervisorAccountOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Admin" />
                </ListItem>
              ) : null}

              <ListItem button onClick={props.handleStart}>
                <ListItemIcon>
                  <PlayArrowIcon />
                </ListItemIcon>
                <ListItemText primary="Start" />
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem button onClick={props.handleLogout}>
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            </List>
          </Drawer>
        </div>
      );
    }
  } else {
    if (page === "game") {
      return (
        <AppBar position="static" color="transparent" elevation={1}>
          <Toolbar>
            <Chip
              icon={<FaceIcon />}
              label={username}
              className={classes.chip}
            />
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
            <Chip
              icon={<FaceIcon />}
              label={username}
              className={classes.chip}
            />
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
}

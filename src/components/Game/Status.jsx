import React from "react";
import Fab from "@material-ui/core/Fab";
import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";
import { makeStyles } from "@material-ui/core/styles";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: "2vh"
  },
  button: {
    float: "left",
    marginLeft: "1rem"
  },
  chip: {
    float: "right",
    marginRight: "1rem"
  },
  logoutbtn: {
    marginRight: "1vw"
  }
}));

export default function Status(props) {
  const classes = useStyles(0);
  const { username } = props;
  return (
    <div className={classes.container}>
      <Fab
        variant="extended"
        onClick={props.handleLogout}
        className={classes.button}
        size="small"
      >
        <ExitToAppIcon className={classes.logoutbtn} />
        logout
      </Fab>
      <Chip
        variant="outlined"
        color="primary"
        label={username}
        icon={<FaceIcon />}
        className={classes.chip}
      />
    </div>
  );
}

import React from "react";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  },
  button: {
    position: "fixed",
    transform: "translate(-50%, -50%)",
    bottom: "10vh",
    left: "50%"
  },
  title: {
    marginTop: "10vh"
  }
}));

export default function GamePrompt(props) {
  const classes = useStyles();
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      spacing={2}
    >
      <Grid item>
        <Typography variant="h4" component="h2" className={classes.title}>
          NCM <br /> Scavenger Hunt
        </Typography>
      </Grid>
      <Grid item>
        <Fab
          variant="extended"
          onClick={props.handleStart}
          className={classes.button}
        >
          <PlayArrowIcon className={classes.extendedIcon} />
          Start
        </Fab>
      </Grid>
    </Grid>
  );
}

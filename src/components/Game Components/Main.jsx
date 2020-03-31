import React from "react";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";

const useStyles = makeStyles({
  button: {
    position: "fixed",
    transform: "translate(-50%, -50%)",
    bottom: "10vh",
    left: "50%",
    backgroundColor: "#92278f"
  },
  title: {
    marginTop: "10vh",
    color: "white"
  }
});

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
          <PlayArrowIcon />
          Start
        </Fab>
      </Grid>
    </Grid>
  );
}

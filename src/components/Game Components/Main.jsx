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
    backgroundColor: "#92278f",
  },
  title: {
    marginTop: "10vh",
    color: "white",
  },
  titleTwo: {
    marginTop: "10vh",
    color: "white",
    width: "40rem",
    fontWeight: "bold",
  },
});

export default function GamePrompt(props) {
  const classes = useStyles();
  let width = window.innerWidth;
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      spacing={2}
    >
      <Grid item>
        {width < 768 ? (
          <Typography variant="h4" component="h2" className={classes.title}>
            NCM <br /> Scavenger Hunt
          </Typography>
        ) : (
          <Typography variant="h2" component="h2" className={classes.titleTwo}>
            NCM Scavenger Hunt
          </Typography>
        )}
      </Grid>
      <Grid item>
        {width < 768 ? (
          <Fab
            variant="extended"
            onClick={props.handleStart}
            className={classes.button}
          >
            <PlayArrowIcon />
            Start
          </Fab>
        ) : (
          <Typography variant="h5" className={classes.titleTwo}>
            1. Read the question
            <br />
            <br />
            2. Scan a QR code
            <br />
            <br />
            3. Check your answer
          </Typography>
        )}
      </Grid>
    </Grid>
  );
}

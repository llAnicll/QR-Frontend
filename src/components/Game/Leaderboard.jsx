import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  title: {
    marginTop: "1em",
    color: "#ffff"
  }
});

export default function Leaderboard() {
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
          Leaderboard
        </Typography>
      </Grid>
    </Grid>
  );
}

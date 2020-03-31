import React from "react";
import Grid from "@material-ui/core/Grid";
import { Typography, Container } from "@material-ui/core";
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
    <Container maxWidth="xs">
      <Typography variant="h4" component="h2" className={classes.title}>
        Leaderboard
      </Typography>
    </Container>
  );
}

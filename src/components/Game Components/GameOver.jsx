import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Button } from "@material-ui/core";

const useStyles = makeStyles({
  button: {
    textAlign: "center",
    position: "fixed",
    bottom: "1vh",
    left: 0,
    padding: 0,
  },
  text: {
    color: "#ffff",
    fontWeight: "400",
  },
});

export default function GameOver(props) {
  const classes = useStyles();
  const { page } = props;
  if (page === "win") {
    return (
      <Container maxWidth="sm">
        <Typography
          variant="h2"
          componenet="h4"
          gutterBottom="true"
          align="center"
          className={classes.text}
        >
          Game Over
        </Typography>
        <Typography
          variant="h5"
          componenet="h5"
          gutterBottom="true"
          align="center"
          className={classes.text}
        >
          You compleated all the questions with {props.lives}/3 lives remaining
        </Typography>
        <Container maxWidth="sm" className={classes.button}>
          <Button
            variant="contained"
            color="primary"
            onClick={props.handleReturn}
          >
            Continue
          </Button>
        </Container>
      </Container>
    );
  } else {
    return (
      <Container maxWidth="sm">
        <Typography
          variant="h2"
          componenet="h4"
          gutterBottom="true"
          align="center"
          className={classes.text}
        >
          Game Over
        </Typography>
        <Typography
          variant="h5"
          componenet="h5"
          gutterBottom="true"
          align="center"
          className={classes.text}
        >
          Aww, Looks like you are out of lives
        </Typography>
        <Container maxWidth="sm" className={classes.button}>
          <Button
            variant="contained"
            color="primary"
            onClick={props.handleReturn}
          >
            Continue
          </Button>
        </Container>
      </Container>
    );
  }
}

import React from "react";
import { Typography, Container, Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  title: {
    marginTop: "20%",
    marginBottom: "50vh",
    color: "white",
    textAlign: "center"
  },
  button: {
    width: "80%",
    maxWidth: "20rem",
    marginBottom: "3vh",
    marginLeft: "auto",
    marginRight: "auto"
  }
});

export default function Home(props) {
  const { handleLoginBtn, handleRegsiterBtn } = props;
  const classes = useStyles();
  return (
    <Container maxWidth="xs">
      <Typography variant="h1" component="h2" className={classes.title}>
        NMC
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleLoginBtn}
        className={classes.button}
      >
        Sign In
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={handleRegsiterBtn}
        className={classes.button}
      >
        Sign Up
      </Button>
    </Container>
  );
}

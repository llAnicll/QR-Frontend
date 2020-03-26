import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    marginBottom: "2vh"
  },
  title: {
    marginTop: "20%",
    marginBottom: "50vh",
    color: "white"
  },
  button: {
    width: "80%",
    maxWidth: "20rem",
    marginBottom: "3vh",
    ["@media (min-width: 600px)"]: {
      marginLeft: "1rem",
      marginRight: "1rem"
    }
  }
});

export default function HomePromp(props) {
  const classes = useStyles();
  return (
    <div>
      <Typography variant="h1" component="h2" className={classes.title}>
        NMC
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={props.handleBtnLogin}
        className={classes.button}
      >
        Sign In
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={props.handleBtnSignUp}
        className={classes.button}
      >
        Sign Up
      </Button>
    </div>
  );
}

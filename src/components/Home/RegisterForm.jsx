import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import Errors from "./Home Components/Errors";

const useStyles = makeStyles({
  paper: {
    display: "inline-block",
    padding: "1rem",
    marginTop: "10vh"
  },
  button: {
    float: "right"
  }
});

export default function RegisterForm(props) {
  const classes = useStyles();
  const { errors } = props;
  return (
    <Paper elevation={3} className={classes.paper}>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <Typography variant="h4" component="h2">
            Sign Up
          </Typography>
        </Grid>
        {errors.length > 0 ? (
          <Grid item>
            <Errors errors={props.errors} />
          </Grid>
        ) : null}
        <Grid item>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            onChange={props.handleEmailChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            onChange={props.handleUsernameChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            onChange={props.handlePasswordChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="outlined-basic"
            label="Re-type password"
            variant="outlined"
            onChange={props.handlePasswordAgainChange}
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={props.handleRegister}
          >
            Sign up
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

import React from "react";
import {
  TextField,
  Paper,
  Container,
  Button,
  Typography,
  makeStyles,
} from "@material-ui/core";

import Errors from "./General Components/Errors";

const useStyles = makeStyles({
  paper: {
    padding: "1rem",
    marginTop: "1vh",
  },
  button: {
    float: "right",
  },
});

export default function RegisterForm(props) {
  const classes = useStyles();
  const { errors, handleRegister } = props;
  return (
    <Container maxWidth="xs">
      <Paper elevation={2} className={classes.paper}>
        <Typography variant="h4" component="h2">
          Sign Up
        </Typography>

        {errors.length > 0 ? <Errors errors={props.errors} /> : null}

        <TextField
          id="outlined-basic"
          label="Email"
          name="email"
          variant="outlined"
          fullWidth={true}
          margin="normal"
          onChange={props.handleChange}
        />

        <TextField
          id="outlined-basic"
          label="Username"
          name="username"
          variant="outlined"
          fullWidth={true}
          margin="normal"
          onChange={props.handleChange}
        />

        <TextField
          id="outlined-basic"
          label="Password"
          name="password"
          variant="outlined"
          type="password"
          fullWidth={true}
          margin="normal"
          onChange={props.handleChange}
        />

        <TextField
          id="outlined-basic"
          label="Re-type password"
          name="passwordAgain"
          variant="outlined"
          type="password"
          fullWidth={true}
          margin="normal"
          onChange={props.handleChange}
        />
        <p className={classes.p}>
          <a href="#" onClick={props.handleLoginBtn} className={classes.link}>
            Already have an account?
          </a>
        </p>
        <br />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleRegister}
        >
          Sign up
        </Button>
      </Paper>
    </Container>
  );
}

import React from "react";
import {
  TextField,
  Paper,
  Container,
  Button,
  Typography,
  makeStyles
} from "@material-ui/core";

import Errors from "./General/Errors";

const useStyles = makeStyles({
  paper: {
    padding: "1rem",
    marginTop: "1vh"
  }
});

export default function RegisterForm(props) {
  const classes = useStyles();
  const { errors } = props;
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
          onChange={props.handleEmailChange}
        />

        <TextField
          id="outlined-basic"
          label="Username"
          name="username"
          variant="outlined"
          fullWidth={true}
          margin="normal"
          onChange={props.handleUsernameChange}
        />

        <TextField
          id="outlined-basic"
          label="Password"
          name="password"
          variant="outlined"
          fullWidth={true}
          margin="normal"
          onChange={props.handlePasswordChange}
        />

        <TextField
          id="outlined-basic"
          label="Re-type password"
          name="passwordAgain"
          variant="outlined"
          fullWidth={true}
          margin="normal"
          onChange={props.handlePasswordAgainChange}
        />
        <br />
        <Button
          variant="contained"
          color="primary"
          onClick={props.handleRegister}
        >
          Sign up
        </Button>
      </Paper>
    </Container>
  );
}

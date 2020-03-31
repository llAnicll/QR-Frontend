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
  const { errors, handleLogin } = props;
  return (
    <Container maxWidth="xs">
      <Paper elevation={2} className={classes.paper}>
        <Typography variant="h4" component="h2">
          Sign In
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
          label="Password"
          name="password"
          variant="outlined"
          fullWidth={true}
          margin="normal"
          onChange={props.handleChange}
        />
        <br />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleLogin}
        >
          Login
        </Button>
      </Paper>
    </Container>
  );
}

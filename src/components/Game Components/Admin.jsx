import React, { Component } from "react";
import axios from "axios";
import {
  Typography,
  Container,
  Paper,
  Button,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";

import Errors from "../Home Components/General Components/Errors";

const useStyles = makeStyles({
  paper: {
    padding: "1rem",
    marginTop: "1vh",
  },
  paperTwo: {
    padding: "1rem",
    margin: "1rem auto",
    width: "40rem",
  },
  title: {
    marginTop: "1em",
    color: "#ffff",
  },
  text: {
    textAlign: "center",
  },
  button: {
    float: "right",
  },
});

export default function Admin(props) {
  const classes = useStyles();
  const { errors, submited, handleSubmit, handleChange } = props;
  let width = window.innerWidth;
  if (width > 768) {
    return (
      <Container maxWidth="xs">
        <Paper elevation={2} className={classes.paperTwo}>
          <Typography variant="h4" component="h2">
            New Question
          </Typography>

          {errors.length > 0 ? <Errors errors={errors} /> : null}
          {submited ? (
            <Alert severity="success">New question added</Alert>
          ) : null}

          <TextField
            id="outlined-basic"
            label="Question"
            name="question"
            variant="outlined"
            fullWidth={true}
            margin="normal"
            multiline
            rowsMax={5}
            onChange={handleChange}
          />
          <TextField
            id="outlined-basic"
            label="Answer"
            name="answer"
            variant="outlined"
            fullWidth={true}
            margin="normal"
            multiline
            rowsMax={5}
            onChange={handleChange}
          />
          <br />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            className={classes.button}
          >
            Submit
          </Button>
        </Paper>
      </Container>
    );
  } else {
    return (
      <Container maxWidth="xs">
        <Paper elevation={2} className={classes.paper}>
          <Typography variant="h4" component="h2">
            Admin
          </Typography>

          {errors.length > 0 ? <Errors errors={errors} /> : null}
          {submited ? (
            <Alert severity="success">New question added</Alert>
          ) : null}

          <TextField
            id="outlined-basic"
            label="Question"
            name="question"
            variant="outlined"
            fullWidth={true}
            margin="normal"
            multiline
            rowsMax={5}
            onChange={handleChange}
          />
          <TextField
            id="outlined-basic"
            label="Answer"
            name="answer"
            variant="outlined"
            fullWidth={true}
            margin="normal"
            multiline
            rowsMax={5}
            onChange={handleChange}
          />
          <br />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            className={classes.button}
          >
            Submit
          </Button>
        </Paper>
      </Container>
    );
  }
}

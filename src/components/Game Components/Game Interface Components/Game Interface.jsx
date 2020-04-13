import React from "react";
import QrReader from "react-qr-reader";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Typography,
  Grid,
  Snackbar,
  Paper,
  TextField,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

import GameButtons from "./GameButtons";
//import Alert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function getWindowWidth() {
  const { innerWidth: width, innerHeight: height } = window;
  return width;
}
function getWindowHeight() {
  const { innerHeight: height } = window;
  return height;
}

function calcWidth() {
  return getWindowWidth() * 0.75;
}

const previewStyle = {
  width: calcWidth(),
};
const previewDesktopStyle = {
  width: 400,
};

const useStyles = makeStyles({
  paper: {
    marginTop: getWindowHeight() * 0.05,
    padding: "0.5rem",
    textAlign: "center",
  },
  paperTwo: {
    marginTop: getWindowHeight() * 0.05,
    padding: "0.5rem",
    textAlign: "center",
    width: "24rem",
  },
  paperAnswer: {
    marginTop: getWindowHeight() * 0.02,
    padding: "0.5rem",
    textAlign: "center",
  },
  paperAnswerTwo: {
    marginTop: getWindowHeight() * 0.02,
    padding: "0.5rem",
    textAlign: "center",
    width: "24rem",
  },
  text: {
    color: "#ffff",
  },
  answer: {
    width: "100%",
    textAlign: "center",
  },
});

export default function Game(props) {
  const classes = useStyles();
  const { result, question, open, severity, feedback } = props;
  const vertical = "top";
  const horizontal = "center";
  const {
    handleCheck,
    handleScan,
    handleError,
    handleClear,
    handleClose,
  } = props;
  let width = window.innerWidth;
  if (width > 768) {
    return (
      <Container maxWidth="sm">
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical, horizontal }}
        >
          <Alert onClose={handleClose} severity={severity}>
            {feedback}
          </Alert>
        </Snackbar>
        <Container maxWidth="sm">
          <QrReader
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={previewDesktopStyle}
          />
        </Container>
        <Container maxWidth="sm">
          <Paper elevation={3} className={classes.paperTwo}>
            <QuestionTitle />
            <Question question={question} />
          </Paper>
        </Container>

        <Container maxWidth="sm">
          <Paper elevation={3} className={classes.paperAnswerTwo}>
            <AnswerTitle />
            <Answer result={result} />
          </Paper>
        </Container>
        <GameButtons handleClear={handleClear} handleCheck={handleCheck} />
      </Container>
    );
  } else {
    return (
      <Container maxWidth="sm">
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical, horizontal }}
        >
          <Alert onClose={handleClose} severity={severity}>
            {feedback}
          </Alert>
        </Snackbar>
        <Container maxWidth="sm">
          <QrReader
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={previewStyle}
          />
        </Container>
        <Container maxWidth="sm">
          <Paper elevation={3} className={classes.paper}>
            <QuestionTitle />
            <Question question={question} />
          </Paper>
        </Container>

        <Container maxWidth="sm">
          <Paper elevation={3} className={classes.paperAnswer}>
            <AnswerTitle />
            <Answer result={result} />
          </Paper>
        </Container>
        <GameButtons handleClear={handleClear} handleCheck={handleCheck} />
      </Container>
    );
  }
}

function QuestionTitle() {
  const classes = useStyles();
  return (
    <Typography variant="h5" componenet="h4" gutterBottom={true} align="center">
      Question
    </Typography>
  );
}

function Question(props) {
  const classes = useStyles();
  const { question } = props;
  return (
    <Typography
      variant="body1"
      component="h6"
      gutterBottom={true}
      align="center"
    >
      {question}
    </Typography>
  );
}

function AnswerTitle() {
  const classes = useStyles();
  return (
    <Typography variant="h5" componenet="h4" gutterBottom={true} align="center">
      Answer
    </Typography>
  );
}

function Answer(props) {
  const classes = useStyles();
  const { result } = props;
  return (
    <TextField
      multiline
      rows="2"
      variant="outlined"
      className={classes.answer}
      value={result}
    ></TextField>
  );
}

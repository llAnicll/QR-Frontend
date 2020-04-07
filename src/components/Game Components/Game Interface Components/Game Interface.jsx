import React from "react";
import QrReader from "react-qr-reader";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Grid, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

import GameButtons from "./GameButtons";
//import Alert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return width;
}

function calcWidth() {
  return getWindowDimensions() * 0.75;
}

const previewStyle = {
  width: calcWidth(),
};

export default function Game(props) {
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
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={3}
      >
        <Grid item>
          <QrReader
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={previewStyle}
          />
        </Grid>
        <Grid item>
          <QuestionTitle />
          <Question question={question} />
        </Grid>

        <Grid item>
          <AnswerTitle />
          <Answer result={result} />
        </Grid>
      </Grid>
      <GameButtons handleClear={handleClear} handleCheck={handleCheck} />
    </Container>
  );
}

const useStyles = makeStyles({
  text: {
    color: "#ffff",
  },
});

function QuestionTitle() {
  const classes = useStyles();
  return (
    <Typography
      variant="h5"
      componenet="h4"
      gutterBottom={true}
      className={classes.text}
      align="center"
    >
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
      className={classes.text}
      align="center"
    >
      {question}
    </Typography>
  );
}

function AnswerTitle() {
  const classes = useStyles();
  return (
    <Typography
      variant="h5"
      componenet="h4"
      gutterBottom={true}
      className={classes.text}
      align="center"
    >
      Answer
    </Typography>
  );
}

function Answer(props) {
  const classes = useStyles();
  const { result } = props;
  return (
    <Typography
      variant="body1"
      component="h6"
      className={classes.text}
      align="center"
    >
      {result}
    </Typography>
  );
}

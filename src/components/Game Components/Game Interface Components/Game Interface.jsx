import React, { Component } from "react";
import QrReader from 'react-qr-reader'
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import GameButtons from "./GameButtons";

export class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      answers: [],
      index: 0,
      result: "",
    };

    this.handleCancel = this.handleCancel.bind(this);
  }

  // handle qr scanner output
  handleScan = data => {
    if (data) {
      this.setState({
        result: data
      })
    }
  }
  
  // handles qr scanner error
  handleError = err => {
    console.error(err)
  }

  handleCancel(e) {
    e.preventDefault();
  }


  render() {
    const { index, result } = this.state;
    const { questions } = this.props;
    const previewStyle = {
      height: 240,
      width: 350,
    }
    return (
      <div>
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
              onError={this.handleError}
              onScan={this.handleScan}
              style={previewStyle}
            />
          </Grid>
          <Grid item>
            <QuestionTitle />
            <Question question={questions[index]} />
          </Grid>

          <Grid item>
            <AnswerTitle />
            <Answer result={result} />
          </Grid>
        </Grid>
        <GameButtons
          handleClear={this.handleClear}
          handleCheck={this.props.handleCheck}
        />
      </div>
    );
  }
}

const useStyles = makeStyles({
  text: {
    color: "#ffff"
  }
});

function QuestionTitle() {
  const classes = useStyles();
  return (
    <Typography
      variant="h5"
      componenet="h4"
      gutterBottom="true"
      className={classes.text}
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
      gutterBottom="true"
      className={classes.text}
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
      gutterBottom="true"
      className={classes.text}
    >
      Answer
    </Typography>
  );
}

function Answer(props) {
  const classes = useStyles();
  const { result } = props;
  return (
    <Typography variant="body1" component="h6" className={classes.text}>
      {result}
    </Typography>
  );
}

export default Game;

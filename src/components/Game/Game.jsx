import React, { Component } from "react";
import QrReader from "react-qr-scanner";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import GameButtons from "./Game Components/GameButtons";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

export class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lives: 3,
      score: 0,
      questions: [],
      answers: [],
      index: 0,
      result: ""
    };

    this.handleScan = this.handleScan.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  // handle qr scanner output
  handleScan(data) {
    this.setState({
      result: data
    });
  }

  // handles qr scanner error
  handleError(err) {
    console.error(err);
  }

  // handle the confrim button press
  handleCheck(e) {
    e.preventDefault();
    const { result, answers, index } = this.state;
    if (this.state.result !== "") {
      if (result === answers[index]) {
        // When the user is correct
        this.setState({ result: "" });
      } else {
        // When the user is incorrect
        this.setState({ result: "" });
      }
    }
  }

  handleCancel(e) {
    e.preventDefault();
  }

  render() {
    const { lives, score, index, result } = this.state;
    const { questions } = this.props;
    const previewStyle = {
      height: 240,
      width: 320
    };

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
            <Typography variant="h6" component="h6">
              {lives} / 3
            </Typography>
            <Typography variant="h6" component="h6">
              Score: {score}
            </Typography>
          </Grid>
          <Grid item>
            <QrReader
              delay={this.state.delay}
              style={previewStyle}
              onError={this.handleError}
              onScan={this.handleScan}
            />
          </Grid>
          <Grid item>
            <Typography variant="h4" componenet="h4" gutterBottom="true">
              Question
            </Typography>
            <Typography variant="h6" component="h6" gutterBottom="true">
              {questions[index]}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h4" componenet="h4" gutterBottom="true">
              Answer
            </Typography>
            <Typography variant="h6" component="h6">
              {result}
            </Typography>
          </Grid>
        </Grid>
        <GameButtons
          handleClear={this.handleClear}
          handleCheck={this.handleCheck}
        />
      </div>
    );
  }
}

export default Game;

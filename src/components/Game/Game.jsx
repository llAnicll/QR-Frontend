import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import QrReader from "react-qr-scanner";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import Fab from "@material-ui/core/Fab";

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
      result: "",
      modalView: true
    };

    this.handleScan = this.handleScan.bind(this);
  }

  // handle qr scanner output
  handleScan(data) {
    this.setState({
      result: data,
      modalView: true
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

  render() {
    const { lives, score, index } = this.state;
    const { questions } = this.props;
    const previewStyle = {
      height: 240,
      width: 320
    };

    return (
      <div>
        <Grid>
          <Grid item>
            <Typography variant="h6" component="h6">
              {lives} / 3
            </Typography>
          </Grid>
          <Grid item>
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
            <Typography variant="h4" componenet="h4">
              Question
            </Typography>
            <Typography variant="h6" component="h6">
              {questions[index]}
            </Typography>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Game;

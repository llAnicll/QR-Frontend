import React, { Component } from "react";

// import components
import Nav from "./Game/Nav";
import GamePrompt from "./Game/GamePrompt";
import Grid from "@material-ui/core/Grid";
import Leaderboard from "./Game/Leaderboard";
import Game from "./Game/Game";
import axios from "axios";

import Status from "./Game/Status";

export default class GameHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "main",
      email: this.props.email,
      username: this.props.username,
      questions: [],
      answers: [],
      lives: 3,
      score: 0,
      index: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleMenuButton = this.handleMenuButton.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }

  // handle nav change
  handleChange(e, newValue) {
    e.preventDefault();
    this.setState({ page: newValue });
  }

  // handle start button click
  handleStart(e) {
    e.preventDefault();
    this.setState({ page: "game" });
    axios
      .get("http://localhost:5000/questions/getQuestion")
      .then(res => {
        res.data.forEach(q => {
          this.setState({
            questions: this.state.questions.concat([q.question]),
            answers: this.state.answers.concat([q.answer])
          });
        });
      })
      .catch(err => {
        console.log("Error: " + err);
      });
  }

  // handle the menu clicks
  handleMenuButton(e) {
    e.preventDefault();
    this.setState({ page: "main" });
  }

  // handle the confrim button press
  handleCheck(e) {
    e.preventDefault();
    const { result, answers, index } = this.state;
    if (this.state.result !== "") {
      if (result === answers[index]) {
        // When the user is correct
        this.setState({
          result: "",
          index: index + 1
        });
      } else {
        // When the user is incorrect
        this.setState({ result: "" });
      }
    } else {
      // the user did not scan an answer
    }
  }

  render() {
    const { page, username, questions, answers, lives, score } = this.state;

    switch (page) {
      case "main": // Prompt the user to login or register
        return (
          <div>
            <Status username={username} handleLogout={this.props.logout} />
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              spacing={2}
            >
              <Grid item>
                <GamePrompt handleStart={this.handleStart} />
              </Grid>
            </Grid>
            <Nav handleChange={this.handleChange} value={page} />
          </div>
        );
      case "leaderboard": // ranks page
        return (
          <div>
            <Status username={username} handleLogout={this.props.logout} />
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              spacing={2}
            >
              <Grid item>
                <Leaderboard />
              </Grid>
            </Grid>
            <Nav handleChange={this.handleChange} value={page} />
          </div>
        );
      case "game":
        return (
          <div>
            <Status
              username={username}
              handleQuit={this.handleMenuButton}
              page={this.state.page}
              lives={lives}
              score={score}
            />
            <Game
              questions={questions}
              answers={answers}
              handleCheck={this.handleCheck}
            />
          </div>
        );
    }
  }
}

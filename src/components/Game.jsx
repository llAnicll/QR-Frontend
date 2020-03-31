import React, { Component } from "react";
import axios from "axios";
import { Container } from "@material-ui/core";

// Components
import Nav from "./Game Components/General Components/Nav";
import AppBar from "./Game Components/General Components/AppBar";
import Main from "./Game Components/Main";
import Leaderboard from "./Game Components/Leaderboard";
import Game from "./Game Components/Game Interface Components/Game Interface";

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
  }

  // handle nav change
  handleChange = (e, newValue) => {
    e.preventDefault();
    this.setState({ page: newValue });
  };

  // handle start button click
  handleStart = e => {
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
  };

  // handle the menu clicks
  handleMenuButton = e => {
    e.preventDefault();
    this.setState({ page: "main" });
  };

  // handle the confrim button press
  handleCheck = e => {
    e.preventDefault();
    const { result, answers, index } = this.state;
    if (this.state.result !== "") {
      if (result === answers[index]) {
        // Correct
        this.setState({
          result: "",
          index: index + 1
        });
      } else {
        // Incorrect
        this.setState({ result: "" });
      }
    } else {
      // the user did not scan an answer
    }
  };

  render() {
    const { page, username, questions, answers, lives, score } = this.state;

    switch (page) {
      case "main": // The main page where user can start the game
        return (
          <Container maxWidth="xs">
            <AppBar
              username={username}
              handleLogout={this.props.handleLogout}
            />
            <Main handleStart={this.handleStart} />
            <Nav handleChange={this.handleChange} value={page} />
          </Container>
        );
      case "leaderboard": // Leaderboard Page
        return (
          <Container maxWidth="xs">
            <AppBar
              username={username}
              handleLogout={this.props.handleLogout}
            />
            <Leaderboard />
            <Nav handleChange={this.handleChange} value={page} />
          </Container>
        );
      case "game": // The actual game the user plays
        return (
          <Container maxWidth="xs">
            <AppBar
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
          </Container>
        );
    }
  }
}

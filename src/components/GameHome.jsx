import React, { Component } from "react";

// import components
import Nav from "./Game/Nav";
import Profile from "./Game/Profile";
import GamePrompt from "./Game/GamePrompt";
import Grid from "@material-ui/core/Grid";
import Leaderboard from "./Game/Leaderboard";
import MenuButton from "./Game/MenuButton";
import Game from "./Game/Game";
import Fab from "@material-ui/core/Fab";
import axios from "axios";

export default class GameHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "main",
      email: this.props.email,
      username: this.props.username,
      questions: [],
      answers: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleMenuButton = this.handleMenuButton.bind(this);
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
    let arr = [];
    axios
      .get("http://localhost:5000/questions/getQuestion")
      .then(res => {
        res.data.forEach(q => {
          console.log(q.question);
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

  render() {
    const { page, username, questions, answers } = this.state;

    switch (page) {
      case "main": // Prompt the user to login or register
        return (
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <GamePrompt username={username} handleStart={this.handleStart} />
            </Grid>
            <Grid item>
              <Fab variant="extended" onClick={this.props.logout}>
                logout
              </Fab>
            </Grid>
            <Grid item>
              <Nav handleChange={this.handleChange} value={page} />
            </Grid>
          </Grid>
        );
      case "profile": // Profile page
        return (
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <Profile />
            </Grid>
            <Grid item>
              <Nav handleChange={this.handleChange} value={page} />
            </Grid>
          </Grid>
        );
      case "leaderboard": // ranks page
        return (
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
            <Grid item>
              <Nav handleChange={this.handleChange} value={page} />
            </Grid>
          </Grid>
        );
      case "game":
        return (
          <div>
            <MenuButton onClick={this.handleMenuButton} />
            <Game questions={questions} answers={answers} />
          </div>
        );
    }
  }
}

import React, { Component } from "react";
import axios from "axios";
import MuiAlert from "@material-ui/lab/Alert";
import { Container, Snackbar } from "@material-ui/core";

// Components
import AppBar from "./Game Components/General Components/AppBar";
import Main from "./Game Components/Main";
import Game from "./Game Components/Game Interface Components/Game Interface";
import GameOver from "./Game Components/GameOver";

export default class GameHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "main",
      email: this.props.email,
      username: this.props.username,
      quiz: [],
      aq: "",
      index: 0,
      lives: 3,
      score: 0,
      result: "",
      setOpen: false,
      severity: "",
      feedback: "",
      gameEnd: "",
    };
  }

  // handle nav change
  handleChange = (e, newValue) => {
    e.preventDefault();
    this.setState({ page: newValue });
  };

  // handle the menu clicks
  handleMenuButton = (e) => {
    e.preventDefault();
    this.setState({ page: "main" });
  };

  // handle qr scanner output
  handleScan = (data) => {
    if (data) {
      this.setState({
        result: data,
      });
    }
  };

  // close the snackbar
  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ setOpen: false });
  };

  // handles qr scanner error
  handleError = (err) => {
    console.error(err);
  };

  // handles the button to return to the main menu
  handleReturn = (e) => {
    this.setState({ page: "main" });
  };

  // handle start button click
  handleStart = (e) => {
    e.preventDefault();
    this.setState({
      page: "game",
      index: 0,
      lives: 3,
      score: 0,
    });
    let obj = {};
    let i = 0;
    axios
      .get("http://localhost:5000/questions/getQuestion")
      .then((res) => {
        this.setState({ aq: res.data[0].question });
        res.data.forEach((q) => {
          obj = { index: i, q: q.question, a: q.answer };
          this.setState({
            quiz: [...this.state.quiz, obj],
          });
          i++;
        });
      })
      .catch((err) => {
        console.log("Error: " + err);
      });
  };

  // handle the confrim button press
  handleCheck = (e) => {
    const { result, index, quiz, lives, score } = this.state;
    if (result !== "") {
      if (result === quiz[index].a) {
        if (index < quiz.length - 1) {
          this.setState({
            setOpen: true,
            severity: "success",
            feedback: "Correct",
            result: "",
            index: index + 1,
            aq: quiz[index + 1].q,
            score: score + 1,
          });
        } else {
          // player is done
          this.setState({
            page: "gameOver",
            gameEnd: "win",
          });
        }
      } else {
        if (lives === 1) {
          this.setState({
            page: "gameOver",
            gameEnd: "lose",
          });
        } else {
          // Incorrect
          this.setState({
            setOpen: true,
            severity: "error",
            feedback: "Incorrect",
            result: "",
            lives: this.state.lives - 1,
          });
        }
      }
    } else {
      // the user did not scan an answer
      this.setState({
        setOpen: true,
        severity: "error",
        feedback: "No answer entered",
      });
    }
  };

  handleCancel(e) {
    e.preventDefault();
    this.setState({ result: "" });
  }

  render() {
    const {
      page,
      username,
      lives,
      score,
      index,
      result,
      aq,
      setOpen,
      severity,
      feedback,
      quiz,
      gameEnd,
    } = this.state;

    switch (page) {
      case "main": // The main page where user can start the game
        return (
          <Container maxWidth="xs">
            <AppBar
              username={username}
              handleLogout={this.props.handleLogout}
            />
            <Main handleStart={this.handleStart} />
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
              result={result}
              index={index}
              question={aq}
              open={setOpen}
              severity={severity}
              feedback={feedback}
              handleCheck={this.handleCheck}
              handleScan={this.handleScan}
              handleError={this.handleError}
              handleCancel={this.handleCancel}
              handleClose={this.handleClose}
            />
          </Container>
        );
      case "gameOver":
        return (
          <GameOver
            handleReturn={this.handleReturn}
            quiz={quiz}
            lives={lives}
            page={gameEnd}
          />
        );
    }
  }
}

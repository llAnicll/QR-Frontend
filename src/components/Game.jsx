import React, { Component } from "react";
import axios from "axios";
import MuiAlert from "@material-ui/lab/Alert";
import { Container, Snackbar } from "@material-ui/core";
import validator from "validator";

// Components
import AppBar from "./Game Components/General Components/AppBar";
import Main from "./Game Components/Main";
import Game from "./Game Components/Game Interface Components/Game Interface";
import GameOver from "./Game Components/GameOver";
import Nav from "./Game Components/General Components/Nav";
import Admin from "./Game Components/Admin";

export default class GameHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "main",
      email: this.props.email,
      username: this.props.username,
      type: "",
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
      question: "",
      answer: "",
      questionErr: "",
      answerErr: "",
      submited: false,
    };
  }

  handleAdminChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    this.setState({
      questionErr: "",
      answerErr: "",
    });
    const { question, answer } = this.state;
    let questionFlag = false;
    let answerFlag = false;
    if (validator.isEmpty(question)) {
      questionFlag = true;
      this.setState({ questionErr: "No question entered" });
    }
    if (validator.isEmpty(answer)) {
      answerFlag = true;
      this.setState({ answerErr: "No answer entered" });
    }

    console.log(this.state.questionErr);

    if (questionFlag === false && answerFlag === false) {
      axios
        .post("http://localhost:5000/questions/makeQuestion", {
          question: this.state.question,
          answer: this.state.answer,
        })
        .then((res) => {
          document.getElementById("outlined-basic").value = "";
        })
        .catch((err) => {
          // cannot reach server
          this.setState({
            serverError:
              "No network connection, please wait untill your back online",
          });
        });
    }
  };

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

  componentDidMount() {
    var user = "";
    var accountType = "";
    if (localStorage.getItem("username")) {
      user = localStorage.getItem("username");
    } else {
      user = "";
    }
    if (localStorage.getItem("accountType")) {
      accountType = localStorage.getItem("accountType");
    } else {
      accountType = this.props.type;
    }
    this.setState({
      username: user,
      type: accountType,
    });
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
      type,
      submited,
    } = this.state;

    let errors = [];
    if (this.state.questionErr.length > 0) {
      errors.push({ err: this.state.questionErr });
    }
    if (this.state.answerErr.length > 0) {
      errors.push({ err: this.state.answerErr });
    }

    switch (page) {
      case "main": // The main page where user can start the game
        if (type === "2") {
          return (
            <Container maxWidth="xs">
              <AppBar
                username={username}
                handleLogout={this.props.handleLogout}
              />
              <Main handleStart={this.handleStart} />
              <Nav handleChange={this.handleChange} page={page} />
            </Container>
          );
        } else {
          return (
            <Container maxWidth="xs">
              <AppBar
                username={username}
                handleLogout={this.props.handleLogout}
              />
              <Main handleStart={this.handleStart} />
            </Container>
          );
        }

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
      case "add":
        return (
          <Container maxWidth="xs">
            <AppBar
              username={username}
              handleLogout={this.props.handleLogout}
            />
            <Admin
              errors={errors}
              submited={submited}
              handleSubmit={this.handleSubmit}
              handleChange={this.handleAdminChange}
            />
            <Nav handleChange={this.handleChange} value={page} />
          </Container>
        );
    }
  }
}

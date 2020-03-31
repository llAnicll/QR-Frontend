import React, { Component } from "react";
import "./App.css";
import axios from "axios";

// import user components
import Home from "./components/Home";
import GameHome from "./components/GameHome";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

export class App extends Component {
  constructor() {
    super();
    this.state = {
      page: localStorage.getItem("userToken") ? 4 : 1,
      email: "",
      username: "",
      password: "",
      passwordAgain: "",
      emailErr: "",
      usernameErr: "",
      passwordErr: "",
      passwordAgainErr: "",
      serverError: ""
    };
  }

  // Event handler for the login button on home prompt
  handleLoginBtn = () => {
    this.setState({ page: 2 });
  };

  handleRegsiterBtn = () => {
    this.setState({ page: 3 });
  };

  // Event handler for the change in value of text input
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // handle the sign in state
  handleLogin = e => {
    e.preventDefault();
    const { email, password } = this.state;
    const arr = ["email", "password"];
    var emailFlag,
      passwordFlag = false;

    arr.forEach(el => {
      switch (el) {
        case "email":
          if (email.length < 1) {
            this.setState({ emailErr: "No email entered" });
          } else {
            this.setState({ emailErr: "" });
            emailFlag = true;
          }
          break;
        case "password":
          if (password.length < 1) {
            this.setState({ passwordErr: "No email entered" });
          } else {
            this.setState({ passwordErr: "" });
            passwordFlag = true;
          }
      }
    });
    //console.log(this.state.password);
    if (emailFlag === true && passwordFlag === true) {
      axios
        .post("http://localhost:5000/users/login", {
          email: this.state.email,
          password: this.state.password
        })
        .then(res => {
          if (res.data.auth) {
            // case: user can login
            localStorage.setItem("userToken", res.data.message); // add the user token to the local storage
            this.setState({
              email: res.data.email,
              username: res.data.username,
              serverError: "",
              page: 4
            });
            return res.data.message; // return the token
          } else {
            // user cant login
            this.setState({
              serverError: "There is no account with this email"
            });
          }
        })
        .catch(err => {
          // spit out the error
          console.log("Sign up server error: " + err);
        });
    }
  };

  // Register handeler
  handleRegister = e => {
    e.preventDefault();
    const { email, username, password, passwordAgain } = this.state;
    const arr = ["email", "username", "password", "passwordAgain"];
    var emailFlag,
      usernameFlag,
      passwordFlag,
      passwordAgainFlag = false;

    arr.forEach(el => {
      switch (el) {
        case "email":
          if (email.length < 1) {
            this.setState({ emailErr: "No email entered" });
          } else {
            this.setState({ emailErr: "" });
            emailFlag = true;
          }
          break;
        case "username":
          if (username.length < 1) {
            this.setState({ usernameErr: "No username entered" });
          } else {
            this.setState({ usernameErr: "" });
            usernameFlag = true;
          }
          break;
        case "password":
          if (password.length < 1) {
            this.setState({ passwordErr: "No password entered" });
          } else {
            this.setState({ passwordErr: "" });
            passwordFlag = true;
          }
          break;
        case "passwordAgain":
          if (passwordAgain.length < 1) {
            this.setState({
              passwordAgainErr: "Please re-type password"
            });
          } else {
            if (passwordAgain !== password) {
              this.setState({
                passwordAgainErr: "Passwords do not match"
              });
            } else {
              this.setState({ passwordAgainErr: "" });
              passwordAgainFlag = true;
            }
          }
          break;
      }
    });

    if (
      emailFlag === true &&
      usernameFlag === true &&
      passwordFlag === true &&
      passwordAgainFlag === true
    ) {
      // call the user register api
      axios
        .post("http://localhost:5000/users/register", {
          // store the user input from the user object in the json object
          email: this.state.email,
          username: this.state.username,
          password: this.state.password,
          passwordAgain: this.state.passwordAgain
          // redirect them to the game
        })
        .then(res => {
          // redirect them to thhe login screen
          this.setState({
            page: 2
          });
        })
        .catch(err => {
          // spit out the error
          console.log("Sign up server error: " + err);
        });
    }
  };

  // handle logout
  handleLogout = e => {
    console.log("test");
    e.preventDefault();
    this.setState({
      isSignedIn: 1,
      email: "",
      username: "",
      page: 1
    });
    localStorage.removeItem("userToken");
  };

  render() {
    const {
      page,
      username,
      email,
      emailErr,
      usernameErr,
      passwordErr,
      passwordAgainErr,
      serverError
    } = this.state;

    const err = [];
    if (emailErr.length > 0) {
      err.push({ err: emailErr });
    }
    if (usernameErr.length > 0) {
      err.push({ err: usernameErr });
    }
    if (passwordErr.length > 0) {
      err.push({ err: passwordErr });
    }
    if (passwordAgainErr.length > 0) {
      err.push({ err: passwordAgainErr });
    }
    if (serverError.length > 0) {
      err.push({ err: serverError });
    }

    switch (page) {
      case 1:
        return (
          <Home
            handleLoginBtn={this.handleLoginBtn}
            handleRegsiterBtn={this.handleRegsiterBtn}
          />
        );
      case 2:
        return (
          <LoginForm
            errors={err}
            handleChange={this.handleChange}
            handleLogin={this.handleLogin}
          />
        );
      case 3:
        return (
          <RegisterForm
            errors={err}
            handleChange={this.handleChange}
            handleRegister={this.handleRegister}
          />
        );
      case 4:
        return (
          <GameHome
            username={username}
            email={email}
            handleLogout={this.handleLogout}
          />
        );
    }
  }
}

export default App;

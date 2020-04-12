import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import validator from "validator";

// import user components
import Home from "./components/Home";
import GameHome from "./components/Game";
import LoginForm from "./components/Home Components/LoginForm";
import RegisterForm from "./components/Home Components/RegisterForm";

export class App extends Component {
  constructor() {
    super();
    this.state = {
      page: localStorage.getItem("userToken") ? 4 : 1,
      email: "",
      username: "",
      password: "",
      passwordAgain: "",
      type: 1,
      emailErr: "",
      usernameErr: "",
      passwordErr: "",
      passwordAgainErr: "",
      serverError: "",
    };
    this.validate = this.validate.bind(this);
  }

  // Handles the button the user presses to select login
  handleLoginBtn = () => {
    this.setState({ page: 2 });
  };

  handleRegsiterBtn = () => {
    this.setState({ page: 3 });
  };

  // Handles the button the user presses to select register
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // validates the use input
  validate(fields) {
    let validated = [];
    for (let i = 0; i < fields.length; i++) {
      validated.push(validator.isEmpty(fields[i]));
      if (i === 0 && validated[0] === false) {
        validated[i] = validator.isEmail(fields[i]);

        if (i === 0 && validated[0] === false) {
          this.setState({ emailErr: "Invalid email" });
        } else {
          this.setState({ emailErr: "" });
        }
      } else if (i === 0 && validated[0] === true) {
        console.log(this.state.emailErr);
        this.setState({ emailErr: "No email entered" });
      }
      if (validated[i] === true) {
        if (fields.length === 2 && i === 0) {
          continue;
        } else if (fields.length === 2 && i !== 0) {
          this.setState({ passwordErr: "No password entered" });
        } else if (fields.length === 4 && i === 0) {
          continue;
        } else if (fields.length === 4 && i !== 0) {
          switch (i) {
            case 1:
              this.setState({ usernameErr: "Please enter a username" });
              continue;
            case 2:
              this.setState({ passwordErr: "Please enter a password" });
              continue;
            case 3:
              this.setState({
                passwordAgainErr: "Please re-type your password",
              });
              continue;
          }
        }
      }
    }

    if (fields.length === 4 && fields[2] !== fields[3]) {
      this.setState({ passwordAgainErr: "Passwords do not match" });
      validated[3] = true;
    }

    for (let i = 0; i < validated.length; i++) {
      if (i === 0 && validated[i] === true) {
        continue;
      }
      if (i !== 0 && validated[i] === false) {
        return true;
      } else {
        return false;
      }
    }
  }

  // Handles the login
  handleLogin = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    console.log("Email: " + email);

    this.setState({
      emailErr: "",
      usernameErr: "",
      passwordErr: "",
      passwordAgainErr: "",
    });
    let fields = [email, password];

    // emailFlag === true && passwordFlag === true
    if (this.validate(fields)) {
      axios
        .post("http://localhost:5000/users/login", {
          email: this.state.email,
          password: this.state.password,
        })
        .then((res) => {
          if (res.data.auth) {
            // case: user can login
            localStorage.setItem("userToken", res.data.message); // add the user token to the local storage
            localStorage.setItem("username", res.data.username); // add the username to the localStorage
            localStorage.setItem("accountType", res.data.type); // add the user account type to localStorage
            this.setState({
              email: res.data.email,
              username: res.data.username,
              type: res.data.type,
              serverError: "",
              page: 4,
            });
            return res.data.message; // return the token
          } else {
            // user cant login
            this.setState({
              serverError: "There is no account with this email",
            });
          }
        })
        .catch((err) => {
          // When there is no network connection
          this.setState({
            serverError:
              "No network connection, please wait untill your back online",
          });
        });
    }
  };

  // Register handler
  handleRegister = (e) => {
    e.preventDefault();
    this.setState({
      emailErr: "",
      usernameErr: "",
      passwordErr: "",
      passwordAgainErr: "",
    });
    e.preventDefault();
    const { email, username, password, passwordAgain } = this.state;
    let fields = [email, username, password, passwordAgain];
    if (this.validate(fields)) {
      // call the user register api
      axios
        .post("http://localhost:5000/users/register", {
          // store the user input from the user object in the json object
          email: this.state.email,
          username: this.state.username,
          password: this.state.password,
          passwordAgain: this.state.passwordAgain,
          // redirect them to the game
        })
        .then((res) => {
          // redirect them to thhe login screen
          this.setState({
            page: 2,
          });
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

  // handle logout
  handleLogout = (e) => {
    console.log("test");
    e.preventDefault();
    this.setState({
      isSignedIn: 1,
      email: "",
      username: "",
      page: 1,
    });
    localStorage.removeItem("userToken");
    localStorage.removeItem("username");
    localStorage.removeItem("accountType");
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
      serverError,
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
            handleRegsiterBtn={this.handleRegsiterBtn}
          />
        );
      case 3:
        return (
          <RegisterForm
            errors={err}
            handleLoginBtn={this.handleLoginBtn}
            handleChange={this.handleChange}
            handleRegister={this.handleRegister}
          />
        );
      case 4:
        return (
          <GameHome
            username={username}
            email={email}
            type={this.state.type}
            handleLogout={this.handleLogout}
          />
        );
    }
  }
}

export default App;

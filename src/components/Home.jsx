import React, { Component } from "react";
import axios from "axios"; // promise based HTTP client

// Components
import HomePrompt from "./Home/HomePrompt";
import LoginForm from "./Home/LoginForm";
import RegisterForm from "./Home/RegisterForm";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      email: "",
      username: "",
      password: "",
      passwordAgain: ""
    };

    // bind the handlers
    this.handleBtnLoginNav = this.handleBtnLoginNav.bind(this);
    this.handleBtnSignUpNav = this.handleBtnSignUpNav.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  // handler for the login button in menu
  handleBtnLoginNav(e) {
    e.preventDefault();
    this.setState({
      page: 1
    });
  }

  // handler fot eh register button on menu
  handleBtnSignUpNav(e) {
    e.preventDefault();
    this.setState({
      page: 2
    });
  }

  // handle email change
  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  // hnadle username chage
  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  // handle password change
  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  // handle password repeat chagne
  handlePasswordAgainChange(e) {
    this.setState({ passwordAgain: e.target.value });
  }

  // Register handeler
  handleRegister(e) {
    e.preventDefault();
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
          page: 1
        });
      })
      .catch(err => {
        // spit out the error
        console.log("Sign up server error: " + err);
      });
  }

  render() {
    const { page } = this.state;
    switch (page) {
      case 0: // Prompt the user to login or register
        return (
          <HomePrompt
            handleBtnLogin={this.handleBtnLoginNav}
            handleBtnSignUp={this.handleBtnSignUpNav}
          />
        );
      case 1: // Login form
        return (
          <LoginForm
            handleEmailChange={this.props.handleLoginEmailChange}
            handlePasswordChange={this.props.handleLoginPasswordChange}
            handleLogin={this.props.handleLogin}
          />
        );
      case 2: // Register Form
        return (
          <RegisterForm
            handleEmailChange={this.handleEmailChange.bind(this)}
            handleUsernameChange={this.handleUsernameChange.bind(this)}
            handlePasswordChange={this.handlePasswordChange.bind(this)}
            handlePasswordAgainChange={this.handlePasswordAgainChange.bind(
              this
            )}
            handleRegister={this.handleRegister}
          />
        );
    }
  }
}

import React, { Component } from "react";
import "./App.css";
import axios from "axios";

// import user components
import Home from "./components/Home";
import GameHome from "./components/GameHome";

export class App extends Component {
  constructor() {
    super();
    this.state = {
      isSignedIn: localStorage.getItem("userToken") ? true : false,
      email: "",
      username: "",
      password: "",
      emailErr: "",
      passwordErr: "",
      serverError: ""
    };

    this.handleLogin = this.handleLogin.bind(this);
  }

  // handle the change in form values
  handleEmailChange(e) {
    if (e.target.value.length > 0) {
      this.setState({ email: e.target.value });
    }
  }

  // handles password change
  handlePasswordChange(e) {
    if (e.target.value.length > 0) {
      this.setState({ password: e.target.value });
    }
  }

  // handle the sign in state
  handleLogin(e) {
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
              isSignedIn: true,
              email: res.data.email,
              username: res.data.username,
              serverError: ""
            });
            return res.data.message; // return the token
          } else {
            // user cant login
            //this.setState({ error: res.data.message });
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
  }

  // handle logout
  handleLogout(e) {
    e.preventDefault();
    this.setState({
      isSignedIn: false,
      email: "",
      username: ""
    });
    localStorage.removeItem("userToken");
  }

  render() {
    const {
      isSignedIn,
      username,
      email,
      emailErr,
      passwordErr,
      serverError
    } = this.state;
    const err = [];
    if (emailErr.length > 0) {
      err.push({ err: emailErr });
    }
    if (passwordErr.length > 0) {
      err.push({ err: passwordErr });
    }
    if (serverError.length > 0) {
      err.push({ err: serverError });
    }

    return (
      <div className="App">
        {isSignedIn ? (
          <GameHome
            username={username}
            email={email}
            logout={this.handleLogout.bind(this)}
          />
        ) : (
          <Home
            errors={err}
            handleLogin={this.handleLogin}
            handleLoginEmailChange={this.handleEmailChange.bind(this)}
            handleLoginPasswordChange={this.handlePasswordChange.bind(this)}
          />
        )}
      </div>
    );
  }
}

export default App;

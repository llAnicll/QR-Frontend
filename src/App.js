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
      password: ""
    };

    this.handleLogin = this.handleLogin.bind(this);
  }

  // handle the change in form values
  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  // handles password change
  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  // handle the sign in state
  handleLogin(e) {
    e.preventDefault();
    //console.log(this.state.password);
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
            username: res.data.username
          });
          return res.data.message; // return the token
        } else {
          // user cant login
          //this.setState({ error: res.data.message });
          console.log(res.data.message);
        }
      })
      .catch(err => {
        // spit out the error
        console.log("Sign up server error: " + err);
      });
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
    const { isSignedIn, username } = this.state;
    return (
      <div className="App">
        {isSignedIn ? (
          <GameHome username={username} logout={this.handleLogout.bind(this)} />
        ) : (
          <Home
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

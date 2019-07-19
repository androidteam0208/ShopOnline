import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
// import Auth from "../../Auth";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { setLoggedInUser } from "../../Redux/Actions/Data";
import firebase from 'firebase';

import "./Login.css";

class ConnectedLogin extends Component {
  // constructor(props) {
  //   super(props);

  // }
  state = {
    userName: "",
    pass: "",
    redirectToReferrer: false
  };

  handleInput = (event) => {
    let name = event.target.name; 
    let value = event.target.value;
    this.setState({
      [name]: value
    })
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };

    // If user was authenticated, redirect her to where she came from.
    if (this.state.redirectToReferrer === true) {
      return <Redirect to={from} />;
    }

    return (
      <div className="login-container">
        <div
          style={{
            height: 400,
            width: 400,
            display: "flex",
            flexDirection: "column"
          }}
        >
          <div
            style={{
              color: "primary",
              marginBottom: 20,
              fontSize: 26,
              textAlign: "center"
            }}
          >
            {" "}
            Log in{" "}
          </div>
          <TextField
            value={this.state.userName}
            type="Email"
            label="Email Address *"
            name="userName"
            onChange={this.handleInput}
          />
          <TextField
            style={{ marginTop: 10 }}
            value={this.state.pass}
            type="password"
            label="Password *"
            name="pass"
            onChange={this.handleInput}
          />
          {/* <div className="d-flex justify-content-between mt-3"> */}
          <Button
            style={{ marginTop: 20 }}
            variant="contained"
            color="primary"
            onClick={() => {
              firebase.auth().signInWithEmailAndPassword(this.state.userName, this.state.pass).then(() => {
                this.props.dispatch(setLoggedInUser(this.state.userName));
                this.setState(() => ({
                  redirectToReferrer: true
                }));
              }).catch(function (error) {
                // var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage)
                // ...
              });
            }}
          >
            Log in
          </Button>
          <span style={{ color: "red", textAlign: "right", marginTop: 5, cursor: "pointer" }} onClick={() => {
            this.props.history.push("/SignUp");
          }}> Create Acount </span>

          {this.state.wrongCred && (
            <div style={{ color: "red" }}>Wrong username and/or password</div>
          )}
        </div>
      </div>
    );
  }
}
const Login = withRouter(connect()(ConnectedLogin));

export default Login;

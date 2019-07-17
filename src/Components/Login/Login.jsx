import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Auth from "../../Auth";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { setLoggedInUser } from "../../Redux/Actions/Data";
import firebase from 'firebase';

import "./Login.css";

class ConnectedLogin extends Component {
  constructor(props) {
    super(props);
 
}
state = {
  userName: "",
  pass: "",
  redirectToReferrer: false 
};
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
            placeholder="User name"
            onChange={e => {
              this.setState({ userName: e.target.value });
            }}
          />
          <TextField
           style={{ marginTop: 10 }}
            value={this.state.pass}
            type="password"
            placeholder="Password"
            onChange={e => {
              this.setState({ pass: e.target.value });
            }}
          />
          {/* <div className="d-flex justify-content-between mt-3"> */}
          <Button
            style={{ marginTop: 10 }}
            variant="outlined"
            color="primary"
            onClick={() => {
              firebase.auth().signInWithEmailAndPassword( this.state.userName,this.state.pass).then(()=>{
                this.props.dispatch(setLoggedInUser({ name: this.state.userName }));
                  this.setState(() => ({
                    redirectToReferrer: true
                  }));
              }).catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(error.message)
                // ...
              });
            }}
          >
            Log in
          </Button>
          <div style={{ color: "red" , textAlign: "right" , marginTop:5 , cursor:"pointer"}} onClick={() => {
              this.props.history.push("/SignUp");
            }}> Create Acount</div>
            
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

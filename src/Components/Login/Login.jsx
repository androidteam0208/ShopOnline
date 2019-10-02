import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import CreateIcon from "@material-ui/icons/Create";
<<<<<<< HEAD
=======
// import VisibilityIcon from "@material-ui/icons/Visibility";
>>>>>>> b0c3898fc4bfbd2cf95870ea9c6d28e43615454e
import { setLoggedInUser } from "../../Redux/Actions/Data";
import firebase from 'firebase';

import Swal from 'sweetalert2'
<<<<<<< HEAD
=======

import "./Login.css";
>>>>>>> b0c3898fc4bfbd2cf95870ea9c6d28e43615454e


class ConnectedLogin extends Component {
  // constructor(props) {
  //   super(props);

  // }
  state = {
    userName: "",
    pass: "",
<<<<<<< HEAD
    status: false,
=======
    redirectToReferrer: false,
>>>>>>> b0c3898fc4bfbd2cf95870ea9c6d28e43615454e
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
    if (this.state.status === true) {
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
          <LockOutlinedIcon
            // fontSize
            style={{ fontSize: 50, color: "#F50057", cursor: "pointer", margin: "0 auto" }}
          />
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
            // value={this.state.userName}
            type="Email"
            label="Email Address *"
            name="userName"
            onChange={this.handleInput}
          />
          <TextField
            style={{ marginTop: 10 }}
            // value={this.state.pass}
            type="password"
            label="Password *"
            name="pass"
            onChange={this.handleInput}
          />
          {/* <VisibilityIcon  style={{ marginTop: 10 }}/> */}
          {/* <div className="d-flex justify-content-between mt-3"> */}
          <Button
            style={{ marginTop: 20 }}
            variant="contained"
            color="primary"
            onClick={() => {
              firebase.auth().signInWithEmailAndPassword(this.state.userName, this.state.pass).then(() => {
                this.props.dispatch(setLoggedInUser(this.state.userName));
                this.setState(() => ({
<<<<<<< HEAD
                  status: true,
=======
                  redirectToReferrer: true,
>>>>>>> b0c3898fc4bfbd2cf95870ea9c6d28e43615454e
                }));
              }).catch((error) => {
                // var errorCode = error.code;
                let errorMessage = error.message;
                Swal.fire({
                  title: 'Error!',
                  text: errorMessage,
                  type: 'error',
                })
              });
            }}
          >
            Log in
          </Button>
          <span
            style={{ color: "red", textAlign: "right", marginTop: 5, cursor: "pointer" }}
            onClick={() => {
              this.props.history.push("/SignUp");
            }}>
            <CreateIcon style={{ color: "red" }} />
            Create Acount </span>

        </div>


      </div>
    );
  }
}
const Login = withRouter(connect()(ConnectedLogin));

export default Login;

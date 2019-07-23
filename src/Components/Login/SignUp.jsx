import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import firebase from 'firebase';
import { addCustomerAction } from "./../../Redux/Actions/Data";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Swal from 'sweetalert2'


import "./Login.css";


class ConnectedLogin extends Component {
  state = {
    passWord: "",
    email: "",
    redirectToReferrer: false ,
    loginName:"",
  };

  handleInput = (event) => {
    let name = event.target.name; 
    let value = event.target.value;
    this.setState({
      [name]: value
    });
    
  }
  
  render() {
    
    // this.createId();
    const { from } = this.props.location.state || { from: { pathname: "/login" } };
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
          <AccountCircleIcon
          // fontSize
          style={{ fontSize: 50, color: "#F50057" , cursor:"pointer" , margin: "0 auto"}}
          />
          <div
            style={{
              color: "#504F5A",
              marginBottom: 20,
              fontSize: 26,
              textAlign: "center"
            }}
          >
            {" "}
            Sign Up{" "}
          </div>
          <TextField
            type="email"
            label="Email Address *"
            name="email"
            onChange={this.handleInput}
          />
          <TextField
           style={{ marginTop: 10 }}
            type="password"
            label="Password *"
            name="passWord"
            onChange={this.handleInput}
          />
          <TextField
            style={{ marginTop: 10 }}
            label="User Name *"
            name="loginName"
            onChange={this.handleInput}
          />
          

         
          <Button
            style={{ marginTop: 20 }}
            variant="contained"
            color="secondary"
            onClick= {()=>{
              this.props.addCustomer(this.state);
              firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.passWord).then(()=>{
                this.props.addCustomer(this.state);
                Swal.fire({
                  type: 'success',
                  title: 'SignUp Suceessfull !',
                  showConfirmButton: false,
                  timer: 1500
                })
                this.props.history.push("/login");

              }).catch((error)=> {
                // var errorCode = error.code;
                var errorMessage = error.message;
                Swal.fire({
                  title: 'Error!',
                  text: errorMessage,
                  type: 'error',
                })
              });
            }}
          >
            Sign up
          </Button>
          
          <span
            style={{ color:"#303f9f", textAlign: "right", marginTop: 5, cursor: "pointer" , fontSize:18}}
            onClick={() => {
              this.props.history.push("/Login");
            }}>
             <LockOutlinedIcon
            style={{ color: "#303f9f", cursor: "pointer", margin: "0 auto" }}
          /> Login </span>
        </div>
        
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    addCustomer: (user) => {
      dispatch(addCustomerAction(user));
    }
  }
}
const Login = withRouter(connect(null, mapDispatchToProps)(ConnectedLogin));

export default Login;

import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import firebase from 'firebase';
import { addCustomerAction } from "./../../Redux/Actions/Data"

import "./Login.css";

class ConnectedLogin extends Component {
  state = {
    userName: "",
    pass: "",
    email: "",
    redirectToReferrer: false ,
    id:1,
  };
  
  
  signUpUser= (Email, Id, LoginName, PasssWord) =>{
    firebase.database().ref('Customer/' + Id).set({
      loginName: LoginName,
      email: Email,
      password : PasssWord,
      id: Id
    }).then(()=>{
      console.log("SignUp User Success");
    }).catch((error)=>{
      var errorMessage = error.message;
      alert(errorMessage);
    });
  
  }
  // createId =() =>{
  //   firebase.database().ref().child("Customer").on("value", function (snapshot) {
  //     let idCustomer = snapshot.numChildren();
  //     this.state({ id: idCustomer });
  //     return;
  // });
  // };
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
         
            value={this.state.email}
            type="email"
            label="Email Address *"
            onChange={e => {
              this.setState({ email: e.target.value });
            }}
          />
          <TextField
           style={{ marginTop: 10 }}
            value={this.state.pass}
            type="password"
            label="Password *"
            onChange={e => {
              this.setState({ pass: e.target.value });
            }}
          />
          <TextField
            style={{ marginTop: 10 }}
            value={this.state.userName}
            label="User Name *"
            onChange={e => {
              this.setState({ userName: e.target.value });
            }}
          />
          
          
         
          <Button
            style={{ marginTop: 20 }}
            variant="contained"
            color="secondary"
            onClick= {()=>{
              // this.props.addCustomer(this.state);
              firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.pass).then(()=>{
                
                this.signUpUser(this.state.email,this.state.id, this.state.userName, this.state.pass)
                alert("Successfull");
                this.props.history.push("/login");

              }).catch(function(error) {
                // var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage);     
              });
            }}
          >
            Sign up
          </Button>
          
          {this.state.wrongCred && (
            <div style={{ color: "red" }}>Wrong username and/or password</div>
          )}
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

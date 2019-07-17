import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { setLoggedInUser } from "../../Redux/Actions/Data";
import firebase from 'firebase';

// import "./Login.css";

class payment extends Component {
  constructor(props) {
    super(props);
 
}

state = {
    firstName: "",
    lastName:"",
    numberPhone:"",
    address:"",
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
            width: 500,
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
            PayMent{" "}
          </div>
          <div className="d-flex justify-content-between">
          <TextField  style={{  width: 230 }}
            value={this.state.firstName}
            label="First Name *"
            onChange={e => {
              this.setState({ userName: e.target.value });
            }}
          />
          <TextField style={{  width: 230 }}
            value={this.state.lastName}
            label="Last Name *"
            onChange={e => {
              this.setState({ lastName: e.target.value });
            }}
          />
          </div>
          <TextField
           style={{ marginTop: 10 }}
            value={this.state.numberPhone}
            label="Phone *"
            onChange={e => {
              this.setState({ numberPhone: e.target.value });
            }}
          />
          <TextField
           style={{ marginTop: 10 }}
            value={this.state.lastName}
            label="Address *"
            onChange={e => {
              this.setState({ numberPhone: e.target.value });
            }}
          />
           <div className="d-flex mt-2 justify-content-between">
          <TextField style={{ marginTop: 10,  width: 230 }}
            label="City "
          />
          <TextField
           style={{ marginTop: 10, width: 230 }}
            label="State/Province/Region"

          />
          </div>
          
          <Button
            style={{ marginTop: 50 }}
            variant="outlined"
            color="primary">
            Checkout
          </Button>
          
          
        
        </div>
      </div>
    );
  }
}
const Payment = withRouter(connect()(payment));

export default Payment;

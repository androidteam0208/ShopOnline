import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { setLoggedInUser } from "../../Redux/Actions/Data";
import firebase from 'firebase';
import { addShoppingCartAction } from "./../../Redux/Actions/Data"

// import "./Login.css";

class payment extends Component {
  constructor(props) {
    super(props);
    
   this.state = {
    firstName: "",
    lastName: "",
    address: "",
    id: 1,
    customner: "",
    listProduct: [],
    phone: "",
    status: true,
    totalPrice: this.props.totalPrice
  };

  }
  handleInput = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    this.setState({
        [name]: value
    })
    // console.log(this.state);
}
  // cartInfor = {
  //   name: "",
  //   address: "",
  //   id: 1,
  //   customner: this.props.loggedInUser,
  //   listProduct: this.props.checkedOutItems,
  //   phone: "",
  //   status: true,
  //   totalPrice: this.props.totalPrice

  // }

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
            <TextField style={{ width: 230 }}
              name ="firstName"
              label="First Name *"
              onChange={this.handleInput}
            />
            <TextField style={{ width: 230 }}
            name ="lastName"
              label="Last Name *"
              onChange={this.handleInput}
            />
          </div>
          <TextField
            style={{ marginTop: 10 }}
            value={this.state.phone}
            label="Phone *"
            onChange={e => {
              this.setState({ phone: e.target.value });
            }}
          />
          <TextField
            style={{ marginTop: 10 }}
            value={this.state.address}
            label="Address *"
            onChange={e => {
              this.setState({ address: e.target.value });
            }}
          />
          <div className="d-flex mt-2 justify-content-between">
            <TextField style={{ marginTop: 10, width: 230 }}
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
            color="primary"
            onClick={() => {
              let name = this.state.firstName + this.state.lastName;
              this.setState({ customner: this.props.loggedInUser,  listProduct: this.props.checkedOutItems});
              console.log(this.state);
              // this.props.paymentInfor.push(name, this.state.numberPhone, this.state.address);
              this.props.addShoppingCart(this.state)
              
              
            }}
          >
            Checkout
          </Button>



        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    paymentInfor: state.rootReducer.paymentInfor,
    customner: state.rootReducer.loggedInUser,
    checkedOutItems: state.rootReducer.checkedOutItems,
    totalPrice: state.rootReducer.totalPrice,

  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    addShoppingCart: (cart) => {
      dispatch(addShoppingCartAction(cart));
    }
  }
}
const Payment = withRouter(connect(mapStateToProps, mapDispatchToProps)(payment));

export default Payment;

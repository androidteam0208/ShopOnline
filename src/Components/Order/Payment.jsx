import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import firebase from 'firebase';
import { addShoppingCartAction , clearCartAction} from "./../../Redux/Actions/Data"

// import "./Login.css";

class payment extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    firstName: "",
    lastName: "",
    address: "",
    phone:"", 
    id:0,
    }
  
  
  handleInput = (event) => {
    let name = event.target.name; 
    let value = event.target.value;
    this.setState({
      [name]: value
    })
  }
  cartInfor = {
    name: "",
    address: "",
    phone:"",
    id: "",
    customner: this.props.customner,
    listProduct: this.props.checkedOutItems,
    status: true,
    totalPrice: 400

  }

  // getId = ()=>{
  //   firebase.database().ref().child("Categories").on("value", function(snapshot) {
  //     let id = snapshot.numChildren();
  //     return id;
  //   });      
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
              name="firstName"
              label="First Name *"
              onChange={this.handleInput}
            />
            <TextField style={{ width: 230 }}
              label="Last Name *"
              name="lastName"
              onChange={this.handleInput}
            />
          </div>
          <TextField
            style={{ marginTop: 10 }}
            label="Phone *"
            name="phone"
            onChange={this.handleInput}
          />
          <TextField
            style={{ marginTop: 10 }}
            label="Address *"
            name="address"
            onChange={this.handleInput}
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

              let fullName = this.state.firstName +" "+ this.state.lastName;
              this.cartInfor = {
                name: fullName,
                address:  this.state.address,
                phone:this.state.phone,
                id: this.state.id,
                customner: this.props.customner,
                listProduct: this.props.checkedOutItems,
                status: true,
                totalPrice: 400
            
              }
              this.props.addShoppingCart(this.cartInfor);
              this.props.clearCart();
              this.props.history.push("/");

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
    },
    clearCart:()=>{
      dispatch(clearCartAction());
    }
  }
}
const Payment = withRouter(connect(mapStateToProps, mapDispatchToProps)(payment));

export default Payment;

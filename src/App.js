import React, { Component } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import ProductList from "./Components/ProductList/ProductList";
import { Switch, Route } from "react-router-dom";
import Menu from "./Components/Menu/Menu";
import CartDialog from "./Components/CartDialog/CartDialog";
import Details from "./Components/Details/Details";
import Order from "./Components/Order/Order";
import Login from "./Components/Login/Login";
import SignUp from "./Components/Login/SignUp";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Footer from "./Components/Footer/Footer";
import Payment from "./Components/Order/Payment";

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <div className="app-body" style={{marginTop:80}}>
          <Menu />
          <div className="content">
            <CartDialog />
            <Switch>
              <Route path="/search/" component={ProductList} />             
              <Route path="/details/:id" component={Details} />
              <Route path="/about" render={() => <div>About us</div>} />
              <Route path="/login" component={Login} />
              <Route path="/SignUp" component={SignUp} />
              <ProtectedRoute path="/order" component={Order} />
              <ProtectedRoute path="/payment" component={Payment} />
              <Route path="/" exact component={ProductList} />
              <Route
                component={() => (
                  <div style={{ padding: 20 }}>Page not found</div>
                )}
              />
            </Switch>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;

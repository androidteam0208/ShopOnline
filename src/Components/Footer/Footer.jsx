import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./Footer.css";

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <div>
          <div className="footer-title">Buy</div>
          <NavLink className="footer-item"
            to={"/payment"}
            exact
          >
            <div className="footerItem">Terms of payment</div>
          </NavLink>
          <NavLink to={"/delivery"} className="footer-item"
            exact>
            <div className="footerItem">Delivery</div>
          </NavLink>
        </div>
        <div>
          <div className="footer-title">About us</div>
          <NavLink
            to={"/info"}
            exact
            className="footer-item"
          >
            <div className="footerItem">Company Info</div>
          </NavLink>
        </div>
        <div>
          <div className="footer-title">Social Media </div>
          <a
            href="http://www.facebook.com"
            target="blank"
            className="footer-item"
          >
            <div className="footerItem">Facebook</div>
          </a>
        </div>
      </div>
    );
  }
}

export default Footer;

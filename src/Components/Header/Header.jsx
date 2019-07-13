import React, { Component } from "react";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import "./Header.css";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Badge from "@material-ui/core/Badge";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  showCartDlg,
  toggleMenu,
  setLoggedInUser,
  setCheckedOutItems
} from "../../Redux/Actions/Data";
import cartImage from "../../Images/bagicon.png";
import Auth from "../../Auth";
import { categories } from "../../Data"; 
import Person from "@material-ui/icons/PersonOutline";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import SearchIcon from "@material-ui/icons/Search";



const categoryOptions = categories.map(x => {
  return (
    <MenuItem key={x.name} value={x.name}>
      {x.name}
    </MenuItem>
  );
});

class ConnectedHeader extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    searchTerm: "",
    anchorEl: null,
    categoryFilter: categories[0].name
  };

  render() {
    let { anchorEl } = this.state;

    return (
      <AppBar className="bg-light d-flex justify-content-between Appbar">
        <Toolbar className="toolbar">
          <div className="left-part">
            <IconButton
              onClick={() => {
                this.props.dispatch(toggleMenu());
              }}
            >
              <MenuIcon size="medium" />
            </IconButton>
            <a href="/">
              <img className="header-icon"
              src={cartImage}
              alt={"Logo"}
              
            /></a>
            
            <div className="d-flex filter">
            <TextField className="header-search"
              label="Search products"
              value={this.state.searchTerm}
              onChange={e => {
                this.setState({ searchTerm: e.target.value });
              }}
             
            />

            <Select className="header-select"   
              value={this.state.categoryFilter}
              MenuProps={{
                style: {
                  maxHeight: 500
                }
              }}
              onChange={e => {
                this.setState({ categoryFilter: e.target.value });
              }}
            >
              {categoryOptions}
            </Select>

            <Button
              style={{ marginLeft: 20 }}
              variant="outlined"
              color="primary"
              onClick={() => {
                // Generate new URL to redirect user to
                this.props.history.push(
                  "/search/?category=" +
                    this.state.categoryFilter +
                    "&term=" +
                    this.state.searchTerm
                );
              }}
            >
              {" "}
              <SearchIcon color="primary" size="small" />   Search 
            </Button>
            </div>
            
          </div>
          <div className="right-part">
            {!this.props.loggedInUser ? (
              <Button
                variant="outlined"
                style={{ marginRight: 20 }}
                color="primary"
                onClick={() => {
                  this.props.history.push("/login");
                }}
              >
                Log in
              </Button>
            ) : (
              <Avatar
                onClick={event => {
                  this.setState({ anchorEl: event.currentTarget });
                }}
                style={{ backgroundColor: "#3f51b5", marginLeft: 50 }}
              >
                <Person />
              </Avatar>
            )}
            <IconButton
              aria-label="Cart"
              style={{ position: "absolute", right: 0 }}
              onClick={() => {
                this.props.dispatch(showCartDlg(true));
              }}
            >
              <Badge badgeContent={this.props.nrOfItemsInCard} color="primary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => {
                this.setState({ anchorEl: null });
              }}
            >
              <MenuItem
                onClick={() => {
                  this.setState({ anchorEl: null });
                  this.props.history.push("/order");
                }}
              >
                Pending Order
              </MenuItem>
              <MenuItem
                onClick={() => {
                  Auth.signout(() => {
                    this.props.dispatch(setCheckedOutItems([]));
                    this.props.dispatch(setLoggedInUser(null));
                    this.props.history.push("/");
                  });
                  this.setState({ anchorEl: null });
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    nrOfItemsInCard: state.rootReducer.cartItems.length,
    loggedInUser: state.rootReducer.loggedInUser,
    categories: state.rootReducer.categoryData,
  };
};

const Header = withRouter(connect(mapStateToProps)(ConnectedHeader));
export default Header;

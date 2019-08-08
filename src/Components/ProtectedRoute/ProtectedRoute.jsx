import { Route} from "react-router-dom";
import React from "react";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return { loggedInUser: state.rootReducer.loggedInUser };
};

// Implementation of a protected route component
const ConnectedProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return (
          <Component {...props} />
        )
      }}
    />
  );
};

const ProtectedRoute = connect(mapStateToProps)(ConnectedProtectedRoute);
export default ProtectedRoute;

import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

/**
 *Handling private routing
 *
 * @param {*} { component, ...rest }
 * @returns
 */
const PrivateRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      authenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

PrivateRoute.prototype = {
  user: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(PrivateRoute);

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
//Redux
import { connect } from "react-redux";
import { logoutUser } from "../../redux/actions/userActions";
//MUI
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";

const styles = {};

class Logout extends Component {
  handleLogout = () => {
    this.props.logoutUser();
  };

  render() {
    return (
      <Link to="#" onClick={this.handleLogout} className="nav-text">
        <ListItem>
          <ListItemIcon>
            <KeyboardReturn />
          </ListItemIcon>
          <ListItemText primary={"Logout"} />
        </ListItem>
      </Link>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = { logoutUser };

Logout.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Logout));

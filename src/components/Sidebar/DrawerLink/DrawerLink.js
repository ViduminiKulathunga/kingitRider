import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { matchPath, withRouter } from "react-router";
//Redux Stuff
import { connect } from "react-redux";
//MUI
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import withStyles from "@material-ui/core/styles/withStyles";
//Icons
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import HomeIcon from "@material-ui/icons/Home";
import PeopleIcon from "@material-ui/icons/People";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PinDropIcon from "@material-ui/icons/PinDrop";
import StarsIcon from '@material-ui/icons/Stars';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import SettingsIcon from '@material-ui/icons/Settings';

import Logout from "../../Logout/Logout";

const styles = (theme) => ({
  ...theme.spreadThis,
  toolbar: theme.mixins.toolbar,
  toolbar: {
    minHeight: 106,
  },
  active: {
    color: "#000",
  },
});

class DrawerLink extends Component {
  render() {
    const { classes, role } = this.props;
    let adminRouteLinks = (
      <Fragment>
        <Link
          to="/registeruser"
          className={
            matchPath(this.props.location.pathname, { path: "/registeruser" })
              ? "active nav-text"
              : "nav-text"
          }
        >
          <ListItem>
            <ListItemIcon>
              <PersonAddIcon />
            </ListItemIcon>
            <ListItemText primary={"Register"} />
          </ListItem>
        </Link>
        <Link
          to="/map"
          className={
            matchPath(this.props.location.pathname, { path: "/map" })
              ? "active nav-text"
              : "nav-text"
          }
        >
          <ListItem>
            <ListItemIcon>
              <PinDropIcon />
            </ListItemIcon>
            <ListItemText primary={"Driver Log"} />
          </ListItem>
        </Link>
        <Link
          to="/performance"
          className={
            matchPath(this.props.location.pathname, { path: "/performance" })
              ? "active nav-text"
              : "nav-text"
          }
        >
        <ListItem>
            <ListItemIcon>
              <MonetizationOnIcon />
            </ListItemIcon>
            <ListItemText primary={"Perfomance Log"} />
          </ListItem>
        </Link>
        <Link
          to="/manageuser"
          className={
            matchPath(this.props.location.pathname, { path: "/manageuser" })
              ? "active nav-text"
              : "nav-text"
          }
        >
        <ListItem>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary={"Manage Users"} />
          </ListItem>
        </Link>
      </Fragment>
    );
    return (
      <div>
        <div className={classes.toolbar} />
        <List>
          <Link
            to="/dashboard"
            className={
              matchPath(this.props.location.pathname, { path: "/dashboard" })
                ? "active nav-text"
                : "nav-text"
            }
          >
            <ListItem>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItem>
          </Link>
          <Link
            to="/users"
            className={
              matchPath(this.props.location.pathname, { path: "/users" })
                ? "active nav-text"
                : "nav-text"
            }
          >
            <ListItem>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary={"Users"} />
            </ListItem>
          </Link>
          <Link
            to="/profile"
            className={
              matchPath(this.props.location.pathname, { path: "/profile" })
                ? "active nav-text"
                : "nav-text"
            }
          >
            <ListItem>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary={"My Profile"} />
            </ListItem>
          </Link>
          {role === "admin" ? adminRouteLinks : ""}
          <Logout />
        </List>
      </div>
    );
  }
}

DrawerLink.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStatetoProps = (state) => ({
  role: state.user.credentials.role,
});

export default connect(mapStatetoProps)(
  withStyles(styles)(withRouter(DrawerLink))
);

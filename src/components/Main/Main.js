import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PropTypes from "prop-types";
import { matchPath } from "react-router";
//Redux Stuff
import { connect } from "react-redux";
//MUI
import withStyles from "@material-ui/core/styles/withStyles";
//Pages
import Home from "../Pages/Home";
import Signup from "../Pages/Signup";
import Users from "../Pages/Users";
import Profile from "../Pages/Profile";
import Sidebar from "../Sidebar/Sidebar";
import DriverMap from "../Pages/Map/DriverMap";
import User from "../Pages/User";
import Footer from "../Footer/Footer";
import UserEdit from "../Pages/UserEdit";
import DriverPerfomance from "../Pages/DriverPerfomance/DriverPerfomance";
import ManageUser from "../Pages/ManageUser";

import CircularProgress from "@material-ui/core/CircularProgress";

const styles = (theme) => ({
  ...theme.spreadThis,
  toolbar: theme.mixins.toolbar,
  toolbar: {
    minHeight: 106,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: "#062e3cad", //"#7fa1adad",
    minHeight: "100vh",
  },
  contentHome: {
    flexGrow: 1,
    padding: theme.spacing(0),
    backgroundColor: "#000",
    minHeight: "100vh",
  },
});

class Main extends Component {
  render() {
    const {
      classes,
      role,
      UI: { loading },
    } = this.props;
    
    let adminRoutes = (
      <Fragment>
        <Route exact path="/registeruser" component={Signup}></Route>
        <Route exact path="/map" component={DriverMap}></Route>
        <Route exact path="/performance" component={DriverPerfomance}></Route>
        <Route exact path="/manageuser" component={ManageUser}></Route>
        <Route exact path="/edit/user/:username" component={UserEdit}></Route>
      </Fragment>
    );
    return (
      <Fragment>
        <Router>
          <div className={classes.root}>
            <Sidebar />
            <main
              className={
                this.props.location.pathname === "/dashboard"
                  ? classes.content
                  : classes.content
              }
            >
              <div className={classes.toolbar} />
              <Switch>
                <Route exact path="/dashboard" component={Home}></Route>
                <Route exact path="/profile" component={Profile}></Route>
                <Route exact path="/users" component={Users}></Route>
                <Route exact path="/user/:username" component={User}></Route>
                {role === "admin" ? adminRoutes : ""}
              </Switch>
              
            </main>
            <Footer />
          </div>
        </Router>
      </Fragment>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStatetoProps = (state) => ({
  role: state.user.credentials.role,
  UI: state.UI,
});

export default connect(mapStatetoProps)(withStyles(styles)(Main));

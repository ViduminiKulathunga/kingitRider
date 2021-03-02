import React, { Component, Fragment } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

//Redux
import { connect } from "react-redux";
import { getMembers } from "../../redux/actions/dataActions";

import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";

import UserBucket from "../UserBucket";
import SearchBar from "../components/SearchBar/SearchBar";

class Users extends Component {
  componentDidMount() {
    this.props.getMembers();
  }
  render() {
    const { members, loading } = this.props.data;

    let recentUsersMarkup = !loading ? (

      <Fragment>
        <SearchBar />
        <AppBar position="static" style={{backgroundColor: "#000f1c", marginBottom: "2%"}}>
          <Toolbar>
            <Typography variant="h6">Admin</Typography>
          </Toolbar>
        </AppBar>
        {members
          .filter((data) => data.role === "admin")
          .map((filteredPerson) => (
            <UserBucket key={filteredPerson.userId} member={filteredPerson} />
          ))}
          <AppBar position="static" style={{backgroundColor: "#000f1c", marginBottom: "2%"}}>
          <Toolbar>
            <Typography variant="h6">Satff</Typography>
          </Toolbar>
        </AppBar>
        {members
          .filter((data) => data.role === "staff")
          .map((filteredPerson) => (
            <UserBucket key={filteredPerson.userId} member={filteredPerson} />
          ))}
          <AppBar position="static" style={{backgroundColor: "#000f1c", marginBottom: "2%"}}>
          <Toolbar>
            <Typography variant="h6">Drivers</Typography>
          </Toolbar>
        </AppBar>
        {members
          .filter((data) => data.role === "driver")
          .map((filteredPerson) => (
            <UserBucket key={filteredPerson.userId} member={filteredPerson} />
          ))}
      </Fragment>
    ) : (
      <p>Loading...</p>
    );
    return (
      <Grid container>
        <Grid item sm={12} style={{ margin: "0 auto" }}>
          {recentUsersMarkup}
        </Grid>
      </Grid>
    );
  }
}

Users.propTypes = {
  getMembers: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getMembers })(Users);

import React, { Component, Fragment } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
//Redux
import { connect } from "react-redux";
import { getMembers } from "../../redux/actions/dataActions";

import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";

import UserBucket from "../UserBucket";
import Alert from "./Alert";

import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";

const styles = (theme) => ({
  ...theme.spreadThis,
  commonCard: {
    textAlign: "center",
    padding: "50px 25px",
    backgroundColor: "#e5f4f5",
    "& .MuiDialog-paper": {
      backgroundColor: "#e5f4f5",
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: "60%",
    textAlign: "left",
  },
  submitButton: {
    position: "relative",
  },
});

class Users extends Component {
  state = {
    search: "",
    query: "",
    update: false,
    openSnackBar: false,
    count: 0,
  };

  componentDidMount() {
    this.props.getMembers();
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleUnmount = () => {
    this.setState({ update: false });
  };

  handleMount = () => {
    this.setState({ update: true });
  };

  getSearch = (event) => {
    event.preventDefault();
    this.setState({ query: this.state.search });
    this.handleMount();
    this.setState({ search: "" });
  };

  handleClose = () => {
    this.setState({ query: "" });
  };

  render() {
    const {
      classes,
      data: { members, loading },
    } = this.props;

    let mount = this.state.update;
    let recent = "";
    let userCount;
    if (mount) {
      recent = (
        <Fragment>
          {members
            .filter((data) => data.username === this.state.query)
            .map((filteredPerson) => (
              <UserBucket key={filteredPerson.userId} member={filteredPerson} />
            ))}
        </Fragment>
      );
    }

    if (mount) {
      userCount = members.filter((data) => data.username === this.state.query)
        .length;
    }

    let formSearch = !loading ? (
      <Fragment>
        <Card className={classes.cardLogin}>
          <Typography variant="h6" noWrap>
            Please Enter User's Username Here...
          </Typography>
          <br />
          <form onSubmit={this.getSearch} className={classes.form}>
            <FormControl variant="filled" className={classes.inlineBlock}>
              <TextField
                type="text"
                InputProps={{
                  classes: {
                    underline: classes.underline,
                  },
                }}
                InputLabelProps={{
                  className: classes.labelUnderline,
                }}
                name="search"
                value={this.state.search}
                onChange={this.handleChange}
                className={(classes.inlineBlock, classes.rightCommonSpace)}
              />
              <Button
                type="submit"
                variant="contained"
                className="search-button"
                className={
                  (classes.submitButton,
                  classes.inlineBlock,
                  classes.bottomCommonSpace)
                }
                color="secondary"
              >
                Search
              </Button>

              {userCount > 0 ? (
                <Alert severity="success" onClose={this.handleClose}>
                  Results: {this.state.query} found {userCount} times.
                </Alert>
              ) : null}

              {userCount == 0 && this.state.query !== "" ? (
                <Alert severity="error" onClose={this.handleClose}>
                  Results: {this.state.query} No founds.
                </Alert>
              ) : null}
            </FormControl>
          </form>
        </Card>
      </Fragment>
    ) : (
      <br />
    );

    let recentUsersMarkup = !loading ? (
      <Fragment>
        <AppBar
          position="static"
          style={{ backgroundColor: "#000f1c", marginBottom: "2%" }}
        >
          <Toolbar>
            <Typography variant="h6">Admin</Typography>
          </Toolbar>
        </AppBar>
        
        {members
          .filter((data) => data.role === "admin")
          .map((filteredPerson) => (
            <UserBucket key={filteredPerson.userId} member={filteredPerson} />
          ))}
        <AppBar
          position="static"
          style={{ backgroundColor: "#000f1c", marginBottom: "2%" }}
        >
          <Toolbar>
            <Typography variant="h6">Satff</Typography>
          </Toolbar>
        </AppBar>
        {members
          .filter((data) => data.role === "staff")
          .map((filteredPerson) => (
            <UserBucket key={filteredPerson.userId} member={filteredPerson} />
          ))}
        <AppBar
          position="static"
          style={{ backgroundColor: "#000f1c", marginBottom: "2%" }}
        >
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
          <div className={(classes.formSearch, classes.bottomCommonSpace)}>
            {formSearch}
          </div>
          <div className={classes.selectedCard}>{recent}</div>
          {recentUsersMarkup}
        </Grid>
      </Grid>
    );
  }
}

Users.propTypes = {
  getMembers: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getMembers })(
  withStyles(styles)(Users)
);

import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../../util/MyButton.js";
//MUI Stuff
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
//Redux Stuff
import { connect } from "react-redux";
import { registerUser, clearErrors } from "../../redux/actions/dataActions";

import AppIcon from "../../images/logo.jpeg";
import Alert from "./Alert";
import MuiAlert from "@material-ui/lab/Alert";

const styles = (theme) => ({
  ...theme.spreadThis,
  commonCard: {
    textAlign: "center",
    padding: "50px 25px",
    backgroundColor: "#e5f4f5",
    "& .MuiDialog-paper": {
      backgroundColor: "#e5f4f5",
    },
    "& hr": {
      border: "none",
      margin: "0 0 10px 0",
    },
    image: {
      maxHeight: 106,
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: "60%",
    textAlign: "left",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  submitButton: {
    position: "relative",
  },
  progressSpinner: {
    position: "absolute",
  },
  sucessMessage: {
    position: "relative",
    margin: "0 auto",
    display: "block",
    bottom: "-20px",
  },
});

class Signup extends Component {
  state = {
    handle: "",
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    role: "",
    nic: "",
    licenseNo: "",
    errors: {},
    openSnackBar: false,
    submitted: false,
  };

  componentWillReceiveProps(nextProps) {
    const setInitial = {
      handle: "",
      email: "",
      password: "",
      confirmPassword: "",
      fullName: "",
      role: "",
      nic: "",
      licenseNo: "",
      errors: {},
      submitted: false,
    };
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors,
      });
    } 
    if (!nextProps.UI.errors && !nextProps.UI.loading && this.state.submitted) {
      this.setState({ openSnackBar: true });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState(setInitial);
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const userDetails = {
      bio: this.state.bio,
      handle: this.state.handle,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      fullName: this.state.fullName,
      role: this.state.role,
      nic: this.state.nic,
      licenseNo: this.state.licenseNo,
    };
    this.props.registerUser(userDetails);
    this.setState({
      submitted: true,
    });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ openSnackBar: false });
  };

  render() {
    const { errors } = this.state;
    const {
      classes,
      UI: { loading },
      data: { message },
    } = this.props;

    let LicenseNo = (
      <TextField
        name="licenseNo"
        type="text"
        label="License No"
        placeholder="License No"
        className={classes.textField}
        value={this.state.licenseNo}
        onChange={this.handleChange}
        fullWidth
        helpertext={errors.licenseNo}
        error={errors.licenseNo ? true : false}
        InputProps={{
          classes: {
            input: classes.resize,
          },
        }}
        InputLabelProps={{ style: { fontSize: "14px" } }}
      />
    );

    let recentUsersMarkup = message;

    return (
      <Fragment>
        <Card className={classes.commonCard}>
          <Typography variant="h6" noWrap>
            Register New User
          </Typography>
          <img src={AppIcon} alt="Logo" className={classes.image} />
          <hr />
          <hr />
          <form onSubmit={this.handleSubmit}>
            <FormControl variant="filled" className={classes.formControl}>
              <InputLabel id="job-role">Job Role</InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="role-selection"
                value={this.state.role}
                onChange={this.handleChange}
                name="role"
                helpertext={errors.role}
                error={errors.role ? true : false}
              >
                <MenuItem value="staff">Satff Member</MenuItem>
                <MenuItem value="driver">Driver</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </FormControl>
            <TextField
              name="handle"
              type="text"
              label="Username"
              placeholder="Username"
              className={classes.textField}
              value={this.state.handle}
              onChange={this.handleChange}
              fullWidth
              helpertext={errors.handle}
              error={errors.handle ? true : false}
              InputProps={{
                classes: {
                  input: classes.resize,
                },
              }}
              InputLabelProps={{ style: { fontSize: "14px" } }}
            />
            <TextField
              name="email"
              type="email"
              label="Email"
              placeholder="email"
              className={classes.textField}
              value={this.state.email}
              onChange={this.handleChange}
              helpertext={errors.email}
              error={errors.email ? true : false}
              fullWidth
              InputProps={{
                classes: {
                  input: classes.resize,
                },
              }}
              InputLabelProps={{ style: { fontSize: "14px" } }}
            />
            <TextField
              name="password"
              type="password"
              label="Password"
              placeholder="Password"
              className={classes.textField}
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
              helpertext={errors.password}
              error={errors.password ? true : false}
              InputProps={{
                classes: {
                  input: classes.resize,
                },
              }}
              InputLabelProps={{ style: { fontSize: "14px" } }}
            />
            <TextField
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              className={classes.textField}
              helpertext={errors.confirmPassword}
              error={errors.confirmPassword ? true : false}
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              fullWidth
              InputProps={{
                classes: {
                  input: classes.resize,
                },
              }}
              InputLabelProps={{ style: { fontSize: "14px" } }}
            />
            <TextField
              name="fullName"
              type="text"
              label="Full Name"
              multiline
              placeholder="Full Name"
              className={classes.textField}
              value={this.state.fullName}
              onChange={this.handleChange}
              fullWidth
              InputProps={{
                classes: {
                  input: classes.resize,
                },
              }}
              InputLabelProps={{ style: { fontSize: "14px" } }}
              error={errors.fullName ? true : false}
              helpertext={errors.fullName}
            />
            <TextField
              name="nic"
              type="text"
              label="NIC"
              placeholder="NIC"
              className={classes.textField}
              value={this.state.nic}
              onChange={this.handleChange}
              fullWidth
              error={errors.nic ? true : false}
              helpertext={errors.nic}
              InputProps={{
                classes: {
                  input: classes.resize,
                },
              }}
              InputLabelProps={{ style: { fontSize: "14px" } }}
            />
            {this.state.role === "driver" ? LicenseNo : ""}

            <hr />
            <hr />
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              className={classes.submitButton}
              disabled={loading}
            >
              Submit
              {loading && (
                <CircularProgress
                  size={30}
                  className={classes.progressSpinner}
                />
              )}
            </Button>
            <Snackbar
              className={classes.sucessMessage}
              open={this.state.openSnackBar}
              onClose={this.handleClose}
            >
              <Alert severity="success" onClose={this.handleClose}>
                {recentUsersMarkup}
                Hello
              </Alert>
            </Snackbar>
          </form>
        </Card>
      </Fragment>
    );
  }
}

Signup.propTypes = {
  registerUser: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStatetoProps = (state) => ({
  UI: state.UI,
  data: state.data,
});

export default connect(mapStatetoProps, { registerUser, clearErrors })(
  withStyles(styles)(Signup)
);

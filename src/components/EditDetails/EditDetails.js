import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../../util/MyButton.js";
//Redux Stuff
import { connect } from "react-redux";
import { editUserDetails } from "../../redux/actions/userActions";
//MUI Stuff
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import "./EditDetails.css";
//Icons
import EditIcon from "@material-ui/icons/Edit";

const styles = (theme) => ({
  ...theme.spreadThis,
  button: {
    left: "60%",
  },
  appIcon: {
    color: "rgb(202, 247, 255)",
  },
  loginWrapper: {
    textAlign: "center",
    background:
      "linear-gradient(180deg, rgba(0,14,27,1) 39%, rgba(11,60,73,1) 73%, rgba(3,112,139,1) 100%);",
    minHeight: "100vh",
    "& .MuiDialog-paper": {
      backgroundColor: "#e5f4f5",
    },
    "& hr": {
      border: "none",
      margin: "0 0 10px 0",
    },
  },
  resize: {
    fontSize: "14px",
  },
});

class EditDetails extends Component {
  state = {
    bio: "",
    address: "",
    phone: "",
    open: false,
  };
  mapUserDetailsToState = (credentials) => {
    this.setState({
      bio: credentials.bio ? credentials.bio : "",
      address: credentials.address ? credentials.address : "",
      phone: credentials.phone ? credentials.phone : "",
    });
  };
  handleOpen = () => {
    this.setState({ open: true });
    this.mapUserDetailsToState(this.props.credentials);
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  componentDidMount() {
    const { credentials } = this.props;
    this.mapUserDetailsToState(credentials);
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleSubmit = () => {
    const userDetails = {
      bio: this.state.bio,
      address: this.state.address,
      phone: this.state.phone,
    };
    this.props.editUserDetails(userDetails);
    this.handleClose();
  };

  render() {
    const { classes, credentials } = this.props;
    let driverLisence = (
      <Fragment>
        <label>
          <span className="title">license No:</span> {credentials.licenseNo}
        </label>
        <hr />
      </Fragment>
    );

    return (
      <Fragment>
        <MyButton
          tip="Edit Details"
          onClick={this.handleOpen}
          btnClassName={classes.button}
        >
          <EditIcon className={classes.appIcon} />
        </MyButton>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
          className={classes.loginWrapper}
        >
          <DialogTitle>Edit your Details</DialogTitle>
          <DialogContent>
            <div className="image-wrapper">
              <img
                src={credentials.imageUrl}
                alt="profile"
                className="profile-image"
              />
              <hr />
              <label>
                <span className="title">Username:</span> {credentials.handle}
              </label>
              <hr />
              <label>
                <span className="title">Full Name:</span> {credentials.fullname}
              </label>
              <hr />
              <label>
                <span className="title">Role:</span> {credentials.role}
              </label>
              <hr />
              <label>
                <span className="title">Email:</span> {credentials.email}
              </label>
              <hr />
              {credentials.role === "driver" ? driverLisence : ""}
              <hr />
              <hr />
            </div>
            <form>
              <TextField
                name="bio"
                type="text"
                label="Bio"
                multiline
                rows="3"
                placeholder="Short Bio about your self"
                className={classes.textField}
                value={this.state.bio}
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
                name="address"
                type="text"
                label="Address"
                placeholder="Your personal website"
                className={classes.textField}
                value={this.state.address}
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
                name="phone"
                type="text"
                label="Phone"
                placeholder="where you live"
                className={classes.textField}
                value={this.state.phone}
                onChange={this.handleChange}
                fullWidth
                InputProps={{
                  classes: {
                    input: classes.resize,
                  },
                }}
                InputLabelProps={{ style: { fontSize: "14px" } }}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleClose}
              variant="contained"
              color="primary"
            >
              Cancel
            </Button>
            <Button
              onClick={this.handleSubmit}
              variant="contained"
              color="secondary"
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

EditDetails.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStatetoProps = (state) => ({
  credentials: state.user.credentials,
  user: PropTypes.object.isRequired,
});

export default connect(mapStatetoProps, { editUserDetails })(
  withStyles(styles)(EditDetails)
);

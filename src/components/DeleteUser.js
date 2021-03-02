import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import MyButton from "../util/MyButton";

//MUI
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Typography from "@material-ui/core/Typography";

//Redux
import { connect } from "react-redux";
import { deleteUser } from "../redux/actions/dataActions";

const styles = (theme) => ({
  ...theme.spreadThis,
  deleteIcon: {
    float: "right",
    color: "#fff",
  },
  pinkShadeButton: {
    background: "linear-gradient(135deg, #e60883, #FF5E3A)",
    border: "0px",
    color: "#fff",
    padding: "5px 10px",
    fontSize: "1.15rem",
    marginRight: "5px",
  },
});

class DeleteUser extends Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  deleteUserHandle = () => {
    this.props.deleteUser(this.props.handle);
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <MyButton
          tip="Delete User"
          onClick={this.handleOpen}
          btnClassName={classes.deleteButton}
        >
          <DeleteForeverIcon className={classes.deleteIcon} />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            <Typography variant="body1">
              Are you sure you want to delete the user{" "}
              <button className={classes.pinkShadeButton}>
                {this.props.handle}
              </button>{" "}
              ?
            </Typography>
          </DialogTitle>
          <DialogActions style={{ marginTop: "30px", marginBottom: "5px" }}>
            <Button
              onClick={this.handleClose}
              variant="contained"
              color="primary"
            >
              Cancel
            </Button>
            <Button
              onClick={this.deleteUserHandle}
              variant="contained"
              color="secondary"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

DeleteUser.propTypes = {
  deleteUser: PropTypes.func.isRequired,
  handle: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};

export default connect(null, { deleteUser })(withStyles(styles)(DeleteUser));

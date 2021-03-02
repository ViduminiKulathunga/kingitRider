import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import MyButton from "../util/MyButton.js";
//MUI
import MuiLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
//Icons
import PhoneIcon from "@material-ui/icons/Phone";
import LocationOn from "@material-ui/icons/LocationOn";
import CalendarToday from "@material-ui/icons/CalendarToday";
import CloseIcon from "@material-ui/icons/Close";
import MoreIcon from '@material-ui/icons/More';

//Redux
import { getMember } from "../redux/actions/dataActions";
import { Dialog, DialogContent, CircularProgress } from "@material-ui/core";

const styles = () => ({
  paper: {
    padding: "50px 20px",
    marginLeft: 20,
    fontSize: "1.1em",
    color: "#fff",
    background: "rgb(0,14,27)",
    background:
      "linear-gradient(180deg, rgba(0,14,27,1) 39%, rgba(36,187,162,1) 73%, rgba(3,112,139,1) 100%)",
  },
  profile: {
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative",
      "& button": {
        position: "absolute",
        top: "80%",
        left: "60%",
      },
    },
    "& .profile-image": {
      width: 200,
      height: 200,
      objectFit: "cover",
      maxWidth: "100%",
      borderRadius: "50%",
    },
    "& .profile-details": {
      textAlign: "center",
      "& span, svg": {
        verticalAlign: "middle",
      },
      "& a": {
        color: "#00bcd4",
      },
    },
    "& hr": {
      border: "none",
      margin: "0 0 10px 0",
    },
    "& svg.button": {
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
  appIcon: {
    color: "rgb(202, 247, 255)",
  },
  buttons: {
    textAlign: "center",
    "& a": {
      margin: "20px 10px",
    },
  },
});

export class UserDialog extends Component {
  state = {
    open: false,
    ranking: 4.6,
  };
  handleOpen = () => {
    this.setState({ open: true });
    this.props.getMember(this.props.userHandle);
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    const {
      classes,
      member: {
        credentials: {
          handle,
          fullname,
          createdAt,
          createdby,
          imageUrl,
          bio,
          role,
          address,
          phone,
        },
      },
      UI: { loading },
    } = this.props;

    const dialogMarkup = loading ? (
      <CircularProgress size={200} />
    ) : (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className="image-wrapper">
            <img src={imageUrl} alt="profile" className="profile-image" />
          </div>
          <hr />
          <div className="profile-details">
            <Typography style={{ color: "#000" }} varient="h4">
              {handle}
            </Typography>
            <hr />
            {bio && <Typography variant="body2">{bio}</Typography>}
            <hr />
            {phone && (
              <Fragment>
                <PhoneIcon className={classes.appIcon} />
                <span>{phone}</span>
                <hr />
              </Fragment>
            )}
            {address && (
              <Fragment>
                <LocationOn className={classes.appIcon} />
                <span>{address}</span>
                <hr />
              </Fragment>
            )}
            <CalendarToday className={classes.appIcon} />{" "}
            <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
          </div>
        </div>
      </Paper>
    );

    return (
      <Fragment>
        <MyButton
          onClick={this.handleOpen}
          tip="Expand User"
          tipClassName={classes.expandButton}
        >
          <MoreIcon style={{ color: "rgb(1 30 39)" }}/>
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <MyButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogContent className={classes.DialogContent}>
            {dialogMarkup}
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

UserDialog.propTypes = {
  getMember: PropTypes.func.isRequired,
  userHandle: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  member: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  member: state.data.member,
  UI: state.UI,
});

const mapActionsToProps = { getMember };

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(UserDialog));

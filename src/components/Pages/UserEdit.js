import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import MyButton from "../../util/MyButton";
import { withRouter } from "react-router-dom";
//MUI
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
//Icons
import PhoneIcon from "@material-ui/icons/Phone";
import LocationOn from "@material-ui/icons/LocationOn";
import CalendarToday from "@material-ui/icons/CalendarToday";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
//Redux
import { getMember } from "../../redux/actions/dataActions";
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
  loadingCircular: { display: "flex", justifyContent: "center" },
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
  backIcon: {
    verticalAlign: "middle",
    display: "inline-block",
  },
  cursorHand: {
    cursor: "pointer",
  },
  buttons: {
    textAlign: "center",
    "& a": {
      margin: "20px 10px",
    },
  },
});

class UserEdit extends Component {
  state = {
    open: false,
    ranking: 3.6,
  };

  goBack = () => {
    this.props.history.goBack();
  };

  componentDidMount() {
    console.log(this.props.match.params.username);
    this.props.getMember(this.props.match.params.username);
  }

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

    let ratingUser = "";
    if (role === "driver") {
      ratingUser = (
        <Box component="fieldset" mb={3} borderColor="transparent">
          <Typography component="legend">Ranking</Typography>
          <Rating name="read-only" value={this.state.ranking} readOnly />
        </Box>
      );
    }

    const dialogMarkup = loading ? (
      <div className={classes.loadingCircular}>
        <CircularProgress size={50} style={{ color: "rgb(202, 247, 255)" }} />
      </div>
    ) : (
      <Fragment>
        <div className={classes.profile}>
          <div onClick={this.goBack} className={classes.cursorHand}>
            <ArrowBackIosIcon className={(classes.appIcon, classes.backIcon)} />
            <span>Back to Users</span>
          </div>
          <div className="image-wrapper">
            <Typography
              style={{ color: "#fff", margin: "20px auto" }}
              variant="h5"
            >
              Manage User
            </Typography>
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
            <hr />
            <hr />
            {ratingUser}
          </div>
        </div>
      </Fragment>
    );

    return (
      <Fragment>
        <Paper className={classes.paper}>
          <DialogContent className={classes.DialogContent}>
            {dialogMarkup}
          </DialogContent>
        </Paper>
      </Fragment>
    );
  }
}

UserEdit.propTypes = {
  getMember: PropTypes.func.isRequired,
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
)(withStyles(styles)(withRouter(UserEdit)));

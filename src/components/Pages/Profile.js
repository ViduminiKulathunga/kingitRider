import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import MyButton from "../../util/MyButton.js";
import EditDetails from '../../components/EditDetails/EditDetails';
//MUI
import MuiLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
//Icons
import PhoneIcon from "@material-ui/icons/Phone";
import LocationOn from "@material-ui/icons/LocationOn";
import CalendarToday from "@material-ui/icons/CalendarToday";
import EditIcon from "@material-ui/icons/Edit";
//Redux
import { uploadImage } from "../../redux/actions/userActions";

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

export class Profile extends Component {
  handleImageChange = (event) => {
    const image = event.target.files[0];

    const formData = new FormData();
    formData.append("image", image, image.name);
    this.props.uploadImage(formData);
  };
  handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };
  render() {
    const {
      classes,
      user: {
        credentials: { handle, createdAt, imageUrl, bio, role, address, phone },
        loading,
      },
    } = this.props;

    let profileMarkup = !loading ? (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className="image-wrapper">
            <img src={imageUrl} alt="profile" className="profile-image" />
            <input
              type="file"
              id="imageInput"
              hidden="hidden"
              onChange={this.handleImageChange}
            />
            <MyButton
              tip="Edit Profile Picture"
              onClick={this.handleEditPicture}
              className="button"
            >
              <EditIcon className={classes.appIcon} />
            </MyButton>
          </div>
          <hr />
          <div className="profile-details">
            <MuiLink
              component={Link}
              to={`/users/${handle}`}
              style={{ color: "#000" }}
              varient="h4"
            >
              {handle}
            </MuiLink>
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
          <EditDetails />
        </div>
      </Paper>
    ) : (
      <p>Loading...</p>
    );

    return profileMarkup;
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = { uploadImage };

Profile.propTypes = {
  uploadImage: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Profile));

import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
//MUI
import Typography from "@material-ui/core/Typography";
//styles
import "./ProfileTab.css";

export class ProfileTab extends Component {
  render() {
    const {
      user: {
        credentials: { handle, imageUrl },
      },
    } = this.props;
    return (
      <div className="profile-wrapper">
        <Link to="/profile" className="nav-text">
          <img src={imageUrl} alt="user" className="image" />
          <Typography
            variant="subtitle1"
            align="center"
            style={{ display: "inline-block" }}
            noWrap
          >
            {handle}
          </Typography>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

ProfileTab.propTypes = {
  user: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(ProfileTab);

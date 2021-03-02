import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
//MUI
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import DeleteUser from "./DeleteUser";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import MoreIcon from "@material-ui/icons/More";
import MyButton from "../util/MyButton";

import UserDialog from "./UserDialog";
//Redux
import { connect } from "react-redux";

const styles = (theme) => ({
  ...theme.spreadThis,
  deleteContainer: {
    display: "block",
    position: "absolute",
    bottom: "3px",
    right: "3px",
  },
  card: {
    [theme.breakpoints.down("sm")]: {
      display: "inline-block",
      //backgroundColor: "#002039",
      background:
        "linear-gradient(180deg, rgba(0,14,27,1) 39%, rgba(11,60,73,1) 73%, rgba(3,112,139,1) 100%);",
      color: "#fff",
      width: "24%",
      minHeight: "400px",
      marginRight: "1%",
      marginBottom: "1%",
      position: "relative",
    },
    [theme.breakpoints.up("md")]: {
      display: "inline-block",
      //backgroundColor: "#002039",
      background:
        "linear-gradient(180deg, rgba(0,14,27,1) 39%, rgba(11,60,73,1) 73%, rgba(3,112,139,1) 100%);",
      color: "#fff",
      width: "24%",
      minHeight: "400px",
      marginRight: "1%",
      marginBottom: "1%",
      position: "relative",
    },
    [theme.breakpoints.up("lg")]: {
      display: "inline-block",
      //backgroundColor: "#002039",
      background:
        "linear-gradient(180deg, rgba(0,14,27,1) 39%, rgba(11,60,73,1) 73%, rgba(3,112,139,1) 100%);",
      color: "#fff",
      width: "24%",
      minHeight: "361px",
      marginRight: "1%",
      marginBottom: "1%",
      position: "relative",
    },
  },
  image: {
    [theme.breakpoints.down("sm")]: {
      height: "100px",
      width: "100px",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "50% 50%",
      margin: "18px auto 0",
      borderRadius: "100%",
    },
    [theme.breakpoints.up("md")]: {
      height: "130px",
      width: "130px",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "50% 50%",
      margin: "18px auto 0",
      borderRadius: "100%",
    },
    [theme.breakpoints.up("lg")]: {
      height: "130px",
      width: "130px",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "50% 50%",
      margin: "18px auto 0",
      borderRadius: "100%",
    },
  },
});

class UserBucket extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      member: { createdAt, username, imageUrl, role, bio, userId },
      manageBy,
    } = this.props;

    console.log("manageBy", manageBy);

    return (
      <Card className={classes.card}>
        <CardMedia
          image={imageUrl}
          title="Profile image"
          className={classes.image}
        />
        <CardContent className={classes.textAlignCenter}>
          <Typography variant="h6" className={classes.capitalize}>
            {username}
          </Typography>
          <Typography variant="body2" className={classes.textSecondary}>
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1" className={classes.capitalize}>
            {role}
          </Typography>
          <Typography variant="body1">{bio}</Typography>
          {manageBy ? (
            <Link to={`/edit/user/${username}`}>
              <MoreIcon style={{ color: "rgb(1 30 39)" }} />
            </Link>
          ) : (
            <Link to={`/user/${username}`}>
              <MoreIcon style={{ color: "rgb(1 30 39)" }} />
            </Link>
          )}
        </CardContent>
        {manageBy ? (
          <div className={classes.deleteContainer}>
            <DeleteUser handle={username} />
          </div>
        ) : null}
      </Card>
    );
  }
}

UserBucket.propTypes = {
  member: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(UserBucket));
